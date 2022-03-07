export const initialState = {
    cartItem: [],
    noOfItem: 0,
}

export const pizzaStoreReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "setCartItem":
            if (state.cartItem.find((item) => item.id === payload.id && item.amount === payload.amount && item.size.size === payload.size.size)) {
                const newItem = state.cartItem.map((varietal) => {
                    if (varietal.id === payload.id && varietal.amount === payload.amount && varietal.size.size === payload.size.size) {
                        return { ...varietal, finalAmount: varietal.amount * (varietal.quantity + 1), quantity: varietal.quantity + 1 };
                    }
                    return varietal;
                });
                return {
                    ...state,
                    cartItem: newItem,
                };
            }
            else
                return {
                    ...state,
                    cartItem: [...state.cartItem, { ...payload, finalAmount: payload.amount, quantity: 1 }],
                };
        case "deleteCartItem":
            if (state.cartItem.find((item) => item.id === payload.id && item.amount === payload.amount && item.size.size === payload.size.size && item.quantity > 1)) {
                console.log("I entered");
                const newItem = state.cartItem.map((varietal) => {
                    if (varietal.id === payload.id && varietal.amount === payload.amount && varietal.size.size === payload.size.size) {
                        return { ...varietal, finalAmount: varietal.finalAmount - varietal.amount, quantity: varietal.quantity - 1 };
                    }
                    return varietal;
                });
                return {
                    ...state,
                    cartItem: newItem,
                };
            }
            else {
                const newItem = state.cartItem.filter((varietal, index) => {
                    if (varietal.id === payload.id && varietal.amount === payload.amount && varietal.size.size === payload.size.size) {
                        return false;
                    }
                    return varietal;
                });
                console.log("After Del: ", newItem);
                return {
                    ...state,
                    cartItem: newItem,
                };

            }
        case "setNoOfItem":
            return {
                ...state,
                noOfItem: payload,
            }
        case "setEmptyCart":
            return {
                ...state,
                cartItem: [],
                noOfItem: 0,
            }
        default:
            return state;
    }
};