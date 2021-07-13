import {Component} from "react"
import {Link} from "react-router-dom"
import { withRouter } from "react-router"

class Login extends Component{

    state = {
        email : "",
        password : ""
    }

    loginHandler = () => {
        fetch(`http://localhost:3001/users?email=${this.state.email}&password=${this.state.password}`)
            .then(response=>response.json())
            .then(data => {
                if(data.length !== 0){
                    const userId = data[0]?.id
                    const userName = data[0]?.name
                    localStorage.setItem("userData", JSON.stringify({userId, userName}))
                    this.props.history.push('/')
                    this.props.loginUser()
                }else{
                    throw new Error("data is empty")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Email
                        <input type="email" onChange={(e) => {this.setState({email: e.target.value})}} placeholder="Username" required/>
                    </label>

                    <label>
                        Password
                        <input type="password" onChange={(e) => {this.setState({password: e.target.value})}} placeholder="Password" required/>
                    </label>

                    <button onClick={this.loginHandler}>Log in</button>

                    <hr/>

                    <button>
                        <Link to="registration">Please Sign up</Link>
                    </button>
                    <button>
                        <Link to="/">__Home__</Link>
                    </button>
                </form>
            </>
        )
    }
}

export default withRouter(Login);