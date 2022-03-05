import React from 'react'
import ToggleButtons from '../../toggleButton/ToggleButton'
import "./PizzaFilter.scss";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

const PizzaFilter = ({ type, settype, rating, setRating, price, setPrice }) => {


  return (
    <div className='filterMain'>
      <div>
        <h2>Apply Filter Here</h2>
      </div>
      <ToggleButtons type={type} settype={settype} />
      <FormControl fullWidth style={{ margin: "10px", width: "80%" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ paddingLeft: "12px" }}>
          Price
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={price}
          label="Price"
        onChange={(e)=>{setPrice(e.target.value)}}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>Low to High</MenuItem>
          <MenuItem value={2}>High to Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ margin: "10px", width: "80%" }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ paddingLeft: "12px" }}>
          Rating
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rating}
          label="Price"
        onChange={(e)=>{setRating(e.target.value)}}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={4}>4 and Above</MenuItem>
          <MenuItem value={3}>3 and Above</MenuItem>
          <MenuItem value={2}>2 and Above</MenuItem>
          <MenuItem value={1}>1</MenuItem>
        </Select>
      </FormControl>
      {/* <Button variant="primary" fullWidth style={{ width: "80%", background: "#ff9e00", color: "#fff", margin: "10px" }}>Apply</Button> */}
    </div>
  )
}

export default PizzaFilter

