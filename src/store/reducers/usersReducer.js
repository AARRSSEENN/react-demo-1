import * as types from "../types/usersTypes"

const init_state = {
    loading : false,
    success : null,
    fail : null,
    users : []
}

export function usersReducer(state = init_state, action){
    switch (action.type){
        case types.GET_USERS :
            return {
                ...state,
                users : action.payload
            }
        case types.USERS_REQUEST:
            return {
                ...state,
                loading : true,
                success : null,
                fail : null
            }
        case types.USERS_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                fail : false
            }
        case types.USERS_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                fail : true
            }
        default : return {...state}
    }
}