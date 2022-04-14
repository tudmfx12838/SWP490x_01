import { fetchProducts } from "./PageAactions";
import { fetchManageProducts, fetchManageUsers,fetchManageEvents, fetchManageOrders } from "./AdminActions";

export const ActionCreators = {
  fetchProducts: fetchProducts,
  fetchManageProducts: fetchManageProducts,
  fetchManageUsers: fetchManageUsers,
  fetchManageEvents: fetchManageEvents,
  fetchManageOrders: fetchManageOrders
}