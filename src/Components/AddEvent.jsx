import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Select from 'react-select'
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../store/actions/usersAction";
import DateTimePicker from "react-date-picker";
import * as Yup from "yup";


export default function AddEvent(){

    const addEventsSchema = Yup.object().shape({
        title: Yup.string()
            .max(50, 'Too Long!')
            .required('Required'),
        description: Yup.string()
            .max(200, 'Too Long!')
            .required('Required'),
        options: Yup.array()
            .max(3, 'maximum 3 users')
    });

    const formik = useFormik({
        initialValues: {
            options: [],
            title: '',
            description: '',
            isPrivate: false,
            picked: "0-12",
            startDate: new Date(),
            endDate: new Date(),
            files: []
        },
        validationSchema: addEventsSchema,
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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        const allowedFileTypes = ["image/png", "image/jpeg"]
        for (let file in files){
            const fileType = file.type
            const fileSize = file.size
            if (allowedFileTypes.includes(fileType) && fileSize <  20000000) {
                console.log("all right")
            }
        }

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
            formik.setFieldValue("files", files);
        });
    }

    const images = formik.values.files.map( file => {
        console.log(file)
        return (
            <img
                src={file.blob_url}
                key={file.name}
                width="200px"
                height="200px"
                alt={file.name}
            />
        )
    })

    const previewFiles = (formik.values.files.length !== 0) ? images : null

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


            <label>
                Start
                <DateTimePicker
                    name="startDate"
                    value={formik.values.startDate}
                    // selected={formik.values.startDate}
                    minDate={new Date()}
                    onChange={(value) => formik.setFieldValue("startDate", value)}
                    required
                />
            </label>
            <label>
                Start
                <DateTimePicker
                    name="endDate"
                    value={formik.values.endDate}
                    minDate={formik.values.startDate}
                    onChange={(value) => formik.setFieldValue("endDate", value)}
                    required
                />
            </label>

            <input
                type="file"
                multiple
                onChange={handleFileChange}
            />

            {previewFiles}

            <button type="submit">Submit</button>

            <button>
                <Link to="/">Home</Link>
            </button>
        </form>
    )
}