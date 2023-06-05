import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILURE,
  USER_REQUEST_SUCCESS,
} from "./actionTypes";

var userDetails=JSON.parse(localStorage.getItem("UserResponseData"))


const initialState = {
  isLoading: false,
  isAuth: userDetails?.token? true: false,
  users: [],
  token: userDetails?.token? true: false,
  isError: false,
  isRegisterSuccess: false,
  userID: userDetails?.userID || null,
  name: userDetails?.name || null,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REQUEST:
      return { ...state, isLoading: true };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        userID: payload.userID,
        name: payload.name,
      };
    case USER_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: false,
        isError: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterSuccess: true,
        users: [...state.users, payload],
      };
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: false,
        isError: false,
      };
    default:
      return state;
  }
};
