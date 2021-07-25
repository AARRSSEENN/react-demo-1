import {BrowserRouter, Switch} from "react-router-dom";

import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import PrivateRoute from "./store/utils/PrivateRoute";
import NotAuthorized from "./store/utils/NotAuthorized";
import Home from "./Components/Home";
import UserInfo from "./Components/UserInfo";
import AddEvent from "./Components/AddEvent";


export default function App(){

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
                        <PrivateRoute exact path="/event">
                            <AddEvent/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/">
                            <Home/>
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>
            </>
        )
}