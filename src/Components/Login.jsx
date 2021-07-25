import {useState, useEffect} from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {Link, useHistory} from "react-router-dom"
import { loginAction } from "../store/actions/loginAction"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loading, success, fail} = useSelector(state => state.login)
    const dispatch = useDispatch()
    const history = useHistory()

    const loginHandler = (email, password) => {
        dispatch(loginAction(email, password))
    }


    // temporary solution
    useEffect( () => {
        dispatch({"type" : "LOGIN_REQUEST"})
    }, [dispatch])



    useEffect( () => {
        if(success){
            history.push("/")
        }
        if(fail){
            alert("something wrong")
        }
    }, [success, fail, history])

    let loader = loading ? (<p>loading...</p>) : null

        return(
            <>
            {loader}
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Email
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username" required/>
                    </label>

                    <label>
                        Password
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    </label>

                    <button onClick={() => loginHandler(email, password)}>Log in</button>

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