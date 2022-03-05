export const initialState = {
    cartItem: [],
    noOfItem: 0,
}

export const pizzaStoreReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "setCartItem":
            console.log("i am reducer set ,", payload);
            return {
                ...state,
                cartItem: [...state.cartItem, payload],
            };
        case "deleteCartItem":
            console.log("i am reducer del ,", payload);
            return {
                ...state,
                cartItem: state.cartItem.filter((item) => item.id  !== payload.id && item.amount !== payload.amount && item.name !== payload.name),
            };
        case "setNoOfItem":
            return {
                ...state,
                noOfItem: payload,
            }
        case "setEmptyCart":
            return{
                ...state,
                cartItem:[],
                noOfItem:0,
            }
        default:
            return state;
    }
};