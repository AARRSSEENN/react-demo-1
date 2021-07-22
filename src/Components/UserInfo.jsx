import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, editUserInfo} from "../store/actions/userInfoAction";
import { userValidation } from "../store/services/userValidation";
import {Link, useHistory} from "react-router-dom";
import { useCallback } from "react";

export default function UserInfo(){

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {edit_loading, edit_success, edit_fail, user_info} = useSelector(state => state.user_info)
    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = JSON.parse(localStorage.getItem("userId"))


    const getUser = useCallback( (id = userId) => {
        dispatch(getUserInfo(id))
        const {firstName, secondName, email, password} = user_info
        setFirstName(firstName)
        setSecondName(secondName)
        setEmail(email)
        setPassword(password)
    }, [userId, dispatch])

    useEffect( () => {
        getUser(userId)

    }, [userId, getUser])

    useEffect( () => {
        console.log(edit_loading, edit_success, edit_fail)
        if(edit_success){
            history.push("/")
        }
        if(edit_fail){
            alert("something wrong")
        }
    }, [edit_success, edit_fail])

    const saveChanges = () => {
        const user_info = {firstName, secondName, email, password}

        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            editUserInfo(userId, user_info)
        } else {
            alert("incorrect data")
        }
    }

    let loader = edit_loading ? (<p>loading...</p>) : null

        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    {loader}
                    <label>
                        First name
                        <input
                            type="text"
                            name="first_name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            required/>
                    </label>

                    <label>
                        Second name
                        <input
                            type="text"
                            name="second_name"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            placeholder="Second name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required/>
                    </label>

                    <button
                        type="submit"
                        onClick={saveChanges}
                    >
                        Save
                    </button>

                    <button>
                        <Link to="/">Home</Link>
                    </button>

                    <hr/>
                </form>
            </>
        )
}