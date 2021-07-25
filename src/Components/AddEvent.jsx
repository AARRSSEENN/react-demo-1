import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Select from 'react-select'
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../store/actions/usersAction";
import DateTimePicker from "react-date-picker";
import * as Yup from "yup";


export default function AddEvent(){

    const formik = useFormik({
        initialValues: {
            options: [],
            title: '',
            description: '',
            isPrivate: false,
            picked: "0-12",
            startDate: null,
            endDate: null
        },
        validationSchema: {addEventsSchema},
        onSubmit: values => {
            console.log(values)
        },
    })

    const {loading, success, fail, users} = useSelector( state => state.users)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect( () => {
        if(success){
            console.log("success")
        }
        if(fail){
            alert("something wrong")
        }
    }, [success, fail])

    const handleSelectChange = (selectedUsers) => {
        const selectedValues = selectedUsers.map( user => user.value)
        formik.setFieldValue('options', selectedValues)
    }

    const addEventsSchema = Yup.object().shape({
        title: Yup.string()
            .max(50, 'Too Long!')
            .required('Required'),
        description: Yup.string()
            .max(200, 'Too Long!')
            .required('Required'),
        options: Yup.array()
            .length(3, 'maximum 3 users')
      });

    const loader = loading ? (<p>loading...</p>) : null

    const options = useMemo(() => {
        return users.map( user =>  ({
            value: user.id,
            label: user.firstName + ' ' + user.secondName
        }))
    }, [users])

    const select = formik.values.isPrivate ?  (
        <>
            <Select
                isMulti
                options={options}
                onChange={ handleSelectChange }
            />
            <div>{formik.errors.options}</div>
        </>
    ) : null

    return(
         <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="input"
                    id="title"
                    name="title"
                    placeholder="Title"
                    onChange={formik.handleChange}
                />

                <label htmlFor="description">Description</label>
                <input
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="Description..."
                    onChange={formik.handleChange}
                />

                <div id="my-radio-group">Age</div>
                <div role="group" aria-labelledby="my-radio-group" onChange={formik.handleChange}>
                    <label>
                        <input type="radio" name="picked" value="0-12" defaultChecked/>
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
                    <input
                        type="checkbox"
                        name="isPrivate"
                        onChange={formik.handleChange}
                    />
                </label>

                {loader}

                {select}


                {/* <label>
                    Start
                    <DateTimePicker
                        name="startDate"
                        value={new Date().toLocaleString()}
                        minDate={formik.values.startDate}
                        onChange={(value) => {console.log(value)}}
                        required
                    />
                </label> */}
                {/* <label>
                    End
                    <DateTimePicker
                        name="endDate"
                        value={formik.values.endDate}
                        minDate={formik.values.endDate}
                        onChange={formik.handleChange}
                    />
                </label> */}

                <button type="submit">Submit</button>

                <button>
                    <Link to="/">Home</Link>
                </button>
         </form>
    )
}