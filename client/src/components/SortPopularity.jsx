import * as React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

export default function SortPopularity() {

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    if (event.target.value === "Most Popular") {
      // Use useEffect to build out logic to have dependancies of sort/setSort and suggestionsState //
    } else {
    }
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
        <MenuItem value={10}>Most Popular</MenuItem>
        <MenuItem value={20}>Least Popular</MenuItem>
      </Select>
    </FormControl>
  </Box>
  );
}