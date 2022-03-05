import React, { useState, useEffect, useContext } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {PizzaStoreContext} from '../../context/Context'
import { pizzaStoreReducer } from '../../context/Reducer';
import { Rating, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const GroupButton = ({pizza}) => {
    const {
        state: {cartItem, noOfItem},
        PizzaStoreContextDispatch,
      } = useContext(PizzaStoreContext);

    const [counter, setCounter] = useState(0);
    const [size, setSize] = useState(0);
    const [toppings, setToppings] = useState(0)
    const [amount, setamount] = useState(pizza.price)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
      if(noOfItem===0)
        setCounter(0)
    }, [noOfItem])
    
    useEffect(() => {
    let price1, price2;
    if(size===0) price1=pizza.price;
    else if(size === 1) price1 = pizza.price+10;
    else price1 = pizza.price+20;
    if(toppings===0) price2=0;
    else if(toppings === 1) price2 = 10;
    else if(toppings === 2) price2 = 20;
    else if(toppings === 3) price2 = 30;
    else price2 = 40;
    setamount(price1+price2)
    }, [size, toppings])
    
    const handleClose = () => {
        setOpen(false);
    };

    const increment = () => {
        // setCounter(counter + 1)
        handleClickOpen();
    }

    const decrement = ()=>{
        const Item = {
            id: pizza.id,
            name: pizza.name,
            isVeg: pizza.isVeg,
            size: pizza.size[0].isRadio ? pizza.size[0].items[size]: "-",
            toppings: pizza.toppings[0].isRadio ? pizza.toppings[0].items[toppings]: "-",
            amount: amount,
        }
        setCounter(counter - 1)
        PizzaStoreContextDispatch({
            type: "setNoOfItem",
            payload: noOfItem-1,
        });

        PizzaStoreContextDispatch({
            type: "deleteCartItem",
            payload: Item,
        });
    }
    
    const addToCart = () =>{
        const Item = {
            id: pizza.id,
            name: pizza.name,
            isVeg: pizza.isVeg,
            size: pizza.size[0].isRadio ? pizza.size[0].items[size]: "-",
            toppings: pizza.toppings[0].isRadio ? pizza.toppings[0].items[toppings]: "-",
            amount: amount,
        }
        
        PizzaStoreContextDispatch({
            type: "setCartItem",
            payload: Item,
        });
        setCounter(counter + 1)
        PizzaStoreContextDispatch({
            type: "setNoOfItem",
            payload: noOfItem+1,
        });
        console.log("cart: ",cartItem);
        handleClose();
    }


    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                <h3>{pizza.name}</h3>
                <p style={{color:"gray", fontSize:"16px"}}>{pizza.description}</p>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-slide-description">
                        
                    </DialogContentText>
                    {pizza.size[0].isRadio &&
							<div>
								<p style={{fontWeight:"bold"}}>{pizza.size[0].title}:</p>
								<RadioGroup aria-label="anonymous" name="anonymous" value={size} row>
									{pizza.size[0].items.map((item, id) => (
										<FormControlLabel value={id} control={<Radio onChange={() => setSize(id)}/>} label={item.size} />
									))}
								</RadioGroup>
							</div>
						}

						{pizza.toppings[0].isRadio &&
							<div>
								<p style={{fontWeight:"bold"}}>{pizza.toppings[0].title}:</p>
								<RadioGroup aria-label="anonymous" name="anonymous" value={toppings}  row>
									{pizza.toppings[0].items.map((item, id) => (
										<FormControlLabel  
                                        control={<Radio onChange={() => setToppings(id)}/>} 
                                        label={item.name} 
                                        value={id}
                                        />
									))}
								</RadioGroup>
							</div>
						}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                    variant="primary" 
                    fullWidth
                    onClick={addToCart} 
                    style={{width:"80%", background:"#ff9e00", color:"#fff", margin:"10px"}}
                    >Add to Cart - ₹{amount}</Button>
                </DialogActions>
            </Dialog>
            <ButtonGroup size="small" aria-label="small outlined button group">
                {<Button disabled={counter <= 0} onClick={decrement} style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>-</Button>}
                {<Button disabled style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>{counter}</Button>}
                <Button
                    // disabled={counter >= product['countInStock']} 
                    onClick={increment} style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>+</Button>

            </ButtonGroup>
        </>
    )
}

export default GroupButton