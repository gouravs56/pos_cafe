const initialstate = {
  loading: false,
  cartItem: [],
};

export const rootReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "AddToCart":
      return {
        ...state /* spreading the data state */,
        cartItem: [
          ...state.cartItem,
          action.payload,
        ] /* filling the data of cartItem */,
      };
    case "Update_Cart":
      return {
        ...state,
        cartItem: state.cartItem.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "Delete_Cart_Item":
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default: /* must have a default case  */
      return state;
  }
};
