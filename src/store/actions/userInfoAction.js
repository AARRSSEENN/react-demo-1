import * as types from "../types/userInfoTypes" 

export function getUserInfo(userId){
    return (dispatch) => {
        dispatch(userInfoRequest())
        fetch(`http://localhost:3001/users/${userId}`)
                .then(response=>response.json())
                .then(data => {
                    dispatch(getUserInfoAction(data))
                })
                .catch(error => {
                    console.log(error);
                })
    }
}

export function editUserInfo(userId, user_info){
    return (dispatch) => {
        fetch(`http://localhost:3001/users/${userId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...user_info})
            })
                .then(() => {
                    dispatch(editUserInfoSuccess())
                })
                .catch(error => {
                    dispatch(editUserInfoFail())
                    console.log(error)
                })
    }
}



const getUserInfoAction = (user_info) => {
    return {
        type : types.GET_USER_INFO,
        payload : user_info
    }
}

const userInfoRequest =() => {
    console.log("ok")
    return {
        type : types.USER_INFO_REQUEST
    }
}

const editUserInfoSuccess = () => {
    console.log("success")
    return {
        type : types.EDIT_USER_INFO_SUCCESS
    }
}

const editUserInfoFail = () => {
    console.log("fail")
    return {
        type : types.EDIT_USER_INFO_FAIL
    }
}