export const addToken = (token) => {
    return{
        type: "ADD_TOKEN",
        payload: token
    }
}

export const actionLogout = (token) => {
    return{
        type: "LOGOUT"
    }
}