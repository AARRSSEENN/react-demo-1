import {Component} from "react"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

class Registration extends Component{

    state = {
        name : "",
        email : "",
        password : "",
        isNameTrue: true,
        isEmailTrue : true,
        isPasswordTrue : true
    }

    addNewUser = () => {
        const {name, email, password} = this.state;

        const regName = /^[a-zA-Z]*$/
        const nameTrue = regName.test(String(name).toLowerCase())

        const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const emailTrue = regEmail.test(String(email).toLowerCase())

        const passwordTrue = (password.length >= 6 && password.length <= 10)

        if(nameTrue && emailTrue && passwordTrue){
            fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            })
                .then(() => {
                    this.props.history.push("/login");
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({
                isNameTrue : nameTrue,
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
                        Name
                        <input
                            type="text"
                            name="name"
                            onChange={(e)=>this.handleChange(e)}
                            placeholder="Name"
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