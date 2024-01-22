import { post,get } from "./baseService"

export const wallet = (data) => {
    return post('wallet', data)
}

export const allwallet = () => {
    return get('wallet')
}

export const detailwallet = (id) => {
    return get(`wallet/${id}`)
}