import { Link } from "react-router-dom";

const ErrorPg = () => {
  return (
    <>
      <div className='flex flex-col justify-center h-screen items-center'>
        <img
          className='w-3/12'
          src='https://i.ibb.co/F6nNSvN/error.jpg'
          alt='Error-404'
        />
        <p className='tex-xl font-semibold'>
          Sorry, the page you are looking for does not exit.
        </p>
        <Link className='btn btn-warning mt-5' to='/'>
          Go Back to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPg;
