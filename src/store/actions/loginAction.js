import { LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL } from "../types"

export function loginSuccessAction(){
    return {
        type : LOGIN_REQUEST_SUCCESS
    }
}

export function loginFailAction(){
    return {
        type : LOGIN_REQUEST_FAIL
    }
}