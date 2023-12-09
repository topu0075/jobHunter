import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Table from "../../components/Table/Table";
import titleUpdate from "../../utils/titleController";

const AppliedJobs = () => {
  titleUpdate("Job Hunter | Applied Jobs");
  const { user } = useContext(AuthContext);
  const [appliedJob, setAppliedJob] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const options = {
    method: "open",

    resolution: Resolution.HIGH,
    page: {
      margin: Margin.LARGE,
    },
  };

  const { targetRef } = usePDF({ filename: "page.pdf" });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/appliedJobs?appliedApplicantsEmail=${user.email}`,
        { withCredentials: true }
      );
      setAppliedJob(data);
      setFilterByCategory(data);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const handleOnChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "all") {
      setFilterByCategory(appliedJob);
    } else {
      const appliedJobFilter = appliedJob.filter(
        (job) => job.category === e.target.value
      );
      //console.log(appliedJobFilter);
      setFilterByCategory(appliedJobFilter);
    }
  };

  const btnColumn = () => <div></div>;

  return (
    <div>
      <div className='form-control w-1/2 mx-auto items-center my-10'>
        <label className='label'>
          <span className='text-center label-text text-xl'>
            Job Category Filter
          </span>
        </label>
        <select
          value={category}
          className='select select-bordered w-full '
          name='category'
          onChange={(e) => handleOnChange(e)}
        >
          <option disabled>Select Category</option>
          <option value='all'>All</option>
          <option value='On Site'>On Site</option>
          <option value='Remote'>Remote</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Hybrids'>Hybrid</option>
        </select>
      </div>
      <div className='flex justify-center mb-10'>
        <button
          className='btn btn-primary btn-outline'
          onClick={() =>
            generatePDF(targetRef, { filename: "Applied Jobs.pdf" }, options)
          }
        >
          <span className='text-xs'>Download Summary</span>
        </button>
      </div>
      <div ref={targetRef}>
        {loading ? (
          <div className='flex justify-center'>
            <PropagateLoader
              className='my-5'
              color='#6936d6'
              loading
              size={20}
            />
          </div>
        ) : Object.keys(filterByCategory).length > 0 ? (
          <div className='h-64 '>
            <Table data={filterByCategory} btn={btnColumn} />
          </div>
        ) : (
          <div className='flex justify-center items-center h-60 lg:h-96 w-10/12 mx-auto'>
            <h3 className='text-center text-2xl lg:text-5xl'>
              You have not applied for any job yet
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
