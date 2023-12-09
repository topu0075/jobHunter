import emailjs from "@emailjs/browser";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import sweetAlertController from "../../utils/sweetAlertController";
import titleUpdate from "../../utils/titleController";

const JobDetails = () => {
  titleUpdate("Job Hunter | Job Details");

  const [jobInfo, setJobInfo] = useState("");
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [appliedStatus, setAppliedStatus] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [resumeURL, setResumeURL] = useState("");
  const applicantsEmail = user.email;
  const form = useRef();
  const [closedClicked, setCloseClicked] = useState(false);

  //console.log(id);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/allJobs/${id}`
      );
      //console.log(data[0]);
      setJobInfo(data[0]);
    };
    loadData();
  }, [appliedStatus, id]);

  const handleClose = () => {
    setCloseClicked(true);
  };

  const handleJobApply = async () => {
    setCloseClicked(false);
    const duplicateChecker = jobInfo.appliedApplicantsEmail.includes(
      user.email
    );
    const deadlineChecker =
      new Date(jobInfo.deadline).getTime() > Date.now() ? true : false;

    if (!closedClicked) {
      if (jobInfo.employerEmail === user.email) {
        //console.log(duplicateChecker);
        sweetAlertController(
          "Error",
          "You cant apply to your own job",
          "error",
          "close"
        );
      } else if (duplicateChecker) {
        sweetAlertController(
          "Error",
          "You have already apply for this job",
          "error",
          "close"
        );
      } else if (!deadlineChecker) {
        sweetAlertController(
          "Error",
          "Deadline exceeded for this job. Better Luck next time",
          "error",
          "close"
        );
      } else if (resumeURL === "") {
        sweetAlertController(
          "Error",
          "Resume link can not be blank",
          "error",
          "close"
        );
      } else {
        const appliedJob = await axios.put(
          `${process.env.REACT_APP_URL}/apply/${id}`,
          {
            applicant: applicantsEmail,
          }
        );
        if (appliedJob.data.acknowledged && appliedJob.data.modifiedCount > 0) {
          setAppliedStatus(!appliedStatus);
          emailjs
            .sendForm(
              "service_4l74387",
              "template_4qk7wzl",
              form.current,
              "gITyx9mY_VfOvA0dq"
            )
            .then(
              (result) => {
                //console.log(result.text);
              },
              (error) => {
                //console.log(error.text);
              }
            );

          sweetAlertController(
            "Success",
            "Applied Successfully",
            "success",
            "close"
          );
        }
      }
    }
  };

  return (
    <div className='flex flex-col justify-center gap-5'>
      <div className='flex mx-auto justify-center w-11/12'>
        <img
          src={jobInfo.pictureURL}
          alt='Job banner image'
          className='w-3/4'
        />
        <div className='divider'></div>
      </div>
      <div className='flex flex-col-reverse lg:flex-row justify-center w-10/12 mx-auto gap-3 lg:gap-5'>
        <div className='w-11/12 lg:w-10/12'>
          <h3 className='text-lg lg:text-3xl font-bold ml-2 md:ml-0'>
            Job Description
          </h3>
          <div className='mt-0 divider'></div>
          <p className='mt-2 text-justify'>{jobInfo.description}</p>
        </div>

        <div className='w-11/12 lg:w-1/2 lg:pl-5'>
          <div className='border-b-2 lg:lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Title: </span>
              {jobInfo.title}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Employer: </span>
              {jobInfo.employerName}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Category: </span>
              {jobInfo.category}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Salary: </span>
              {jobInfo.salaryRange}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Job Posted: </span>
              {jobInfo.postingDate}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Deadline: </span>
              {jobInfo.deadline}
            </p>
          </div>
          <div className='border-b-2 lg:w-3/4'>
            <p className='m-2'>
              <span className='font-bold text-lg'>Applicants: </span>
              {jobInfo.appliedApplicantsEmail?.length}
            </p>
          </div>
          <div className='border-b-2 w-3/4 py-3 hidden lg:flex'>
            <button
              className='btn btn-primary text-white'
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}

      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <div className='justify-center modal-action'>
            <form
              ref={form}
              method='dialog'
              onSubmit={handleJobApply}
              className='flex flex-col gap-3'
            >
              <input
                type='text'
                name='user_name'
                className='input input-bordered'
                placeholder='Applicant Name'
                defaultValue={user?.displayName}
                readOnly
              />
              <input
                type='email'
                name='user_mail'
                className='input input-bordered'
                placeholder='Applicant Email'
                defaultValue={user?.email}
                readOnly
              />

              <input
                type='text'
                name='job_title'
                className='input input-bordered'
                placeholder='Job Title'
                defaultValue={jobInfo?.title}
                readOnly
              />
              <input
                type='url'
                name='resume_url'
                className='input input-bordered'
                placeholder='Applicant Resume URL'
                onChange={(e) => setResumeURL(e.target.value)}
              />
              <button className='btn btn-primary text-white mt-2 mx-auto w-full'>
                Submit
              </button>
              <button
                className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                onClick={handleClose}
              >
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Mobile Apply Button */}

      <div className=' mx-auto py-3 lg:hidden'>
        <button
          className='btn btn-primary text-white'
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
