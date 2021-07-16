const init_state = {
    users : []
}

export function usersReducer(state = init_state, action){
    switch (action.type){
        case "GET_USERS" :
            return {
                ...state,
                users : action.payload
            }
        default : return {...state}
    }
}