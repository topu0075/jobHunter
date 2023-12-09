import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Table from "../../components/Table/Table";
import sweetAlertController from "../../utils/sweetAlertController";
import titleUpdate from "../../utils/titleController";

const MyJobs = () => {
  titleUpdate("Job Hunter | My Jobs");
  const { user } = useContext(AuthContext);
  //console.log(user.displayName);
  const [jobData, setJobData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/myJobs?employerEmail=${user.email}`,
        { withCredentials: true }
      );
      setJobData(data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/deleteJob/${id}`,
        { withCredentials: true }
      );
      if (data.acknowledged && data.deletedCount === 1) {
        const filterData = jobData.filter((job) => job._id !== id);
        //console.log(filterData);
        setJobData(filterData);
        sweetAlertController(
          "Deleted!",
          "Your job has been deleted.",
          "success",
          "close"
        );
      } else {
        sweetAlertController(
          "Delete Request Failed!",
          "This can not be deleted.",
          "error",
          "close"
        );
      }
    } catch (error) {
      sweetAlertController("Deleted Failed!", error.message, "error", "close");
      setLoading(false);
    }
  };
  const handleDelete = async (e) => {
    const delId = e.target.getAttribute("value");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(delId);
      }
    });
  };

  const btnColumn = (value) => (
    <div className='flex gap-3'>
      <Link to={`/update/${value}`} className='btn btn-outline btn-success'>
        Update
      </Link>
      <Link
        value={value}
        className='btn btn-outline btn-error'
        onClick={(e) => handleDelete(e)}
      >
        Delete
      </Link>
    </div>
  );
  return (
    <div>
      {loading ? (
        <div className='flex justify-center'>
          <PropagateLoader className='my-5' color='#6936d6' loading size={20} />
        </div>
      ) : Object.keys(jobData).length > 0 ? (
        <div className='h-96 mt-10'>
          <Table data={jobData} btn={btnColumn}></Table>
        </div>
      ) : (
        <div className='flex justify-center items-center h-60 lg:h-96 w-10/12 mx-auto'>
          <h3 className='text-center text-2xl lg:text-5xl'>
            You have not created a job yet
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
