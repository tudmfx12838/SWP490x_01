import * as ActionTypes from "./ActionTypes";

export const Orders = (
  state = {
    isLoading: true,
    errmess: null,
    orders: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        errmess: null,
        orders: [],
      };
    case ActionTypes.ORDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errmess: action.payload,
        orders: [],
      };
    case ActionTypes.ADD_ORDERS:
      return {
        ...state,
        isLoading: false,
        errmess: null,
        orders: action.payload,
      };

    case ActionTypes.ADD_ORDER:
      alert("Call me" + JSON.stringify(action.payload));

      let check = false;
      state.orders.map((item, key) => {
        if (item._id === action.payload._id) {
          check = true;
        }
      });
      if (!check) {
        state.orders.push(action.payload);
      }

      return {...state};

    case ActionTypes.UPDATE_ORDER:
      state.orders.push(action.payload);

      return state;
    //   ...state,
    //   isLoading: false,
    //   errmess: null,
    //   orders: action.payload,
    // };
    default:
      return state;
  }
};
