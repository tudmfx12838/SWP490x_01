import * as ActionTypes from "./ActionTypes";

export const AddCart = (product, quantity) => (dispatch) => {
  alert('product.title');
    const productInfo = {
      product: product,
      productId: product._id,
      price: product.price,
      quantity: quantity,
      total: product.price*product.AddCartquantity,
    }
    
    dispatch(addProductToCart(productInfo));
}

export const addProductToCart = (productInfo) => ({
  type: ActionTypes.ADD_PRODUCT_TO_CART,
  payload: productInfo
});
