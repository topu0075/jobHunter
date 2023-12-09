import { PropTypes } from "prop-types";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Heading from "../../../../components/Heading/Heading";
import Cards from "./Cards/Cards";
const JobsTabs = ({ allJobsData }) => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(allJobsData);
  const onSiteJobs = data
    .filter((job) => job.category === "On Site")
    .slice(0, 4);

  const remoteJobs = data
    .filter((job) => job.category === "Remote")
    .slice(0, 4);
  const hybridJobs = data
    .filter((job) => job.category === "Hybrid")
    .slice(0, 4);
  const partTimeJobs = data
    .filter((job) => job.category === "Part-Time")
    .slice(0, 4);

  return (
    <>
      <Heading header={"Jobs Category"}></Heading>
      <div className='mb-20 w-10/12 mx-auto'>
        <Tabs>
          <TabList>
            <Tab>On Site Job</Tab>
            <Tab>Remote Job</Tab>
            <Tab>Hybrid</Tab>
            <Tab>Part Time</Tab>
          </TabList>

          <TabPanel>
            <Cards jobs={onSiteJobs}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards jobs={remoteJobs}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards jobs={hybridJobs}></Cards>
          </TabPanel>
          <TabPanel>
            <Cards jobs={partTimeJobs}></Cards>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

JobsTabs.propTypes = {
  allJobsData: PropTypes.array,
};
export default JobsTabs;
