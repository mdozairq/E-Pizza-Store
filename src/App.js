import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './components/Navbar/Navbar'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PizzaItems from './components/LeftSection/PizzaItems';
import PizzaFilter from './components/RightSection/Filter/PizzaFilter';
import { CircularProgress } from '@mui/material';



function App() {
  const [pizza, setPizza] = useState([]);
  const [SortedPizza, setSortedPizza] = useState([]);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [type, settype] = useState("all");

  
//   function to fetch products from commercejs
  const fetchPizzaDetails = async () => {
    // fetch products and destucture it on app load, it returns promise
    const response = await axios.get("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68");
    console.log(response);
    // setting state as fetched products
    setPizza(response.data);
  };


  useEffect(() => {
    fetchPizzaDetails();
  }, []);

  useEffect(() => {
    const typePizza = type === "veg" ? pizza.filter(a => a.isVeg) :
      type === "non-veg" ? pizza.filter(a => !a.isVeg) :
        pizza;
    const sortedPrice = price === 1 ? [...typePizza].sort((a, b) => a.price - b.price) :
      price === 2 ? [...typePizza].sort((a, b) => b.price - a.price) : typePizza;
    const sortedRating = rating === 5 ? [...sortedPrice].filter(a => a.rating === 5) :
      rating === 4 ? [...sortedPrice].filter(a => a.rating >= 4 && a.rating < 5) :
        rating === 3 ? [...sortedPrice].filter(a => a.rating >= 3 && a.rating < 4) :
          rating === 2 ? [...sortedPrice].filter(a => a.rating >= 2 && a.rating < 3) :
            rating === 1 ? [...sortedPrice].filter(a => a.rating === 1) :
              sortedPrice;
    setSortedPizza(sortedRating);
  }, [type, pizza, rating, price])


  return (
    <div div={{ width: "100%" }}>
      <Navbar />
      {
        pizza.length <= 0 ?
          <Box sx={{ display: 'flex', justifyContent:"space-around" }}>
            <CircularProgress color="inherit" />
          </Box> :
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9} md={9}>
                <PizzaItems pizzas={SortedPizza} />
              </Grid>
              <Grid item xs={12} lg={3} md={3}>
                <PizzaFilter type={type} settype={settype} price={price} setPrice={setPrice} rating={rating} setRating={setRating} />
              </Grid>
            </Grid>
          </Box>
      }
    </div>
  );
}

export default App;
