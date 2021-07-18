import {GET_USER_INFO} from "../types";

export function userInfoAction(user_info){
    return {
        type : GET_USER_INFO,
        payload : user_info
    }
}