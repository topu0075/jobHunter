import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
const Card = ({ blog }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 items-center'>
      <div className='col-span-1'>
        <img
          src={blog.imageURL}
          alt='Blog Image'
          className='w-11/12 md:w-3/4 mx-auto'
          loading='lazy'
        />
      </div>
      <div className='col-span-2'>
        <div>
          <h3 className='font-bold text-xl md:text-2xl mt-6 px-5'>
            {blog.blogPost.title}
          </h3>
          <div className=''>
            <p className='my-2 px-5'>{blog.blogPost.sections[0].content}..</p>
          </div>
        </div>
        <div className='flex justify-center lg:justify-start my-2 px-5'>
          <Link
            to={`/blogdetails/${blog._id}`}
            className='btn btn-primary btn-outline my-4'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  blog: PropTypes.object,
};

export default Card;
