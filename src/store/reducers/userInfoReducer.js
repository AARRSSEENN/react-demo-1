import {GET_USER_INFO} from "../types"

const init_state = {}

export function userInfoReducer(state = init_state, action){
    switch (action.type){
        case GET_USER_INFO :
            return action.payload
        default : return state
    }
}