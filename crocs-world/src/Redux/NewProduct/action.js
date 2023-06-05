import { GET_PRODUCT_SUCCESS, PRODUCT_ERROR, PRODUCT_REQUEST } from "./actionTypes"
import { getProductsFromApi } from "./api"

export const productRequest=()=>{
    return {type:PRODUCT_REQUEST}
}

export const productError=()=>{
    return {type:PRODUCT_ERROR}
}

export const getProductSuccess=(payload)=>{
    return {type:GET_PRODUCT_SUCCESS,payload}
}


export const getProducts=(filterValue)=> async(dispatch)=>{
    dispatch(productRequest())
    try {
        const data=await getProductsFromApi(filterValue)
        if(data){
            dispatch(getProductSuccess(data))
        }
    } catch (err) {
        dispatch(productError())
    }
}