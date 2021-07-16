import {Component} from "react";
import {Link, withRouter} from "react-router-dom";

class Home extends Component{

    state = {
        userId: '',
        userName: ''
    }

    userLogout = () => {
        const {history} = this.props;
        localStorage.removeItem("userData")
        history.push('/login')
    }


    render() {

        const {isLogin, userName} = this.state

        let welcomeUser = isLogin ? (<h2>Welcome {userName}</h2>) : null

        // login and reg or logout and users buttons in home page
        let buttons = isLogin ?
            (
                <>
                    <button>
                        <Link to="users">Users List</Link>
                    </button>
                    <button onClick={this.userLogout}>
                        Logout
                    </button>
                </>
            ) :
            (
                <>
                    <button>
                        <Link to="login">Login</Link>
                    </button>
                    <button>
                        <Link to="registration">Registration</Link>
                    </button>
                </>
            )

        return(
            <>
                <h1>Home Page</h1>
                <br/>
                {welcomeUser}
                <hr/>
                {/* show login and registration buttons in home page */}
                {buttons}
            </>
        )
    }
}

export default withRouter(Home);