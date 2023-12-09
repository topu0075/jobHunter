import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillCalendarDateFill } from "react-icons/bs";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../components/Loading/Loading";
import sweetAlertController from "../../utils/sweetAlertController";
import titleUpdate from "../../utils/titleController";

const AddJobs = () => {
  titleUpdate("Job Hunter | Add Jobs");
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState("Select Category");
  const [postingDate, setPostingDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // //console.log(category);
  //console.log(postingDate);
  //console.log(deadline);

  const compareDates = (d1, d2) => {
    const startDate = new Date(d1).getTime();
    const endDate = new Date(d2).getTime();
    return endDate > startDate ? true : false;
  };

  const compareSalary = (low, high) => {
    return high > low ? true : false;
  };

  const jobPost = async (jobData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/allJobs`,
        jobData,
        { withCredentials: true }
      );

      const { data } = response;
      //console.log(data);
      if (data.acknowledged) {
        sweetAlertController(
          "Success",
          "Added Job Successfully!!",
          "success",
          "Close"
        );
        setLoading(false);
        navigate("/myjobs");
      }
    } catch (error) {
      sweetAlertController("Error!", error.message, "error", "Close");
      //console.log(error);
      setLoading(false);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    //console.log(form);
    const formData = new FormData(form);
    //console.log("formData ", formData);
    let jobInfo = Object.fromEntries(formData.entries());
    jobInfo["appliedApplicantsEmail"] = [];
    jobInfo["employerEmail"] = user.email;
    //console.log(typeof jobInfo.postingDate);
    const jobDurationValidityChecker = compareDates(
      jobInfo.postingDate,
      jobInfo.deadline
    );
    const salaryRangeChecker = compareSalary(
      parseInt(jobInfo.lowestSalary),
      parseInt(jobInfo.highestSalary)
    );

    jobInfo = {
      ...jobInfo,
      salaryRange: `${jobInfo.lowestSalary} - ${jobInfo.highestSalary}`,
      noOfApplicants: parseInt(jobInfo.noOfApplicants),
    };

    //console.log(jobDurationValidityChecker);
    //console.log(salaryRangeChecker);

    // Post Data if Deadline and Post time matches the criteria

    !jobDurationValidityChecker
      ? sweetAlertController(
          "Error!",
          "Job Posting date can not be same or previous date than today.",
          "error",
          "Close"
        )
      : !salaryRangeChecker
      ? sweetAlertController(
          "Error!",
          "Lowest Salary Range must be less than Highest Salary",
          "error",
          "Close"
        )
      : jobPost(jobInfo);

    //console.log("jobInfo ", jobInfo);
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center lg:bg-purple-50 w-full md:w-10/12 lg:w-2/3 py-5 mx-auto rounded-xl mt-10 mb-20'>
        <h3 className='text-4xl text-center font-bold mt-10'>Add Job</h3>
        <div className='md:w-3/5 flex-col lg:flex-row my-10'>
          {loading ? (
            <Loading />
          ) : (
            <div className='shadow-2xl rounded-lg bg-base-100'>
              <form className='card-body' onSubmit={handleOnSubmit}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Employer or Job Poster</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Employer or Job Poster'
                    name='employerName'
                    className='input input-bordered'
                    defaultValue={user.displayName}
                    // required
                    readOnly
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Job Title'
                    name='title'
                    className='input input-bordered'
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Category</span>
                  </label>
                  <select
                    defaultValue={"Select Category"}
                    className='select select-bordered w-full '
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled>Select Category</option>
                    <option value='On Site'>On Site</option>
                    <option value='Remote'>Remote</option>
                    <option value='Part-Time'>Part-Time</option>
                    <option value='Hybrid'>Hybrid</option>
                  </select>
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Salary Range</span>
                  </label>
                  <div className='grid grid-cols-2 gap-5'>
                    <input
                      type='number'
                      placeholder='Lowest Salary'
                      name='lowestSalary'
                      className='input input-bordered'
                      required
                    />

                    <input
                      type='number'
                      placeholder='Highest Salary'
                      name='highestSalary'
                      className='input input-bordered'
                      required
                    />
                  </div>
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Description</span>
                  </label>
                  <textarea
                    type='text'
                    placeholder='Job Description'
                    name='description'
                    className='textarea textarea-bordered'
                    rows='5'
                    required
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Posting Date</span>
                  </label>
                  <div className='flex items-center gap-2 input input-bordered w-full'>
                    <BsFillCalendarDateFill />
                    <DatePicker
                      selected={postingDate}
                      onChange={(date) => setPostingDate(date)}
                      name='postingDate'
                      className='p-2'
                      dateFormat='yyyy/MM/dd'
                    />
                  </div>
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Deadline</span>
                  </label>
                  <div className='flex items-center gap-2 input input-bordered w-full'>
                    <BsFillCalendarDateFill />
                    <DatePicker
                      selected={deadline}
                      onChange={(date) => setDeadline(date)}
                      className='p-2'
                      name='deadline'
                      dateFormat='yyyy/MM/dd'
                    />
                  </div>
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Banner Url</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Job Banner Image'
                    className='input input-bordered'
                    name='pictureURL'
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Applicants Number</span>
                  </label>
                  <input
                    type='number'
                    placeholder='Job Applicants Number'
                    className='input input-bordered'
                    name='noOfApplicants'
                    readOnly
                    defaultValue={0}
                  />
                </div>
                <div className='form-control mt-6'>
                  <button className='btn btn-primary text-white'>
                    Add Jobs
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddJobs;
