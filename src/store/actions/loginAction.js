import { LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL, LOGIN_REQUEST } from "../types/loginTypes"

export function loginAction(email, password){
    return (dispatch) => {
        dispatch(loginRequest())
        fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(response=>response.json())
            .then(async data => {
                await new Promise(r => setTimeout(r, 2000))
                if(data.length !== 0){
                    const userId = data[0]?.id
                    localStorage.setItem("userId", JSON.stringify({userId}))
                    dispatch(loginSuccess())

                }else{
                    dispatch(loginFail())
                }
            })
            .catch(error => {
                console.log(error);
            })
    } 
}

const loginRequest =() => {
    console.log("ok")
    return {
        type : LOGIN_REQUEST
    }
}

const loginSuccess = () => {
    console.log("success")
    return {
        type : LOGIN_REQUEST_SUCCESS
    }
}

const loginFail = () => {
    console.log("fail")
    return {
        type : LOGIN_REQUEST_FAIL
    }
}