import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  PRODUCT_REQUEST,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  totalCount: 0,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_REQUEST:
      return { ...state, isLoading: true };
    case GET_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, isError: false, products: payload.data ,totalCount:Number(payload.headers["x-total-count"])};
    case PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
