import { Link, useLoaderData } from "react-router-dom";
import titleUpdate from "../../utils/titleController";

const BlogDetails = () => {
  titleUpdate("Job Hunter | Blog Details");
  const { data } = useLoaderData();
  //console.log(data);
  return (
    <div className='w-3/4 mx-auto'>
      <div>
        <img
          src={data[0].imageURL}
          alt='Blog Details Image'
          className='w-11/12 md:w-3/4 mx-auto'
          loading='lazy'
        />
      </div>
      <div className='my-10'>
        <h1 className='text-2xl md:text-4xl font-bold'>
          {data[0].blogPost.title}
        </h1>
      </div>
      {data[0].blogPost?.codeLink && (
        <div className='my-10'>
          <p className='font-bold'>
            Code link:{" "}
            <span className='text-blue-600'>
              <Link to={data[0].blogPost?.codeLink} target='_blank'>
                {data[0].blogPost?.codeLink}
              </Link>
            </span>
          </p>
        </div>
      )}

      <div className='mb-20'>
        {data[0].blogPost.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className='text-xl font-bold my-2'>{section.title}</h3>
            <p className='my-2'>{section.content}..</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
