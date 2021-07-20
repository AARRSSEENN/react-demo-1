import {useState} from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {Link, useHistory} from "react-router-dom"
import { requestSuccessAction, requestFailAction } from "../store/actions/loginAction"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading, success, fail} = useSelector(state => state.login)
    const dispatch = useDispatch()
    const history = useHistory()

    const loginHandler = (email, password) => {
        fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(response=>response.json())
            .then(data => {
                if(data.length !== 0){
                    dispatch(() => requestSuccessAction())
                    const userId = data[0]?.id
                    localStorage.setItem("userId", JSON.stringify({userId}))
                    history.push('/')
                }else{
                    dispatch(() => requestFailAction())
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    console.log(loading, success, fail)

    let load = loading ? (<p>loading...</p>) : null

        return(
            <>
            {load}
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Email
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username" required/>
                    </label>

                    <label>
                        Password
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    </label>

                    <button onClick={loginHandler(email, password)}>Log in</button>

                    <hr/>

                    <button>
                        <Link to="registration">Please Sign up</Link>
                    </button>
                    <button>
                        <Link to="/">Home</Link>
                    </button>
                </form>
            </>
        )
}