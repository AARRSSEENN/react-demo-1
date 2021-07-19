import { Component } from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {userInfoAction} from "../store/actions/userInfoAction";
import { userValidation } from "../store/services/userValidation";
import {Link} from "react-router-dom";

class UserInfo extends Component{

    state = {
        first_name : '',
        second_name : '',
        email : '',
        password : ''
    }

    componentDidMount(){
        const {userId} = JSON.parse(localStorage.getItem("userId"))
        fetch(`http://localhost:3001/users/${userId}`)
        .then(response=>response.json())
        .then(data => {
            this.props.userInfoAction(data)
            this.setState(data)
            })
        .catch(error => {
            console.log(error);
        })
    }

    editUserInfo(tagName, value){
        const {user_info} = this.props
        const new_user_info = {
            ...user_info,
            [tagName] : value
        }
        this.setState(new_user_info)
    }

    saveChanges = () => {
        const {id} = this.props.user_info
        const {first_name, second_name, email, password} = this.state
        const user_info = {id, first_name, second_name, email, password}

        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            fetch(`http://localhost:3001/users/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...user_info})
            })
                .then(() => {
                    this.props.history.push("/");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("incorrect data")
        }
    }

    render(){
        const {first_name, second_name, email, password} = this.state
        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        First name
                        <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="First name"
                            required/>
                    </label>

                    <label>
                        Second name
                        <input
                            type="text"
                            name="second_name"
                            value={second_name}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="Second name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="Password"
                            required/>
                    </label>

                    <button
                        type="submit"
                        onClick={this.saveChanges}
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
}

const mapStateToProps = (state) => {
    return {user_info : state.user_info.user_info}
}

const mapDispatchToProps = {
    userInfoAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfo));