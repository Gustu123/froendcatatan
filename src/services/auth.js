import { post } from "./baseService"

export const login = (data) => {
    return post('login', data)
}

export const register = (dataa) => {
    return post('register', dataa)
}