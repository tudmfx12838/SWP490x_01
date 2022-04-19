import * as ActionTypes from "./ActionTypes";

/*GET NUMBER CART*/
export function GetNumberCart() {
  return {
    type: ActionTypes.GET_NUMBER_CART,
  };
}

export function AddCart(payload) {
  // alert("ok");
  return {
    type: ActionTypes.ADD_CART,
    payload,
  };
}
export function UpdateCart(payload) {
  return {
    type: ActionTypes.UPDATE_CART,
    payload,
  };
}
export function DeleteCart(payload) {
  return {
    type: ActionTypes.DELETE_CART,
    payload,
  };
}

export function IncreaseQuantity(payload) {
  return {
    type: ActionTypes.INCREASE_QUANTITY,
    payload,
  };
}
export function DecreaseQuantity(payload) {
  return {
    type: ActionTypes.DECREASE_QUANTITY,
    payload,
  };
}
