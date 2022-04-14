// import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { manageProducts, manageUsers, manageEvents, manageOrders } from './AdminManegements';

import { Products } from './products';

// import { Departments } from './departments';
// import { StaffsSalary } from './staffsSalary';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            products: Products,
            manageProducts: manageProducts,
            manageUsers: manageUsers,
            manageEvents: manageEvents,
            manageOrders: manageOrders
            // departments: Departments,
            // staffsSalary: StaffsSalary
        }),
        applyMiddleware(thunk, logger)
    )
    return store;
}