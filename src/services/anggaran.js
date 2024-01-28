import {post, get, deleteAPI} from "./baseService"

export const budget = (data) => {
    return post('budget', data)
}
export const allbudget = (params) => {
    return get('budget', params)
}
export const detailbudget = (id) => {
    return get(`budget/${id}`)
}

export const deleteBudget = (id) => {
    return deleteAPI(`budget/${id}`)
}
