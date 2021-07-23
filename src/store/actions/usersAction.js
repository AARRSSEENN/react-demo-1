import * as types from "../types/usersTypes"

export function getUsers(){
    return (dispatch) => {
        dispatch(usersRequest())
        fetch(`http://localhost:3001/users`)
            .then(response=>response.json())
            .then(data => {
                dispatch(usersAction(data))
                dispatch(usersSuccess())
            })
            .catch(error => {
                dispatch(usersFail())
                console.log(error);
            })
    }
}

const usersAction = (users) => {
    return {
        type : types.GET_USERS,
        payload : users
    }
}

const usersRequest =() => {
    console.log("ok")
    return {
        type : types.USERS_REQUEST
    }
}

const usersSuccess = () => {
    console.log("success")
    return {
        type : types.USERS_SUCCESS
    }
}

const usersFail = () => {
    console.log("fail")
    return {
        type : types.USERS_FAIL
    }
}