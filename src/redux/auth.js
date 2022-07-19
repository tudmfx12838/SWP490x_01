import * as ActionTypes from "./ActionTypes";

export const Auth = (
  state = {
    isLoading: true,
    errmess: null,
    auth: {},
  },
  action
) => {
  switch (action.type) {
    // case ActionTypes.PRODUCTS_LOADING:
    //     return {...state, isLoading: action.payload, errmess: null, products: []};
    case ActionTypes.LOADING_AUTH:
      return {
        ...state,
        isLoading: action.payload,
        errmess: null,
        auth: {},
      };
    case ActionTypes.AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        errmess: action.payload,
        auth: {},
      };

    case ActionTypes.ADD_AUTH:
      // alert(action.payload);
      // alert("action.payload " + action.payload.status);
      return {
        ...state,
        isLoading: false,
        errmess: null,
        auth: action.payload,
      };

    case ActionTypes.UPDATE_AUTH:
      // alert(JSON.stringify(state));
      
      //User is using status as true
      if (action.payload === true) {
        return state;
      } else {
        let sessionId = "";
        let isLoggedIn = false;

        return {
          ...state,
          isLoading: false,
          errmess: null,
          auth: { isLoggedIn: isLoggedIn, sessionId: sessionId },
        };
      }

    default:
      return state;
  }
};
