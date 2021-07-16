import {Component} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoute";
import RequireAuth from "./Components/RequireAuth";


class App extends Component {

    // state = {
    //     isLogin: false,
    // }
    //
    // componentDidMount(){
    //     const isLogin = !!localStorage.getItem("userData")
    //     if(isLogin){
    //         this.setState({isLogin})
    //     }
    // }
    //
    // afterLoginRenderApp = () => {
    //     this.setState({isLogin: true})
    // }
    //
    // afterLogoutRenderApp = () => {
    //     this.setState({isLogin: false})
    // }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        {/* access to login and registration links */}
                        {/*<RequireAuth path="/login">*/}
                        <RequireAuth exact path="/login">
                            <Login/>
                        </RequireAuth>
                        {/*</RequireAuth>*/}
                        {/*<RequireAuth path="/registration">*/}
                        <RequireAuth exact path="/registration">
                            <Registration/>
                        </RequireAuth>
                        {/*</RequireAuth>*/}
                        <PrivateRoute path="/users">
                            <Users/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/home">
                            <Home/>
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;