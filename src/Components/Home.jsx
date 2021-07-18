import {Component} from "react";
import {Link} from "react-router-dom";

class Home extends Component{

    render() {
        return(
            <>
                <h1>Home Page</h1>
                <hr/>
                <button>
                    <Link to="login">Login</Link>
                </button>
                <button>
                    <Link to="registration">Registration</Link>
                </button>
            </>
        )
    }
}

export default Home;