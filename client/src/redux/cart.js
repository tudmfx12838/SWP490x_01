import * as ActionTypes from "./ActionTypes";

export const Cart = (
  state = {
    // isLoading: true,
    // errmess: null,
    cart: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_TO_CART:
      return state.cart.push(action.payload);
    default:
      return state;
  }
};
