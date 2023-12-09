import { useLoaderData } from "react-router-dom";
import titleUpdate from "../../utils/titleController";
import Card from "./Component/Card";

const Blogs = () => {
  titleUpdate("Job Hunter | Blog");
  const { data } = useLoaderData();
  //console.log(data);
  return (
    <div className='flex flex-col gap-5 mb-20'>
      {data.map((blog) => (
        <Card key={blog._id} blog={blog}></Card>
      ))}
    </div>
  );
};

export default Blogs;
