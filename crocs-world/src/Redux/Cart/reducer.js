import {
  ADD_CART_DATA,
  ADD_WISHLIST_DATA,
  DELETE_CART_DATA,
  DELETE_WISHLIST_DATA,
  GET_CART_DATA,
  GET_WISHLIST_DATA,
  REQUEST,
  REQUEST_FAILURE,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  cart: [],
  order: [],
  wishlist: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case ADD_CART_DATA:
      return { ...state, isLoading: false, isError: false, cart: payload };
    case GET_CART_DATA:
      return { ...state, isLoading: false, isError: false, cart: payload };
    case DELETE_CART_DATA:
      return { ...state, isLoading: false, isError: false, cart: payload };

    case ADD_WISHLIST_DATA:
      return { ...state, isLoading: false, isError: false, wishlist: payload };

    case GET_WISHLIST_DATA:
      return { ...state, isLoading: false, isError: false, wishlist: payload };

    case DELETE_WISHLIST_DATA:
      return { ...state, isLoading: false, isError: false, wishlist: payload };

    default:
      return state;
  }
};
