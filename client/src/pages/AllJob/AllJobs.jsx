import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Table from "../../components/Table/Table";
import titleUpdate from "../../utils/titleController";

const AllJobs = () => {
  titleUpdate("Job Hunter | All Jobs");
  const [jobTitle, setJobTitle] = useState("");
  const allJobs = useLoaderData();
  const [tableData, setTableData] = useState(allJobs);

  const handleClearInput = () => {
    setJobTitle("");
    setTableData(allJobs);
  };

  const handleSearch = (e) => {
    setJobTitle(e.target.value);
    //console.log(allJobs.length);
    if (allJobs.length > 0) {
      const filterData = allJobs.filter((search) => {
        //console.log(search?.title);
        return search.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      //console.log(filterData);
      setTableData(filterData);
    }
  };

  const btnColumn = (value) => (
    <div>
      <Link to={`/job/${value}`} className='btn btn-outline'>
        View Details
      </Link>
    </div>
  );

  return (
    <div>
      <div className='flex gap-2 justify-center my-10'>
        <input
          type='text'
          placeholder='Job Title'
          className='input input-bordered w-full max-w-md'
          name='category'
          value={jobTitle}
          onChange={(e) => handleSearch(e)}
        />

        <button
          className='btn btn-outline btn-error'
          onClick={(e) => handleClearInput(e)}
        >
          Clear Search
        </button>
      </div>

      <Table data={tableData} btn={btnColumn} />
    </div>
  );
};

export default AllJobs;
