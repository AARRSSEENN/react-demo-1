import {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {getUsers} from "../store/actions/usersAction";
import {useDispatch, useSelector} from "react-redux";

export default function Users(){

    const [allUsers, setAllUsers] = useState([])
    const {loading, success, fail, users} = useSelector( state => state.users)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect( () => {
        if(success){
            setAllUsers(users)
        }
        if(fail){
            alert("something wrong")
        }
    }, [success, fail, users])

    const loader = loading ? (<p>loading...</p>) : null

    const usersTable = allUsers ? allUsers.map(param => {
        return (
            <tr key={param.id}>
                <td>{param.firstName + ' ' + param.secondName}</td>
                <td>{param.email}</td>
            </tr>
        )
    }) : null

        return(
            <>
                {loader}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable}
                    </tbody>
                </table>

                <button>
                    <Link to="/">Home</Link>
                </button>
            </>
        )
}