import * as React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function SortPopularity({popularity, setPopularity}) {

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
      setPopularity(event.target.value)
      console.log("SETPOPULARITY", popularity)
      console.log("e.t.v", event)
  };

  return (
    <Box sx={{ minWidth: 120 }} id="sort-box">
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value={"Most Popular"}>Most Popular</MenuItem>
        <MenuItem value={"Least Popular"}>Least Popular</MenuItem>
      </Select>
    </FormControl>
  </Box>
  );
}