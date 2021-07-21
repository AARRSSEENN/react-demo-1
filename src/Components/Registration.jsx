import {useState} from "react"
import {Link, useHistory} from "react-router-dom";
import { userValidation } from "../store/services/userValidation";
import {useDispatch, useSelector} from "react-redux";
import {registrationSuccessAction} from "../store/actions/registrationAction";

export default function Registration(){

    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isNameTrue, setIsNameTrue] = useState(true)
    const [isEmailTrue, setIsEmailTrue] = useState(true)
    const [isPasswordTrue, setIsPasswordTrue] = useState(true)
    const {loading, success, fail} = useSelector(state => state.registration)
    const dispatch = useDispatch()
    const history = useHistory()

    const addNewUser = () => {

        const user_info = {firstName, secondName, email, password}
        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, secondName, email, password})
            })
                .then(() => {
                    dispatch(registrationSuccessAction)
                    history.push("/login");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            setIsNameTrue(firstNameTrue && secondNameTrue)
            setIsEmailTrue(emailTrue)
            setIsPasswordTrue(passwordTrue)
        }
    }

        let nameError = (!isNameTrue) ?
            (
                <p>Name is incorrect</p>
            ) : null
        let emailError = (!isEmailTrue) ?
            (
                <p>Email is incorrect</p>
            ) : null
        let passwordError = (!isPasswordTrue) ?
            (
                <p>Password is incorrect</p>
            ) : null

        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        First name
                        <input
                            type="text"
                            name="first_name"
                            onChange={(e)=>setFirstName(e.target.value)}
                            placeholder="First name"
                            required/>
                    </label>

                    <label>
                        Second name
                        <input
                            type="text"
                            name="second_name"
                            onChange={(e)=>setSecondName(e.target.value)}
                            placeholder="Second name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Password"
                            required/>
                    </label>

                    <button
                        type="submit"
                        onClick={() => addNewUser}
                    >
                        Registry
                    </button>

                    {nameError}
                    {emailError}
                    {passwordError}

                    <hr/>

                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                    <button>
                        <Link to="/"> Home </Link>
                    </button>
                </form>
            </>
        )
}