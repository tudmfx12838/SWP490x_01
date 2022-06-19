import * as ActionTypes from "./ActionTypes";
import getFormatDate from "../includes/getFormatDate";

export const User = (
  state = {
    isLoading: true,
    errmess: null,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGGING:
      return {
        ...state,
        isLoading: action.payload,
        errmess: null,
        user: {},
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        errmess: action.payload,
        user: {},
      };

    case ActionTypes.UPDATE_EDITTED_USER_INFO:
      // alert("user" + JSON.stringify(action.payload));
      // alert("   , state" + JSON.stringify(state));
      state.user.user.name = action.payload.name;
      state.user.user.doB = getFormatDate(action.payload.doB);
      state.user.user.phoneNumber = action.payload.phoneNumber;
      state.user.user.address = action.payload.address;
      // alert("   , state" + JSON.stringify(state));
      return state;

    case ActionTypes.LOGIN_STATUS:
      // alert(action.payload);
      // alert("action.payload " + action.payload.status);
      return {
        ...state,
        isLoading: false,
        errmess: null,
        user: action.payload,
      };

    case ActionTypes.UPDATE_USERCART:
      // alert(
      //   "called UPDATE_USERCART cart.js  " +
      //     JSON.stringify(state.user) +
      //     " cart: " +
      //     state.user.user.cart +
      //     "     action.payload:  " +
      //     JSON.stringify(action.payload)
      // );
      state.user.user.cart = JSON.parse(JSON.stringify(action.payload));
      return state;

    default:
      return state;
  }
};
