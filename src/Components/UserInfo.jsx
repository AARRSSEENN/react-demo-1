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
    const [files, setFiles] = useState([])
    const {get_success, get_fail, edit_loading, edit_success, edit_fail, user_info} = useSelector(state => state.user_info)
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
        const {firstName, secondName, email, password} = user_info
        setFirstName(firstName)
        setSecondName(secondName)
        setEmail(email)
        setPassword(password)
    })


    useEffect( () => {
        console.log(edit_loading, edit_success, edit_fail)
        if(edit_success){
            history.push("/")
        }
        if(edit_fail){
            alert("something wrong")
        }
    }, [edit_success, edit_fail])

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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const promises = files.map(
            (file) =>
                new Promise((res) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onloadend = async () => {
                        const blob = new Blob([reader.result]);
                        const urlCreator = window.URL || window.webkitURL;
                        file.blob_url = urlCreator.createObjectURL(blob);
                        res();
                    };
                })
        );
        Promise.all(promises).then(() => {
            setFiles(files);
        });
    }

    let loader = edit_loading ? (<p>loading...</p>) : null

    const images = files.map( file => {
        return (
            <img
                src={file.blob_url}
                key={file.blob_url}
                width="200px"
                height="200px"
                alt={file.name}
            />
        )
    })

    let previewFiles = (files.length !== 0) ? images : null


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

                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />

                    {previewFiles}

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