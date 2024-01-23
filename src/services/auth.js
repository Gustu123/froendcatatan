import {post} from "./baseService"

export const login = (data) => {
    return post('login', data)
}

export const register = (data) => {
    return post('register', data)
}

export const forgotPass = (data) => {
    return post('forgot-password', data)
}
