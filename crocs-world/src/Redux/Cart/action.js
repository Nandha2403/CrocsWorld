import { ADD_CART_DATA, ADD_WISHLIST_DATA, DELETE_CART_DATA, DELETE_WISHLIST_DATA, GET_CART_DATA, GET_WISHLIST_DATA } from "./actionTypes";

export const addCartData = (payload) => {
  return {
    type: ADD_CART_DATA,
    payload,
  };
};

export const getCartData = (payload) => {
  return {
    type: GET_CART_DATA,
    payload,
  };
};

export const deleteCartData = (payload) => {
  return {
    type: DELETE_CART_DATA,
    payload,
  };
};

export const addWishlistData = (payload) => {
  return {
    type: ADD_WISHLIST_DATA,
    payload,
  };
};

export const getWishlistData = (payload) => {
  return {
    type: GET_WISHLIST_DATA,
    payload,
  };
};

export const deleteWishlistData = (payload) => {
  return {
    type: DELETE_WISHLIST_DATA,
    payload,
  };
};
