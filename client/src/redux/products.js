import * as ActionTypes from './ActionTypes';

export const Products = (state ={
    isLoading: true,
    errmess: null,
    products:[]
}, action) => {
    switch(action.type){
        // case ActionTypes.PRODUCTS_LOADING:
        //     return {...state, isLoading: action.payload, errmess: null, products: []};
        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, products: []};
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errmess: null, products: action.payload};
        // case ActionTypes.DELETE_PRODUCT:
        //     return {...state, isLoading: false, errmess: null, products: action.payload};
        default:
            return state;
    }
}
