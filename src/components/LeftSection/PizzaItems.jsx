import React from "react";
import PizzaCard from "../PizzaCard/PizzaSection"

const PizzaItems = ({ pizzas, onAddToCart }) => {
    return (
        <div  style={{ marginLeft: "10px" }}>
            {pizzas.map((pizza) => (
                <>
                    <PizzaCard pizza={pizza} onAddToCart={onAddToCart} />
                </>
            ))}
        </div>
    );
};

export default PizzaItems;