import { post,get } from "./baseService"

export const updatepassword = (data) => {
    return post('update-password', data)
}