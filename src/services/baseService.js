import BaseClient from "./baseApi"
import { getErrorMessage } from "./errorHandler"

export const post = async (route, body, option) => {
    try{
        const response = await BaseClient.post(route, body)
        return response.data.data
    } catch (err) {
        getErrorMessage(err)
    }
}

export const get = async (route, body) => {
    try {
        const response = await BaseClient.get(route, {params: body})
        return response.data.data
    }catch (err) {
        getErrorMessage(err)
    }
}

export const deleteAPI = async (route) =>{
    try {
        const response = await BaseClient.delete(route)
        return response.data
    } catch (err){
        getErrorMessage(err)
    }
}
