import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import sweetAlertController from "../../utils/sweetAlertController";

const Ask = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.displayName, user?.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: "",
      user_email: user?.email,
      questions: "",
      answers: [],
    },
  });

  const onSubmit = async (data) => {
    console.log("d", data);
    data["user_name"] = user?.displayName;
    data["user_email"] = user?.email;
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/ask`, data);
      console.log(res);
      if (res.data.acknowledged) {
        sweetAlertController(
          "Success",
          "Question Added Successfully, Please wait for response",
          "success",
          "close"
        );
        refetch();
      }
    } catch (error) {
      console.log(error);
      sweetAlertController("Error", "Server Error", "error", "close");
    }
  };

  const { status, data, refetch } = useQuery({
    queryKey: ["qus"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_APP_URL}/ask/${user?.email}`);
    },
  });
  console.log("ask data", data);

  return (
    <>
      <div className='w-11/12 mx-auto mb-10'>
        <h3 className='text-2xl my-5 font-bold text-center'>
          Ask to Community
        </h3>
        <div className='card bg-info text-primary-content mx-auto '>
          <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className='textarea textarea-accent text-black rounded-lg bg-white'
              placeholder='Ask you Questions'
              name='questions'
              {...register("questions", { required: true })}
            ></textarea>
            <div className='card-actions justify-end'>
              <button className='btn w-full rounded-lg'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h3 className='text-2xl my-5 font-bold text-center'>
          Your Asked Question
        </h3>
        <div>
          <div className='overflow-x-auto'>
            <table className='table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Question</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((qus, idx) => (
                  <tr key={qus._id}>
                    <td>{idx}</td>
                    <td>{qus.questions}</td>
                    <td>
                      <Link
                        className='btn btn-secondary btn-outline rounded-lg'
                        to={`/askDetails/${qus._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ask;
