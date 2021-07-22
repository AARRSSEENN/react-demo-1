import {LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST} from "../types/loginTypes"

const init_state = {
    loading : false,
    success : null,
    fail : null
}

export function loginReducer(state = init_state, action){
    switch (action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                loading : true,
                success : null,
                fail : null
            }
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                fail : false
            }
        case LOGIN_REQUEST_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                fail : true
            }
        default: return state
    }
}