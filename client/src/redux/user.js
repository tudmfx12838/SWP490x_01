import * as ActionTypes from "./ActionTypes";

export const User = (
  state = {
    isLoading: true,
    errmess: null,
    user: {},
  },
  action
) => {
  switch (action.type) {
    // case ActionTypes.PRODUCTS_LOADING:
    //     return {...state, isLoading: action.payload, errmess: null, products: []};
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

    case ActionTypes.LOGIN_STATUS:
      // alert(action.payload);
      // alert("action.payload " + action.payload.status);
      return {
        ...state,
        isLoading: false,
        errmess: null,
        user: action.payload,
      };

    // case ActionTypes.LOGIN_UPDATE_STATUS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errmess: null,
    //     user: { ...state.user, status: action.payload },
    //   };

    default:
      return state;
  }
};
