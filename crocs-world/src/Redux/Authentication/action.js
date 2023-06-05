import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_REGISTER_SUCCESS, USER_REQUEST, USER_REQUEST_FAILURE, USER_REQUEST_SUCCESS } from "./actionTypes"
import { getAllUsersData, registerUser } from "./api"

export const loading=()=>{
    return {type:USER_REQUEST}
}

export const failure=()=>{
    return {type:USER_REQUEST_FAILURE}
}

export const registerSuccess=(payload)=>{
    return {type:USER_REGISTER_SUCCESS,payload}
}


export const UsersDataSuccess=(payload)=>{
    return {type:USER_REQUEST_SUCCESS,payload}
}

export const loginSuccess=(payload)=>{
    return {type:USER_LOGIN_SUCCESS,payload}
}
export const logoutSuccess=()=>{
    return {type:USER_LOGOUT_SUCCESS}
}

// Adding new User
export const addingUserToDB=(userDetails)=> async(dispatch)=>{
    dispatch(loading())
    try {
        const data= await registerUser(userDetails)
        dispatch(registerSuccess(data))
        console.log(data);
        return data
    } catch (err) {
        dispatch(failure())
        return err
    }
}

// Logout
export const userLogout=()=> (dispatch)=>{
    dispatch(logoutSuccess())
}

// Getting All Users
export const gettingUsersData=()=> async(dispatch)=>{
    dispatch(loading())
    try {
        const data=await getAllUsersData()
        dispatch(UsersDataSuccess(data))
    } catch (err) {
        dispatch(failure())
    }
}