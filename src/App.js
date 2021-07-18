import {Component} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoute";
import NotAuthorized from "./Components/NotAuthorized";
import UserWelcome from "./Components/UserWelcome";
import UserInfo from "./Components/UserInfo";


class App extends Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        
                        {/* access to login and registration links */}
                        <NotAuthorized exact path="/login">
                            <Login/>
                        </NotAuthorized>
                        <NotAuthorized exact path="/registration">
                            <Registration/>
                        </NotAuthorized>
                        {/*  */}

                        <PrivateRoute path="/users">
                            <Users/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/info">
                            <UserInfo/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/welcome">
                            <UserWelcome/>
                        </PrivateRoute>
                        <NotAuthorized exact path="/home">
                            <Home/>
                        </NotAuthorized>

                        {/* ???????? for path=/ */}
                        
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;