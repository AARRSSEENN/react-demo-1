import {REQUEST_FAIL, REQUEST_SUCCESS} from "../types"

const init_state = {
    loading : true,
    success : false,
    fail : true
}

export function loginReducer(state = init_state, action){
    switch (action.type){
        case REQUEST_SUCCESS:
            return {
                ...state,
                loading : false,
                success : true,
                fail : false
            }
        case REQUEST_FAIL:
            return {
                ...state,
                loading : false,
                success : false,
                fail : true
            }
        default: return state
    }
}