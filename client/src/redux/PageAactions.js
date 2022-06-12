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
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

export const fetchUserLogin = (dataLogin) => (dispatch) => {
  return fetch("http://localhost:4000/client/login", {
    method: "POST",
    body: JSON.stringify(dataLogin),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
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
    .then((respone) => {
      // alert(JSON.stringify(status));

      //Auth data
      const auth = {
        isLoggedIn: respone.user.isLoggedIn,
        sessionId: respone.user.sessionId,
      };

      //User data
      const status = {
        status: respone.status,
        user: {
          email: respone.user.email,
          name: respone.user.name,
          phoneNumber: respone.user.phoneNumber,
          address: respone.user.address,
          point: respone.user.point,
          cart: respone.user.cart,
        },
      };

      dispatch(addAuth(auth));
      dispatch(userLoginStatus(status));
    })
    .catch((error) => dispatch(userLoginFailed(error.message)));
};

export const changeLoginStatus = (status) => (dispatch) => {
  //dispatch => store
  dispatch(userLoginStatus(status));
};

export const userLogging = (bol) => ({
  type: ActionTypes.LOGGING,
  payload: bol,
});

export const userLoginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess,
});

export const userLoginStatus = (status) => ({
  type: ActionTypes.LOGIN_STATUS,
  payload: status,
});

export const fetchUserLogout = (sessionId) => (dispatch) => {
  // alert(email);
  return fetch("http://localhost:4000/client/logout", {
    method: "POST",
    body: JSON.stringify({ sessionId: sessionId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((result) => {
      if (result.isLogout) {
        // alert(result.logout);// true
        alert("Đăng xuất thành công");
        dispatch(userLoginStatus({ status: "idle", user: null }));
        dispatch(addAuth({ isLoggedIn: false, sessionId: null }));
      }else{
        alert("Đăng xuất thất bại");
      }
    })
    .catch((error) => console.log(error));
};

export const fetchAuthentication = (sessionId) => (dispatch) => {
  // alert(JSON.stringify(sessionId));
  return fetch("http://localhost:4000/client/checkingAuth", {
    method: "POST",
    body: JSON.stringify({ sessionId: sessionId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
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
    .then((auth) => {
      if(auth.isLoggedIn === true){
        alert("JSON.stringify(auth)   " + JSON.stringify(auth));
        dispatch(updateAuth(auth.isLoggedIn));
      }else{
        alert("Phiên hết hạn vui lòng đăng nhập lại");
        dispatch(updateAuth(auth.isLoggedIn));
        dispatch(userLoginStatus({status: "idle", user: null}));
      } 
      // dispatch(addAuth(auth));
    })
    .catch((error) => dispatch(authFailed(error.message)));
};

export const authLoading = (bol) => ({
  type: ActionTypes.LOADING_AUTH,
  payload: bol,
});

export const authFailed = (errMsg) => ({
  type: ActionTypes.AUTH_FAILED,
  payload: errMsg,
});

export const addAuth = (auth) => ({
  type: ActionTypes.ADD_AUTH,
  payload: auth,
});

export const updateAuth = (auth) => ({
  type: ActionTypes.UPDATE_AUTH,
  payload: auth,
});

export const fetchSignupAccountInfo = (dataSignup) => (dispatch) => {
  // alert("response.data.CSRFToken");

  alert("dataSignup  " + dataSignup);

  fetch("http://localhost:4000/client/signup", {
    method: "POST",
    body: JSON.stringify(dataSignup),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let result = JSON.stringify(data);
      alert(result);
    })
    .catch((error) => console.log(error.message));

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

export const fetchConfirmBeforeResetPassword = (email) => (dispatch) => {};

export const fetchAddCart = (Carts) => (dispatch) => {

};

export const fetchUpdateCart = (Carts) => (dispatch) => {
  
};

export const addUserCartFailed = (errMsg) => ({
  type: ActionTypes.ADD_USERCART_FAILED,
  payload: errMsg,
});

export const addUserCart = (auth) => ({
  type: ActionTypes.ADD_USERCART,
  payload: auth,
});

export const updateUserCart = (auth) => ({
  type: ActionTypes.UPDATE_USERCART,
  payload: auth,
});
