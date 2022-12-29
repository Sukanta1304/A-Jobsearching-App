import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllJobs from './jobs/Alljobs';
import Postjobs from './jobs/PostaJob';
import AppliedJobs from './jobs/AppliedJobs';

function HunterTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="APPLY A JOB" />
        <Tab value="two" label="POST A JOB" />
        <Tab value="three" label="APPLIED JOBS" />
      </Tabs>
      <div>
        {value=='one' && <AllJobs/>}
        {value=='two' && <Postjobs/>}
        {value=='three' && <AppliedJobs/>}
      </div>
    </Box>
  );
}

export default HunterTabs;