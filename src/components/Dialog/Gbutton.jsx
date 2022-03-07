import React, { useState, useContext } from 'react';
import { PizzaStoreContext } from '../../context/Context'
import { Button, ButtonGroup } from '@mui/material';

const Gbutton = ({ pizza }) => {
    const {
        state: { cartItem, noOfItem },
        PizzaStoreContextDispatch,
    } = useContext(PizzaStoreContext);

    const [counter, setCounter] = useState(0);
    const decrement = () => {
        setCounter(counter - 1)
        PizzaStoreContextDispatch({
            type: "setNoOfItem",
            payload: noOfItem - 1,
        });

        PizzaStoreContextDispatch({
            type: "deleteCartItem",
            payload: pizza,
        });
    }

    const increment = () => {
        setCounter(counter + 1)
        
        PizzaStoreContextDispatch({
            type: "setCartItem",
            payload: pizza,
        });
        PizzaStoreContextDispatch({
            type: "setNoOfItem",
            payload: noOfItem + 1,
        });
        console.log("cart: ", cartItem);
        // handleClose();
    }
    return (
        <div style={{ background: "red", borderRadius: "0.8rem", overflow: "hidden", cursor: "initial" }}>
            <ButtonGroup size="small" aria-label="small outlined button group">
                {<Button disabled={pizza.quantity <= 0} onClick={decrement} style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>-</Button>}
                {<Button disabled style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>{pizza.quantity}</Button>}
                <Button
                    onClick={increment} style={{ color: "#fff", fontSize: "1.2rem", border: "none" }}>+</Button>
            </ButtonGroup>
        </div>
    )
}

export default Gbutton