import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchProducts = () => (dispatch) => {
  return fetch("products")
    .then(
      (respone) => {
        if (respone.ok) {
          return respone;
        } else {
          var error = new Error(
            "Error" + respone.status + " : " + respone.statusText
          );
          error.respone = respone;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )

    .then((respone) => respone.json())
    .then((products) => dispatch(addProducts(products)))
    .catch((error) => dispatch(productsFailed(error.message)));
};

export const addProducts = (products) => ({
  type: ActionTypes.ADD_PRODUCTS,
  payload: products,
});

export const productsFailed = (errmess) => ({
  type: ActionTypes.PRODUCTS_FAILED,
  payload: errmess,
});
