import {post, get, deleteAPI} from "./baseService"

export const transaction = (data) => {
    return post('transaction', data)
}

export const alltransaction = (params) => {
    return get('transaction', params)
}

export const detailtransaction = (id) => {
    return get(`transaction/${id}`)
}

export const deleteTransaction = (id) => {
    return deleteAPI(`transaction/${id}`)
}
