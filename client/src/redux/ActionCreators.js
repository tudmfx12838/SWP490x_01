import { fetchProducts } from "./PageAactions";
import { callMe, fetchManageProducts, fetchManageUsers,fetchManageEvents, fetchManageOrders } from "./AdminActions";

import { AddCart } from "./CartActions";

export const ActionCreators = {
  fetchProducts: fetchProducts,
  fetchManageProducts: fetchManageProducts,
  fetchManageUsers: fetchManageUsers,
  fetchManageEvents: fetchManageEvents,
  fetchManageOrders: fetchManageOrders,
  AddCart: AddCart,
  callMe: callMe
}