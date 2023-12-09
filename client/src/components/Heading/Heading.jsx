import PropTypes from "prop-types";

const Heading = ({ header }) => {
  return (
    <div className='text-4xl md:text-5xl text-center font-extrabold'>
      <h1>{header}</h1>
      <div className='divider w-1/2 mx-auto'></div>
    </div>
  );
};

Heading.propTypes = {
  header: PropTypes.string,
};

export default Heading;
