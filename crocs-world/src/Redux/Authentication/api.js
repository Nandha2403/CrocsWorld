import axios from "axios"

// Making post request to register the New user
export const registerUser=async(userDetails)=>{
    try {
        const res= await axios.post("https://crocs-api.onrender.com/users",userDetails)
        return res.data
    } catch (err) {
        return err
    }
}

// Getting the all users Data to Check whether the user with same Email id presented or not 
export const getAllUsersData= async()=>{
    try {
        const res = await axios.get("https://crocs-api.onrender.com/users")
        return res.data
    } catch (err) {
        return err
    }
}