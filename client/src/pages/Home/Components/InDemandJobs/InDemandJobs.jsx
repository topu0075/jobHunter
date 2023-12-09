import Heading from "../../../../components/Heading/Heading";

const InDemandJobs = () => {
  return (
    <div className='mb-10'>
      <Heading header={"In-demand Careers"}></Heading>

      <div className='carousel w-full '>
        <div id='slide1' className='carousel-item relative w-full'>
          <div className='hero bg-blue-50'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
              <img
                src='https://i.ibb.co/vVY0bk2/img-4.jpg'
                className='max-w-sm rounded-lg shadow-2xl'
              />
              <div>
                <h1 className='text-4xl font-bold'>
                  Machine Learning Engineer
                </h1>
                <p className='py-6'>
                  Machine learning engineers are responsible for programming and
                  deploying machine learning solutions. These careers have had a
                  344% growth in job postings since 2015, making it the top
                  in-demand job right now. The average base salary for a machine
                  learning engineer is $146,085.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide4' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide2' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide2' className='carousel-item relative w-full'>
          <div className='hero bg-blue-50'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
              <img
                src='https://i.ibb.co/nChbZrX/img-3.jpg'
                className='max-w-sm rounded-lg shadow-2xl'
              />
              <div>
                <h1 className='text-4xl font-bold'>Full Stack Developer</h1>
                <p className='py-6'>
                  A full stack developer has a wide skillset and is able to work
                  in front and back-end development with a variety of
                  programming languages. These developers are in high demand,
                  capturing 828 out of every 1M job postings. Full stack
                  developers earn an average salary of $114,316 per year.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide1' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide3' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide3' className='carousel-item relative w-full'>
          <div className='hero bg-blue-50'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
              <img
                src='https://i.ibb.co/NtxbCvn/img-2.jpg'
                className='max-w-sm rounded-lg shadow-2xl'
              />
              <div>
                <h1 className='text-4xl font-bold'>Dental Hygienist</h1>
                <p className='py-6'>
                  A dental hygienist works under a dentist to examine and clean
                  a patient’s teeth. This is an in-demand job, capturing 878 out
                  of every 1M job postings. Dental hygienists enjoy an average
                  salary of $78,110.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide2' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide4' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide4' className='carousel-item relative w-full'>
          <div className='hero bg-blue-50'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
              <img
                src='https://i.ibb.co/b2B8v33/img-1.jpg'
                className='max-w-sm rounded-lg shadow-2xl'
              />
              <div>
                <h1 className='text-4xl font-bold'>Realtor</h1>
                <p className='py-6'>
                  Realtors play an integral role in helping people to buy and
                  sell property. A realtor is considered an in-demand career due
                  to a 138% increase in job postings for realtors since 2015.
                  Realtors work on a commission basis, but the average salary
                  earned is around $96,820.
                </p>
              </div>
            </div>
          </div>
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide3' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide1' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InDemandJobs;
