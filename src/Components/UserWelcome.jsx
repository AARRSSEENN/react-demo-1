import { Component } from "react";
import {Link, withRouter} from "react-router-dom";

class UserWelcome extends Component{

    state = {
        isLogin : false,
        userName : ''
    }

    componentDidMount(){
        const {userId} = JSON.parse(localStorage.getItem("userId"))
        fetch(`http://localhost:3001/users/${userId}`)
        .then(response=>response.json())
        .then(data => {
            const userName = data.first_name + ' ' + data.second_name
            this.setState({isLogin : true, userName})
            })
        .catch(error => {
            console.log(error);
        })
    }

    userLogout = () => {
        localStorage.removeItem("userId")
        this.props.history.push('/login')
    }

    render(){

        const {isLogin, userName} = this.state

        let welcomeUser = isLogin ? (<h2>Welcome <p>{userName}</p></h2>) : null

        return(
            <>
                {welcomeUser}
                <hr/>
                <button>
                    <Link to="/users">Users List</Link>
                </button>
                <button>
                    <Link to="/info">User Profile</Link>
                </button>
                <button onClick={this.userLogout}>
                    Logout
                </button>
            </>
        )
    }
}

export default withRouter(UserWelcome);