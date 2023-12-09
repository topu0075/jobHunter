import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  //console.log(job);
  return (
    <div className='card card-compact bg-base-100 shadow-xl p-2'>
      <figure>
        <img
          src={`${job.pictureURL}`}
          alt='Job Banner'
          className='rounded-lg'
          loading='lazy'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{job.title}</h2>
        <p className='my-1'>
          <span className='font-bold'>Employer: </span> {job.employerName}
        </p>
        <p className='my-1'>
          <span className='font-bold'>Category: </span> {job.category}
        </p>
        <p className='my-1'>
          <span className='font-semibold'>Salary: </span>
          {job.salaryRange} <span className='font-medium'>Taka</span>
        </p>
        <p className='my-1'>
          <span className='font-semibold'>Posted On: </span>
          {job.postingDate}
        </p>
        <p className='my-1'>
          <span className='font-semibold'>Deadline: </span>
          {job.deadline}
        </p>
        <p className='my-1'>
          <span className='font-semibold'>No of Applicants: </span>
          {job.appliedApplicantsEmail?.length}
        </p>
        {/* <p className='my-1'>
          <span className='font-semibold'>Description: </span>
          {job.description?.length < 150
            ? job.description
            : `${job.description?.slice(0, 100)} ...`}
        </p> */}

        <div className='card-actions justify-start mt-2 mb-5'>
          <Link className='btn btn-primary text-white' to={`/job/${job._id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  job: PropTypes.object,
};

export default Card;
