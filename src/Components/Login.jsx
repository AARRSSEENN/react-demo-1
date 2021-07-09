import {Component} from "react"
import {Link} from "react-router-dom"
import { withRouter } from "react-router"

class Login extends Component{

    state = {
        email : "",
        password : ""
    }

    getCurrentUserData(email, password){
        fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(response=>response.json())
            .then(data => {
                if(data){
                    localStorage.setItem("id", data[0].id)
                    this.props.history.push('/')
                    // const id = localStorage.getItem("id");
                }
            })
            .catch(error => {
                console.log(error);
            })

        console.log(email, '---', password);
    }

    render(){
        return(
            <>
                <label>
                    Email
                    <input type="email" onChange={(e) => {this.setState({email: e.target.value})}} placeholder="Username" required/>
                </label>

                <label>
                    Password
                    <input type="password" onChange={(e) => {this.setState({password: e.target.value})}} placeholder="Password" required/>
                </label>

                <button onClick={()=>this.getCurrentUserData(this.state.email, this.state.password)}>Log in</button>

                <hr/>

                <button>
                    <Link to="registration">Please Sign up</Link>
                </button>
                <button>
                    <Link to="/">__Home__</Link>
                </button>
            </>
        )
    }
}

export default withRouter(Login);