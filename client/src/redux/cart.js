import * as ActionTypes from "./ActionTypes";

const initCart = {
  numberCart: 0,
  Carts: [],
};

export const Cart = (state = initCart, action) => {
  switch (action.type) {
    case ActionTypes.GET_NUMBER_CART:
      return {
        ...state,
      };
    case ActionTypes.ADD_CART:
      if (state.numberCart === 0) {
        let cart = {
          _id: action.payload._id,
          quantity: 1,
          title: action.payload.title,
          imageUrl: action.payload.imageUrl,
          price: action.payload.price,
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item._id === action.payload._id) {
            state.Carts[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            _id: action.payload._id,
            quantity: 1,
            title: action.payload.title,
            imageUrl: action.payload.imageUrl,
            price: action.payload.price,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case ActionTypes.INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;

      return {
        ...state,
      };
    case ActionTypes.DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }

      return {
        ...state,
      };
    case ActionTypes.DELETE_CART:
      let quantity_ = state.Carts[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter((item) => {
          return item._id !== state.Carts[action.payload]._id;
        }),
      };
    default:
      return state;
  }
};
