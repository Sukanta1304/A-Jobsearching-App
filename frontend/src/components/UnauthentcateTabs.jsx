import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function FooterTabs() {
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
        <Tab value="one" label="About us" />
        <Tab value="two" label="Call us" />
        <Tab value="three" label="Mail us" />
      </Tabs>
      <div>
        {value=='one' && <h3>We provide perfect matching job for you.</h3>}
        {value=='two' && <h3>Call us: 9876543210</h3>}
        {value=='three' && <h3>Mail us: abc@gmail.com</h3>}
      </div>
    </Box>
  );
}

export default FooterTabs;