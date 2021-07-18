import {GET_USERS} from "../types";

export function usersAction(users){
    return {
        type : GET_USERS,
        payload : users
    }
}