import { fetchProducts, fetchOrderInfo } from "./PageAactions";
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
  DecreaseQuantity
} from "./CartActions";

export const ActionCreators = {
  fetchProducts: fetchProducts,
  fetchOrderInfo: fetchOrderInfo,
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
};
