import React from "react";
import PizzaCard from "../PizzaCard/PizzaSection"

const PizzaItems = ({ pizzas, onAddToCart }) => {
    return (
        <div style={{ marginLeft: "10px" }}>
            {pizzas.length <= 0 ? <h2 style={{textAlign:"center"}}>Not Available</h2> :
                pizzas.map((pizza, index) => (
                    <>
                        <PizzaCard key={index} pizza={pizza} onAddToCart={onAddToCart} />
                    </>
                ))
            }
        </div>
    );
};

export default PizzaItems;