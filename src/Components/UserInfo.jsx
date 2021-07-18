import { Component } from "react";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import {userInfoAction} from "../store/actions/userInfoAction";
import { userValidation } from "../store/services/userValidation";

class UserInfo extends Component{

    componentDidMount(){
        const {userId} = JSON.parse(localStorage.getItem("userId"))
        fetch(`http://localhost:3001/users/${userId}`)
        .then(response=>response.json())
        .then(data => {
            this.props.userInfoAction(data)
            })
        .catch(error => {
            console.log(error);
        })
    }

    editUserInfo(tagname, value){
        const {user_info} = this.props
        const new_user_info = {
            ...user_info,
            [tagname] : value
        }
        this.props.userInfoAction(new_user_info)
    }

    saveChanges = () => {
        const {user_info} = this.props

        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            fetch(`http://localhost:3001/users/${user_info.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...user_info})
            })
                .then(() => {
                    this.props.history.push("/welcome");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("incorrect data")
        }
    }

    render(){
        const {user_info} = this.props
        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        First name
                        <input
                            type="text"
                            name="first_name"
                            value={user_info["first_name"]}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="First name"
                            required/>
                    </label>

                    <label>
                        Second name
                        <input
                            type="text"
                            name="second_name"
                            value={user_info["second_name"]}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="Second name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={user_info["email"]}
                            onChange={(e) => this.editUserInfo(e.target.name, e.target.value)}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={user_info["password"]}
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