import { Form, Field, useFormik } from "formik";
import Select from 'react-select'
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../store/actions/usersAction";

export default function AddEvent(){

    const formik = useFormik({
        initialValues: {
            options: [],
            title: '',
            description: '',
            isPrivate: false,
            picked: null
        },
        onSubmit: values => {
            console.log(values)
        },
    })

    const {loading, success, fail, users} = useSelector( state => state.users)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getUsers())
    }, [])

    useEffect( () => {
        if(success){
            console.log("success")
        }
        if(fail){
            alert("something wrong")
        }
    })

    const handleSelectChange = (selectedUsers) => {
        const selectedValues = selectedUsers.map( user => user.value)
        formik.setFieldValue('options', selectedValues)
    }

    const loader = loading ? (<p>loading...</p>) : null

    const options = useMemo(() => {
        return users.map( user =>  ({
            value: user.id,
            label: user.firstName + ' ' + user.secondName
        }))
    }, [users])
    return(
         <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="input" id="title" name="title" placeholder="Title" />

                <label htmlFor="description">Description</label>
                <input type="textarea" id="description" name="description" placeholder="Description..." />

                <div id="my-radio-group">Age</div>
                <div role="group" aria-labelledby="my-radio-group">
                    <label>
                        <input type="radio" name="picked" value="0-12" />
                        0-12
                    </label>
                    <label>
                        <input type="radio" name="picked" value="13-17" />
                        13-17
                    </label>
                    <label>
                        <input type="radio" name="picked" value="18+" />
                        18+
                    </label>
                </div>

                <label>
                    Private
                    <input type="checkbox" name="isPrivate" />
                </label>

                {loader}
                <Select
                    isMulti
                    options={options}
                    onChange={ handleSelectChange }
                />

                <input type="date"/>

                <button type="submit">Submit</button>
         </form>
    )
}