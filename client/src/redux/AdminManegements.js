import * as ActionTypes from './ActionTypes';

export const manageProducts = (state ={
    isLoading: true,
    errmess: null,
    products:[]
}, action) => {
    switch(action.type){
        // case ActionTypes.PRODUCTS_LOADING:
        //     return {...state, isLoading: action.payload, errmess: null, products: []};
        case ActionTypes.ADMIN_PRODUCTS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, products: []};
        case ActionTypes.ADD_ADMIN_PRODUCTS:
            return {...state, isLoading: false, errmess: null, products: action.payload};
        // case ActionTypes.DELETE_PRODUCT:
        //     return {...state, isLoading: false, errmess: null, products: action.payload};
        default:
            return state;
    }
}

export const manageUsers = (state ={
    isLoading: true,
    errmess: null,
    users:[]
}, action) => {
    switch(action.type){
        // case ActionTypes.PRODUCTS_LOADING:
        //     return {...state, isLoading: action.payload, errmess: null, products: []};
        case ActionTypes.ADMIN_USERS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, users: []};
        case ActionTypes.ADD_ADMIN_USERS:
            return {...state, isLoading: false, errmess: null, users: action.payload};
        // case ActionTypes.DELETE_PRODUCT:
        //     return {...state, isLoading: false, errmess: null, products: action.payload};
        default:
            return state;
    }
}

export const manageEvents = (state ={
    isLoading: true,
    errmess: null,
    events:[]
}, action) => {
    switch(action.type){
        // case ActionTypes.PRODUCTS_LOADING:
        //     return {...state, isLoading: action.payload, errmess: null, products: []};
        case ActionTypes.ADMIN_EVENTS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, events: []};
        case ActionTypes.ADD_ADMIN_EVENTS:
            return {...state, isLoading: false, errmess: null, events: action.payload};
        // case ActionTypes.DELETE_PRODUCT:
        //     return {...state, isLoading: false, errmess: null, products: action.payload};
        default:
            return state;
    }
}

export const manageOrders = (state ={
    isLoading: true,
    errmess: null,
    orders:[]
}, action) => {
    switch(action.type){
        // case ActionTypes.PRODUCTS_LOADING:
        //     return {...state, isLoading: action.payload, errmess: null, products: []};
        case ActionTypes.ADMIN_ORDERS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, orders: []};
        case ActionTypes.ADD_ADMIN_ORDERS:
            return {...state, isLoading: false, errmess: null, orders: action.payload};
        // case ActionTypes.DELETE_PRODUCT:
        //     return {...state, isLoading: false, errmess: null, products: action.payload};
        default:
            return state;
    }
}

