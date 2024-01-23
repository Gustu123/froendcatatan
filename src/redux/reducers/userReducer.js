const intialState = {
    username: ""
}

export const userReducer = (state = intialState, action) => {
    switch (action.type) {
        case "ADD_USERNAME":
            return {
                ...state,
                username: action.payload
            }

        default:
            return state
    }
}
