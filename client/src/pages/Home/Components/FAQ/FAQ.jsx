import Heading from "../../../../components/Heading/Heading";

const FAQ = () => {
  return (
    <div className='w-10/12 md:w-3/4 mx-auto flex flex-col gap-3 mb-16'>
      <Heading header={"Common Job Interview Questions"}></Heading>
      <div className='collapse collapse-arrow bg-purple-50'>
        <input type='radio' name='my-accordion-2' />
        <div className='collapse-title text-xl font-medium'>
          1. Tell me about Yourself
        </div>
        <div className='collapse-content'>
          <p>
            I’m Tom and I belong to California. I’ve completed my Master of
            Financial Engineering Program from the University of California. I
            am energetic & a great communicator. My previous experience in the
            same position helped me build confidence and develop advanced skills
            for this position. I am trustworthy and punctual, and I can always
            be depended on to finish what I start. I also consider myself
            hardworking, reliable, dependable, helpful, outgoing, organized,
            honest and cooperative.
          </p>
        </div>
      </div>
      <div className='collapse collapse-arrow bg-purple-50'>
        <input type='radio' name='my-accordion-2' />
        <div className='collapse-title text-xl font-medium'>
          2. How Did You Hear About This Position?
        </div>
        <div className='collapse-content'>
          <p>
            I am actively searching for a job and have seen your job circular
            online and found it suitable for me. After reviewing the
            application, I realized that it is completely compatible with my
            career planning, and I felt fit for this position, so I applied
            here.
          </p>
        </div>
      </div>
      <div className='collapse collapse-arrow bg-purple-50'>
        <input type='radio' name='my-accordion-2' />
        <div className='collapse-title text-xl font-medium'>
          3. Why do you consider yourself suitable for this job?
        </div>
        <div className='collapse-content'>
          <p>
            I think now is the time to move on to greater responsibilities in
            the workplace. I believe that the opportunity to work in your
            organization will develop my personality as well as my skills. Also,
            your organization will give me the opportunity to work in the same
            team with experienced professionals so that I will be able to give
            my full potential. I am confident that the opportunity to join here
            will enable me to advance myself in my career as well as contribute
            to the overall growth of the organization.
          </p>
        </div>
      </div>
      <div className='collapse collapse-arrow bg-purple-50'>
        <input type='radio' name='my-accordion-2' />
        <div className='collapse-title text-xl font-medium'>
          4. Why should we hire you?
        </div>
        <div className='collapse-content'>
          <p>
            Well, I have all of the skills and experience that you’re looking
            for, and I’m confident that I would be appropriate for this
            position. From my previous experience in different organizations, I
            learned how to multitask and prioritize responsibilities. Besides,
            my communication skills from working directly with senior managers
            make me more deserving for this job. I’d love nothing more than to
            join your team here and grow this business unit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
