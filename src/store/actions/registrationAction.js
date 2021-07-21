import {REGISTRATION_REQUEST_SUCCESS, REGISTRATION_REQUEST_FAIL} from "../types"

export function registrationSuccessAction(){
    return {
        type : REGISTRATION_REQUEST_SUCCESS
    }
}

export function registrationFailAction(){
    return {
        type : REGISTRATION_REQUEST_FAIL
    }
}