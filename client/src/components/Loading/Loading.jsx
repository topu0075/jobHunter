import CircleLoader from "react-spinners/CircleLoader";

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <p className='4xl p-2 mb-5'>Please wait . . . .</p>
      <CircleLoader color='#6936d6' loading size={200} />
    </div>
  );
};

export default Loading;
