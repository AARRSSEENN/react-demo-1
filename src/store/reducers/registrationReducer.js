import {REGISTRATION_REQUEST_SUCCESS, REGISTRATION_REQUEST_FAIL} from "../types"

const init_state = {
    loading : true,
    success : false,
    fail : true
}

export function registrationReducer(state = init_state, action){
    switch (action.type){
        case REGISTRATION_REQUEST_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                fail : false
            }
        case REGISTRATION_REQUEST_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                fail : true
            }
        default: return state
    }
}