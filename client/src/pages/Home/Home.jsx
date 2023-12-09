import { useLoaderData } from "react-router-dom";
import titleUpdate from "../../utils/titleController";
import Banner from "./Components/Banner/Banner";
import FAQ from "./Components/FAQ/FAQ";
import InDemandJobs from "./Components/InDemandJobs/InDemandJobs";
import JobTabs from "./Components/JobsTab/JobsTabs";

const Home = () => {
  titleUpdate("Job Hunter | Home");
  const allJobsData = useLoaderData();

  return (
    <div className='flex flex-col gap-10'>
      <Banner className='mb-10'></Banner>
      <JobTabs allJobsData={allJobsData}></JobTabs>
      <InDemandJobs></InDemandJobs>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
