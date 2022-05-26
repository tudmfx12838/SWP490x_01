// import * as ActionTypes from "./ActionTypes";
// import axios from "axios";

// export const fetchManageProducts = () => (dispatch) => {
//   return fetch("admin/products")
//     .then(
//       (respone) => {
//         if (respone.ok) {
//           return respone;
//         } else {
//           var error = new Error(
//             "Error" + respone.status + " : " + respone.statusText
//           );
//           error.respone = respone;
//           throw error;
//         }
//       },
//       (error) => {
//         var errmess = new Error(error.message);
//         throw errmess;
//       }
//     )

//     .then((respone) => respone.json())
//     .then((products) => dispatch(addManageProducts(products)))
//     .catch((error) => dispatch(manageProductsFailed(error.message)));
// };
// export const addManageProducts = (products) => ({
//   type: ActionTypes.ADD_ADMIN_PRODUCTS,
//   payload: products,
// });
// export const manageProductsFailed = (errmess) => ({
//   type: ActionTypes.ADMIN_PRODUCTS_FAILED,
//   payload: errmess,
// });

// export const fetchManageUsers = () => (dispatch) => {
//   return fetch("admin/users")
//     .then(
//       (respone) => {
//         if (respone.ok) {
//           return respone;
//         } else {
//           var error = new Error(
//             "Error" + respone.status + " : " + respone.statusText
//           );
//           error.respone = respone;
//           throw error;
//         }
//       },
//       (error) => {
//         var errmess = new Error(error.message);
//         throw errmess;
//       }
//     )

//     .then((respone) => respone.json())
//     .then((users) => dispatch(addManageUsers(users)))
//     .catch((error) => dispatch(manageUsersFailed(error.message)));
// };
// export const addManageUsers = (users) => ({
//   type: ActionTypes.ADD_ADMIN_USERS,
//   payload: users,
// });
// export const manageUsersFailed = (errmess) => ({
//   type: ActionTypes.ADMIN_USERS_FAILED,
//   payload: errmess,
// });

// export const fetchManageEvents = () => (dispatch) => {
//   return fetch("admin/events")
//     .then(
//       (respone) => {
//         if (respone.ok) {
//           return respone;
//         } else {
//           var error = new Error(
//             "Error" + respone.status + " : " + respone.statusText
//           );
//           error.respone = respone;
//           throw error;
//         }
//       },
//       (error) => {
//         var errmess = new Error(error.message);
//         throw errmess;
//       }
//     )

//     .then((respone) => respone.json())
//     .then((events) => dispatch(addManageEvents(events)))
//     .catch((error) => dispatch(manageEventsFailed(error.message)));
// };
// export const addManageEvents = (events) => ({
//   type: ActionTypes.ADD_ADMIN_EVENTS,
//   payload: events,
// });
// export const manageEventsFailed = (errmess) => ({
//   type: ActionTypes.ADMIN_EVENTS_FAILED,
//   payload: errmess,
// });

// export const fetchManageOrders = () => (dispatch) => {
//     return fetch("admin/events")
//       .then(
//         (respone) => {
//           if (respone.ok) {
//             return respone;
//           } else {
//             var error = new Error(
//               "Error" + respone.status + " : " + respone.statusText
//             );
//             error.respone = respone;
//             throw error;
//           }
//         },
//         (error) => {
//           var errmess = new Error(error.message);
//           throw errmess;
//         }
//       )
  
//       .then((respone) => respone.json())
//       .then((orders) => dispatch(addManageOrders(orders)))
//       .catch((error) => dispatch(manageOrdersFailed(error.message)));
//   };
//   export const addManageOrders = (orders) => ({
//     type: ActionTypes.ADD_ADMIN_ORDERS,
//     payload: orders,
//   });
//   export const manageOrdersFailed = (errmess) => ({
//     type: ActionTypes.ADMIN_ORDERS_FAILED,
//     payload: errmess,
//   });
