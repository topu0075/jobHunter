const Banner = () => {
  return (
    <div
      className='hero h-96'
      style={{
        backgroundImage: "url(https://i.ibb.co/j8wDh1p/banner.jpg)",
      }}
    >
      <div className='hero-overlay bg-opacity-50'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold text-white'>
            Connect to Your Future
          </h1>
          <p className='mb-5 text-white'>
            Job Hunter, where opportunities meet talent. Find your dream job
            with ease and efficiency. Start your journey today!
          </p>
          <div>
            <input
              className='text-black input input-bordered'
              type='text'
              placeholder='Search Jobs'
              name='searchJobs'
            />
            <button className='btn btn-primary text-white'>Search Job</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
