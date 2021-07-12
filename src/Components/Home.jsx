import {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component{


    render() {

        console.log(this.props)

        let welcomeUser = this.props.isLogedIn ?
            (
                <h2>Welcome {this.props.userName}</h2>
            ) : null

        // login and reg or logout buttons in home page
        let buttons = this.props.isLogedIn ?
            (
                <>
                    <button onClick={() => this.props.userLogout()}>
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