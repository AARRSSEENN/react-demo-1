import {Component} from "react"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import { userValidation } from "../store/services/userValidation";

class Registration extends Component{

    state = {
        first_name : "",
        second_name : "",
        email : "",
        password : "",
        isNameTrue: true,
        isEmailTrue : true,
        isPasswordTrue : true
    }

    addNewUser = () => {
        const {first_name, second_name, email, password} = this.state;

        const user_info = {first_name, second_name, email, password}
        const {firstNameTrue, secondNameTrue, emailTrue, passwordTrue} = userValidation(user_info)

        if(firstNameTrue && secondNameTrue && emailTrue && passwordTrue){
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({first_name, second_name, email, password})
            })
                .then(() => {
                    this.props.history.push("/login");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({
                isNameTrue : firstNameTrue && secondNameTrue,
                isEmailTrue : emailTrue,
                isPasswordTrue : passwordTrue
            })
        }
    }

    handleChange(event){
        const targetName = event.target.name
        const value = event.target.value
        this.setState({[targetName] : value})
    }


    render(){

        let nameError = (!this.state.isNameTrue) ?
            (
                <p>Name is incorrect</p>
            ) : null
        let emailError = (!this.state.isEmailTrue) ?
            (
                <p>Email is incorrect</p>
            ) : null
        let passwordError = (!this.state.isPasswordTrue) ?
            (
                <p>Password is incorrect</p>
            ) : null

        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        First name
                        <input
                            type="text"
                            name="first_name"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="First name"
                            required/>
                    </label>

                    <label>
                        Second name
                        <input
                            type="text"
                            name="second_name"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="Second name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="Password"
                            required/>
                    </label>

                    <button
                        type="submit"
                        onClick={this.addNewUser}
                    >
                        Registry
                    </button>

                    {nameError}
                    {emailError}
                    {passwordError}

                    <hr/>

                    <button>
                        <Link to="login">Login</Link>
                    </button>
                    <button>
                        <Link to="/"> Home </Link>
                    </button>
                </form>
            </>
        )
    }
}

export default withRouter(Registration);