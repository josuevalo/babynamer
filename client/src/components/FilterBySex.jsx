import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import WcIcon from '@mui/icons-material/Wc';

export default function FilterbySex({filteredSex, setFilteredSex}) {

  const handleChange = (event, newValue) => {
    setFilteredSex(newValue);
  };

  return (
    <Tabs value={filteredSex} onChange={handleChange} aria-label="filter by sex" centered>
      <Tab icon={<BoyIcon />} value="Boy" label="Boy" />
      <Tab icon={<GirlIcon />} value="Girl" label="Girl" />
      <Tab icon={<WcIcon />} value="All" label="All" />
    </Tabs>
  );
}