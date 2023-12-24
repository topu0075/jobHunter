import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Community = () => {
  const { status, data, refetch } = useQuery({
    queryKey: ["qus"],
    queryFn: async ({ queryKey }) => {
      console.log(queryKey);
      return await axios.get(`${process.env.REACT_APP_URL}/ask/`);
    },
  });
  console.log(data);
  return (
    <div>
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
  );
};

export default Community;
