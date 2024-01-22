import { post,get } from "./baseService"

export const alldashboard = (params) => {
    return get('transaction/dashboard',params)
}