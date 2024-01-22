const intialState = {
    isloading: false,
    accesToken: ""
}

export const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return {
                ...state,
                accesToken: action.payload
            }

        case "LOGOUT":
            return {
                ...state,
                accesToken: ""
            }

        default:
            return state
    }
}