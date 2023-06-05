import axios from "axios"


export const getProductsFromApi=async(filterValue)=>{
    try {
        let res= await axios.get("https://crocs-api.onrender.com/products",filterValue)
        return res
    } catch (err) {
        console.log(err);
    }
}



export const getSingleProducts=async(id)=>{
    try {
        let res= await axios.get(`https://crocs-api.onrender.com/products/${id}`)
        return res.data
    } catch (err) {
        console.log(err);
    }
}