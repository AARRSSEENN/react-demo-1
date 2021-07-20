import { REQUEST_SUCCESS, REQUEST_FAIL } from "../types"

export function requestSuccessAction(){
    return {
        type : REQUEST_SUCCESS
    }
}

export function requestFailAction(){
    return {
        type : REQUEST_FAIL
    }
}