import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
        {value=='one' && <h1>ALL JOBS</h1>}
        {value=='two' && <h1>POST JOBS</h1>}
        {value=='three' && <h1>APPLIED JOBS</h1>}
      </div>
    </Box>
  );
}

export default HunterTabs;