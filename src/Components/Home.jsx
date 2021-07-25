import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {getUserInfo} from "../store/actions/userInfoAction";


export default function Home(){

    const [isLogedin, setIsLogedin] = useState(false)
    const [userName, setUserName] = useState("")
    const {get_success, get_fail, user_info} = useSelector(state => state.user_info)
    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = JSON.parse(localStorage.getItem("userId"))


    const getUser = useCallback( (id = userId) => {
        dispatch(getUserInfo(id))
    }, [userId, dispatch])

    useEffect( () => {
        getUser(userId)

    }, [userId, getUser])

    useEffect( () => {
        if(get_success){
            setIsLogedin(true)
        }
        if(get_fail){
            console.log("something wrong")
        }
        const {firstName, secondName} = user_info
        setUserName(firstName + " " + secondName)
    }, [get_success, get_fail, user_info])

    const userLogout = () => {
        localStorage.removeItem("userId")
        setIsLogedin(false)
        history.push('/login')
    }

        let welcomeUser = isLogedin ? (<h2>Welcome <p>{userName}</p></h2>) : null

        return(
            <>
                {welcomeUser}
                <hr/>
                <button>
                    <Link to="/users">Users List</Link>
                </button>
                <button>
                    <Link to="/info">User Profile</Link>
                </button>
                <button>
                    <Link to="/event">Add Event</Link>
                </button>
                <button onClick={userLogout}>
                    Logout
                </button>
            </>
        )
}