import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import sweetAlertController from "../../utils/sweetAlertController";
import titleUpdate from "../../utils/titleController";

const UpdateJob = () => {
  titleUpdate("Job Hunter | Update Jobs");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employerName, setEmployerName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [lowestSalary, setLowestSalary] = useState("");
  const [highestSalary, setHighestSalary] = useState("");
  const [description, setDescription] = useState("");
  const [postingDate, setPostingDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [bannerURl, setBannerURL] = useState("");
  const [noOfApplicants, setNoOfApplicants] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}/allJobs/${id}`
        );

        const jobInfo = data[0];
        setEmployerName(jobInfo.employerName);
        setTitle(jobInfo.title);
        setCategory(jobInfo.category);
        setLowestSalary(parseInt(jobInfo.lowestSalary));
        setHighestSalary(parseInt(jobInfo.highestSalary));
        setDescription(jobInfo.description);
        setPostingDate(new Date(jobInfo.postingDate));
        setDeadline(new Date(jobInfo.deadline));
        setBannerURL(jobInfo.pictureURL);
        setNoOfApplicants(jobInfo.noOfApplicants);

        setLoading(false);
      } catch (error) {
        sweetAlertController(
          "Error!!!",
          `${error.message} Please Try again`,
          "error",
          "Close"
        );
        //console.log(error.message);
      }
    };
    loadData();
  }, [id]);

  const compareDates = (d1, d2) => {
    const startDate = new Date(d1).getTime();
    const endDate = new Date(d2).getTime();
    return endDate > startDate ? true : false;
  };

  const compareSalary = (low, high) => {
    return high > low ? true : false;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedJobData = Object.fromEntries(new FormData(e.target));

    updatedJobData = {
      ...updatedJobData,
      salaryRange: `${lowestSalary} - ${highestSalary}`,
    };
    //console.log(updatedJobData);
    const jobDeadlineChecker = compareDates(postingDate, deadline);
    const jobSalaryRangeChecker = compareSalary(lowestSalary, highestSalary);

    try {
      if (jobDeadlineChecker && jobSalaryRangeChecker) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_URL}/allJobs/${id}`,
          updatedJobData
        );
        //console.log(data);

        if (data.acknowledged && data.modifiedCount === 1) {
          sweetAlertController(
            "Success",
            "Updated successfully",
            "success",
            "close"
          );
          navigate(`/job/${id}`);
        } else if (data.acknowledged && data.modifiedCount === 0) {
          sweetAlertController(
            "Waring",
            "Nothing to update",
            "warning",
            "close"
          );
        }
        setLoading(false);
      } else {
        jobSalaryRangeChecker
          ? sweetAlertController(
              "Error",
              "Deadline can not be before starting date",
              "error",
              "close"
            )
          : sweetAlertController(
              "Error",
              "Lowest Salary Range can not be greater than Highest Range of the Salary",
              "error",
              "close"
            );
        setLoading(false);
      }
    } catch (error) {
      sweetAlertController("Error!", "Could not update", "error", "close");
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center lg:bg-purple-50 w-full md:w-10/12 lg:w-2/3 py-5 mx-auto rounded-xl mt-10 mb-20'>
        <h3 className='text-4xl text-center font-bold mt-10'>Update Job</h3>
        <div className='md:w-3/5 flex-col lg:flex-row my-10'>
          {loading ? (
            <>
              <Loading />
            </>
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
                    defaultValue={employerName}
                    required
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Category</span>
                  </label>
                  <select
                    value={category}
                    className='select select-bordered w-full '
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option disabled>Select Category</option>
                    <option value='On Site'>On Site</option>
                    <option value='Remote'>Remote</option>
                    <option value='Part-Time'>Part-Time</option>
                    <option value='Hybrids'>Hybrid</option>
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
                      value={lowestSalary}
                      className='input input-bordered'
                      onChange={(e) => setLowestSalary(e.target.value)}
                      required
                    />

                    <input
                      type='number'
                      placeholder='Highest Salary'
                      name='highestSalary'
                      className='input input-bordered'
                      value={highestSalary}
                      onChange={(e) => setHighestSalary(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={bannerURl}
                    onChange={(e) => setBannerURL(e.target.value)}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Job Applicants Number</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Job Applicants Number'
                    className='input input-bordered'
                    name='noOfApplicants'
                    readOnly
                    value={noOfApplicants}
                  />
                </div>
                <div className='form-control mt-6'>
                  <button className='btn btn-primary text-white'>
                    Update Jobs
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

UpdateJob.propTypes = {
  job: PropTypes.object,
};

export default UpdateJob;
