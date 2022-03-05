import React, { createContext, useReducer } from "react";
import { initialState, pizzaStoreReducer } from "./Reducer";

export const PizzaStoreContext = createContext({});

export const PizzaStoreProvider = ({ children }) => {
    const [state, PizzaStoreContextDispatch] = useReducer(pizzaStoreReducer, initialState);

    return (
        <PizzaStoreContext.Provider value={{ state, PizzaStoreContextDispatch }}>
            {children}
        </PizzaStoreContext.Provider>
    )
};