import {Component} from "react"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

class Registration extends Component{

    state = {
        first_name : "",
        last_name : "",
        email : "",
        password : "",
        isNameTrue: true,
        isEmailTrue : true,
        isPasswordTrue : true
    }

    addNewUser = () => {
        const {first_name, last_name, email, password} = this.state;

        const regName = /^[a-zA-Z]*$/
        const firstNameTrue = regName.test(String(first_name).toLowerCase())
        const lastNameTrue = regName.test(String(last_name).toLowerCase())

        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const emailTrue = regEmail.test(String(email).toLowerCase())

        const passwordTrue = (password.length >= 6 && password.length <= 10)

        if(firstNameTrue && lastNameTrue && emailTrue && passwordTrue){
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({first_name, last_name, email, password})
            })
                .then(() => {
                    this.props.history.push("/login");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({

                isNameTrue : firstNameTrue && lastNameTrue,
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
                        Last name
                        <input
                            type="text"
                            name="last_name"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="Last name"
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
                        <Link to="/"> __Home__ </Link>
                    </button>
                </form>
            </>
        )
    }
}

export default withRouter(Registration);