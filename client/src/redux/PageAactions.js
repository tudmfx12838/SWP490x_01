import * as ActionTypes from "./ActionTypes";
import { UpdateUserCartToPageCart, setEmptyCart } from "./CartActions";
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
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert("Đặt hàng thành công!\nMã đơn hàng là: " + data.inform);
      if (data.hasAccount) {
        dispatch(updateOrder(data.order));
      }
      dispatch(setEmptyCart([]));
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
      if (respone.isLoggedIn) {
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
            doB: respone.user.doB,
            imageUrl: respone.user.imageUrl,
            phoneNumber: respone.user.phoneNumber,
            address: respone.user.address,
            point: respone.user.point,
            cart: respone.user.cart,
          },
        };

        const orderHistory = respone.user.orderHistory;

        // alert("orderHistory   " + JSON.stringify(orderHistory));

        dispatch(addAuth(auth));
        dispatch(userLoginStatus(status));
        dispatch(UpdateUserCartToPageCart(respone.user.cart));
        dispatch(addOrders(orderHistory));
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");
      }
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

export const fetchEditUserInfo = (editUserInfo) => (dispatch) => {
  // alert("fetchEditUserInfo " + JSON.stringify(editUserInfo));
  // dispatch(updateUserCart(editUserInfo.Carts));
  // /client/updateCartFromClientToServer
  return fetch("http://localhost:4000/client/editUserInfo", {
    method: "POST",
    body: JSON.stringify(editUserInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((respone) => {
      alert(JSON.stringify(respone));
      if (respone.isEditted) {
        alert(respone.inform);
        dispatch(updateEdittedUserInfo(respone.user));
      } else {
        alert(respone.inform);
      }
    })
    .catch((error) => console.log(error));
};

export const updateEdittedUserInfo = (edittedUserInfo) => ({
  type: ActionTypes.UPDATE_EDITTED_USER_INFO,
  payload: edittedUserInfo,
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
        dispatch(UpdateUserCartToPageCart([]));
        dispatch(addOrders([]));
      } else {
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
      if (auth.isLoggedIn === true) {
        // alert("JSON.stringify(auth)   " + JSON.stringify(auth));
        dispatch(updateAuth(auth.isLoggedIn));
      } else {
        alert("Phiên hết hạn vui lòng đăng nhập lại");
        // const auth = {
        //   isLoggedIn: false,
        //   sessionId: "",
        // };
        dispatch(updateAuth(auth.isLoggedIn));
        dispatch(userLoginStatus({ status: "idle", user: null }));
        dispatch(UpdateUserCartToPageCart([]));
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

export const fetchConfirmBeforeResetPassword = (email) => (dispatch) => {
  return fetch("http://localhost:4000/client/confirmBeforeResetPassword", {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((respone) => {
      alert(respone.inform);
      //
    })
    .catch((error) => console.log(error));
};

export const fetchUpdateCart = (updateCartInfo) => (dispatch) => {
  // alert("fetchUpdateCart " + JSON.stringify(updateCartInfo));
  dispatch(updateUserCart(updateCartInfo.Carts));
  // /client/updateCartFromClientToServer
  return fetch("http://localhost:4000/client/updateCartFromClientToServer", {
    method: "POST",
    body: JSON.stringify(updateCartInfo),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((respone) => {
      alert(JSON.stringify(respone));
      // alert(result.logout);// true
      // alert("Đăng xuất thành công");
      // dispatch(userLoginStatus({ status: "idle", user: null }));
      // dispatch(addAuth({ isLoggedIn: false, sessionId: null }));
    })
    .catch((error) => console.log(error));
};

export const addUserCartFailed = (errMsg) => ({
  type: ActionTypes.ADD_USERCART_FAILED,
  payload: errMsg,
});

export const addUserCart = (auth) => ({
  type: ActionTypes.ADD_USERCART,
  payload: auth,
});

export const updateUserCart = (Carts) => ({
  type: ActionTypes.UPDATE_USERCART,
  payload: Carts,
});

export const fetchOrderHistoryWithOrderId = (orderId) => (dispatch) => {
  // alert("fetchUpdateCart " + JSON.stringify(updateCartInfo));
  // dispatch(updateUserCart(updateCartInfo.Carts));
  // /client/updateCartFromClientToServer
  return fetch("http://localhost:4000/client/getOrderHistoryByOrderId", {
    method: "POST",
    body: JSON.stringify({ orderId: orderId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((respone) => {
      alert(respone.inform);
      if (respone.result) {
        dispatch(addOrder(respone.order));
      }
    })
    .catch((error) => console.log(error));
};

export const fetchCancelOrderWithOrderId = (orderInfo) => (dispatch) => {
  // alert("fetchUpdateCart " + JSON.stringify(updateCartInfo));
  // dispatch(updateUserCart(updateCartInfo.Carts));
  // /client/updateCartFromClientToServer
  return fetch("http://localhost:4000/client/cancelOrderWithOrderId", {
    method: "POST",
    body: JSON.stringify({ orderId: orderInfo.orderId, approveStatus: orderInfo.approveStatus}),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((respone) => respone.json())
    .then((respone) => {
      alert(respone.inform);
      if (respone.result) {
        dispatch(removeOrder(respone.orderId));
      }
    })
    .catch((error) => console.log(error));
};

export const addOrdersLoading = (bol) => ({
  type: ActionTypes.ORDERS_LOADING,
  payload: bol,
});

export const addOrdersFailed = (error) => ({
  type: ActionTypes.ORDERS_FAILED,
  payload: error,
});

export const addOrders = (orders) => ({
  type: ActionTypes.ADD_ORDERS,
  payload: orders,
});

export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order,
});

export const updateOrder = (order) => ({
  type: ActionTypes.UPDATE_ORDER,
  payload: order,
});

export const removeOrder = (orderId) => ({
  type: ActionTypes.REMOVE_ORDER,
  payload: orderId,
});

