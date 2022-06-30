import {
  fetchProducts,
  fetchOrderInfo,
  fetchUserLogin,
  fetchUserLogout,
  fetchSignupAccountInfo,
  fetchConfirmBeforeResetPassword,
  changeLoginStatus,
  fetchAuthentication,
  fetchUpdateCart,
  fetchEditUserInfo,
  fetchOrderHistoryWithOrderId,
  fetchCancelOrderWithOrderId,
} from "./PageAactions";
import {
  fetchManageProducts,
  fetchManageUsers,
  fetchManageEvents,
  fetchManageOrders,
} from "./AdminActions";

import {
  AddCart,
  GetNumberCart,
  UpdateCart,
  DeleteCart,
  IncreaseQuantity,
  DecreaseQuantity,
  UpdateUserCartToPageCart,
} from "./CartActions";

export const ActionCreators = {
  fetchProducts: fetchProducts,
  fetchOrderInfo: fetchOrderInfo,
  fetchUserLogin: fetchUserLogin,
  fetchUserLogout: fetchUserLogout,
  fetchEditUserInfo: fetchEditUserInfo,
  fetchSignupAccountInfo: fetchSignupAccountInfo,
  fetchConfirmBeforeResetPassword: fetchConfirmBeforeResetPassword,
  changeLoginStatus: changeLoginStatus,
  fetchAuthentication: fetchAuthentication,
  fetchUpdateCart: fetchUpdateCart,
  fetchOrderHistoryWithOrderId: fetchOrderHistoryWithOrderId,
  fetchCancelOrderWithOrderId: fetchCancelOrderWithOrderId,
  
  // fetchManageProducts: fetchManageProducts,
  // fetchManageUsers: fetchManageUsers,
  // fetchManageEvents: fetchManageEvents,
  // fetchManageOrders: fetchManageOrders,
  AddCart: AddCart,
  GetNumberCart: GetNumberCart,
  UpdateCart: UpdateCart,
  DeleteCart: DeleteCart,
  IncreaseQuantity: IncreaseQuantity,
  DecreaseQuantity: DecreaseQuantity,
  UpdateUserCartToPageCart: UpdateUserCartToPageCart,
};
