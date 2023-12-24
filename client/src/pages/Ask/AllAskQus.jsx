import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import sweetAlertController from "../../utils/sweetAlertController";

const AllAskQus = () => {
  const { id } = useParams();
  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { status, data, refetch } = useQuery({
    queryKey: ["qus"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_APP_URL}/askDetails/${id}`);
    },
  });

  const onSubmit = async (data) => {
    console.log("d", data);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_URL}/askDetails/${id}`,
        data
      );
      console.log(res);
      if (res.data.acknowledged) {
        sweetAlertController(
          "Success",
          "Successfully answer the questions.",
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

  console.log("ask data", data);
  return (
    <div>
      <div className='w-11/12 mx-auto mb-10'>
        <div className='card bg-info text-primary-content mx-auto '>
          <form className='card-body'>
            <input
              className='textarea textarea-accent text-black rounded-lg bg-white'
              placeholder='Ask you Questions'
              readOnly
              value={data?.data[0].questions}
            ></input>
          </form>
        </div>

        <div>
          <h3 className='text-2xl my-5 font-bold text-center'>answers</h3>
          <div className='border-2 p-2 grid grid-cols-1 justify-center mx-auto'>
            <div className='card bg-gray-200 text-primary-content mx-auto my-10 w-11/12'>
              <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className='textarea textarea-accent text-black rounded-lg bg-white'
                  placeholder='Answer the Questions'
                  name='answer'
                  {...register("answer", { required: true })}
                ></textarea>
                <div className='card-actions justify-end'>
                  <button className='btn w-full rounded-lg btn-primary'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {data?.data[0].answers.map((ans, idx) => (
              <div key={idx} className='flex'>
                <input
                  className='input input-accent text-black rounded-lg bg-white w-11/12 mx-auto mb-2'
                  readOnly
                  value={ans}
                ></input>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAskQus;
