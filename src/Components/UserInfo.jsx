import {Component, useEffect, useState} from "react";
import { withRouter } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {userInfoAction} from "../store/actions/userInfoAction";
import { userValidation } from "../store/services/userValidation";
import {Link, useHistory} from "react-router-dom";

export default function UserInfo(){

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loading, success, fail} = useSelector(state => state.user_info)
    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = JSON.parse(localStorage.getItem("userId"))

    useEffect(() => {
            fetch(`http://localhost:3001/users/${userId}`)
                .then(response=>response.json())
                .then(data => {
                    this.props.userInfoAction(data)
                    this.setState(data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])

    const saveChanges = () => {
        const user_info = {firstName, secondName, email, password}

        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            fetch(`http://localhost:3001/users/${userId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...user_info})
            })
                .then(() => {
                    history.push("/");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("incorrect data")
        }
    }

        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
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

const mapStateToProps = (state) => {
    return {user_info : state.user_info.user_info}
}

const mapDispatchToProps = {
    userInfoAction
}