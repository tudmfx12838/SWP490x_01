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

export const fetchUserLogin = (dataLogin) => (dispatch) => {
  alert(JSON.stringify(dataLogin));
  // alert("09");
  return fetch("http://localhost:4000/client/login", {
    method: "POST",
    body: JSON.stringify(dataLogin),
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

export const fetchSignupAccountInfo = (dataSignup) => (dispatch) => {
  // alert("response.data.CSRFToken");

  alert("dataSignup  " + dataSignup);

  // fetch("http://localhost:4000/client/signup", {
  //   method: "POST",
  //   body: JSON.stringify(dataSignup),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     let result = JSON.stringify(data);
  //     alert(result);
  //   })
  //   .catch((error) => console.log(error.message));

  // fetch("http://localhost:4000/client/getCSRFToken")
  //   .then((res) => {
  //     alert(res.data.CSRFToken);
  //   })
  //   .catch((error) => console.log(error.message));

  //  return result;
  // axios
  //   .get("http://localhost:4000/client/getCSRFToken")
  //   .then((response) => {
  //     alert(response.data.CSRFToken);
  //     // token = response.data.CSRFToken;
  //     // alert(token);
  //     return response.data.CSRFToken;
  //   })
  //   .then((token) => {
  //     alert("token: " + token);
  //     dataSignup._csrf = token;

  //     fetch("http://localhost:4000/client/signup", {
  //       method: "POST",
  //       body: JSON.stringify(dataSignup),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then(function (res) {
  //         return res.json();
  //       })
  //       .then(function (data) {
  //         alert(JSON.stringify(data));
  //       })
  //       .catch((error) => console.log(error.message));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // alert(JSON.stringify(dataSignup));
  // const getCSRFToken = async () => {
  //   const response = await axios.get(
  //     "http://localhost:4000/client/getCSRFToken"
  //   );
  //   axios.defaults.headers.post["xsrf-token"] = response.data.CSRFToken;
  //   // alert(response.data.CSRFToken);
  //   // return response.data.CSRFToken;
  //   axios
  //     .post("http://localhost:4000/client/signup", dataSignup)
  //     .then((respone) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // getCSRFToken();

  // axios
  //   .get("http://localhost:4000/client/getCSRFToken")
  //   .then((response) => {
  //     // alert(response.data.CSRFToken);
  //     // token = response.data.CSRFToken;
  //     // alert(token);
  //     return response.data.CSRFToken;
  //   })
  //   .then((token) => {
  //     alert("token: " + token);
  //     // dataSignup._csrf = token;
  //     // alert(JSON.stringify(dataSignup));
  //     axios.defaults.headers.post['X-CSRF-Token'] = token;
  //     // axios
  //   .post("http://localhost:4000/client/signup", dataSignup)
  //   .then((respone) => {});
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // return fetch("http://localhost:4000/client/signup", {
  //   method: "POST",
  //   body: JSON.stringify(dataSignup),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then(function (res) {
  //     return res.json();
  //   })
  //   .then(function (data) {
  //     alert(JSON.stringify(data));
  //   })
  //   .catch((error) => console.log(error.message));
};
