import { post,get } from "./baseService"

export const debt = (data) => {
    return post('debt', data)
}

export const alldebt = (params) => {
    return get('debt',params)
} 
export const detaildebt = (id) => {
    return get(`debt/${id}`)
}