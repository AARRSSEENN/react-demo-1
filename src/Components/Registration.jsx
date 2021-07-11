import {Component} from "react"
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

class Registration extends Component{

    state = {
        name : "",
        email : "",
        password : ""
    }

    createUser(name, email, password){
        const user = {
            "name" : name,
            "email" : email,
            "password" : password
        }
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(() => {
                this.props.history.push("/login");
            })
            .catch(error => {
                console.log(error)
            })
    }


    render(){
        return(
            <>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Name
                        <input
                            type="text"
                            onChange={(e)=>this.setState({name : e.target.value})}
                            placeholder="Name"
                            required/>
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            onChange={(e)=>this.setState({email : e.target.value})}
                            placeholder="Please enter your email"
                            required/>
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            onChange={(e)=>this.setState({password : e.target.value})}
                            placeholder="Password"
                            required/>
                    </label>

                    <button
                        type="submit"
                        onClick={()=>this.createUser(this.state.name, this.state.email, this.state.password)}
                    >
                        Registry
                    </button>

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