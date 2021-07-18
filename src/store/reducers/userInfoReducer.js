const init_state = {
    user_info : {}
}

export function userInfoReducer(state = init_state, action){
    switch (action.type){
        case "GET_USER_INFO" :
            return {
                ...state,
                user_info : action.payload
            }
        default : return {...state}
    }
}