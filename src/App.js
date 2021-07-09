import { Component } from "react"
// import Nested from "./Components/Nested"
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";


class App extends Component{
    
    state = {
        value: ""
    }
    
    render(){
        // console.log(this.props);
        return(
            <div>
                {/*<Nested*/}
                {/*    inputValue = {this.state.value}*/}
                {/*/>*/}
                {/*<input*/}
                {/*    type = "text"*/}
                {/*    onChange = {(event) => this.setState({value: event.target.value})}*/}
                {/*    placeholder = {this.state.value}*/}
                {/*/>*/}

                <BrowserRouter>
                    <Switch>
                        <Route path="/Login">
                            <Login />
                        </Route>
                        <Route path="/Registration">
                            <Registration />
                        </Route>
                        <Route exact path="/">
                            <button>
                                <Link to="login">Login</Link>
                            </button>
                            <button>
                                <Link to="registration">Registration</Link>
                            </button>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;