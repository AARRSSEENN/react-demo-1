import * as types from "../types/userInfoTypes"

const init_state = {
    edit_loading : false,
    edit_success : null,
    edit_fail : null,
    user_info : []
}

export function userInfoReducer(state = init_state, action){
    switch (action.type){
        case types.GET_USER_INFO:
            return {
                ...state,
                user_info : action.payload
            }
        case types.USER_INFO_REQUEST:
            return {
                ...state,
                edit_loading : true,
                edit_success : null,
                edit_fail : null
            }
        case types.EDIT_USER_INFO_SUCCESS:
            return {
                ...state,
                edit_loading : false,
                edit_success : true,
                edit_fail : false
            }
        case types.EDIT_USER_INFO_FAIL:
            return {
                ...state,
                edit_loading : false,
                edit_success : false,
                edit_fail : true
            }
        default: return state
    }
}