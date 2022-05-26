import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

export const fetchProducts = () => (dispatch) => {
  return fetch("http://localhost:4000/products")
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

export const fetchOrderInfo = (dataOrder) => (dispatch) => {
  // alert(JSON.stringify(dataOrder));
  // alert("09");
  return fetch("http://localhost:4000/client/order", {
    method: "POST",
    body: JSON.stringify(dataOrder),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      alert(JSON.stringify(data));
    })
    .catch((error) => console.log(error.message));

  // axios.post('http://localhost:4000/client/order', dataOrder)
  // .then(function (response) {
  //   alert(JSON.stringify(response));
  //   alert('1111111111');
  //   // alert(JSON.stringify(data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};
