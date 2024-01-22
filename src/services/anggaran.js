import { post,get } from "./baseService"

export const budget = (data) => {
    return post('budget', data)
}

export const allbudget = (params) => {
    return get('budget',params)
}