import {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component{

    state = {
        isLogin: false,
        userId: '',
        userName: ''
    }

    componentDidMount(){
        // data from storage if exist
        const localData = JSON.parse(localStorage.getItem("userData"))
        if(localData){
            const {userId, userName} = localData
            this.setState({isLogin: true, userId, userName})
        }
    }

    userLogout = () => {
        // user logout
        // remove data
        localStorage.removeItem("userData")
        this.setState({isLogin: !this.state.isLogin, userId: '', userName: ''})
        this.props.logoutUser()
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

export default Home;