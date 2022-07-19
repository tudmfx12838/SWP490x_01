// import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {
  manageProducts,
  manageUsers,
  manageEvents,
  manageOrders,
} from "./AdminManegements";

import { Products } from "./products";

import { Cart } from "./cart";

import { User } from "./user";

import { Auth } from "./auth";

import { Orders } from "./order";

// import { Departments } from './departments';
// import { StaffsSalary } from './staffsSalary';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      products: Products,
      cart: Cart,
      user: User,
      auth: Auth,
      orders: Orders,
      // manageProducts: manageProducts,
      // manageUsers: manageUsers,
      // manageEvents: manageEvents,
      // manageOrders: manageOrders,
      // departments: Departments,
      // staffsSalary: StaffsSalary
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
