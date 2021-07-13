import { Component } from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoute";
import RequireAuth from "./Components/RequireAuth";




class App extends Component{
    
    state = {
        isLogin: false,
    }

    componentDidMount(){
        const isLogin = (localStorage.getItem("userData")) ? true : false
        if(isLogin){
            this.setState({isLogin})
        }
    }
    
    afterLoginRenderApp = () => {
        this.setState({isLogin: true})
    }

    afterLogoutRenderApp = () => {
        this.setState({isLogin: false})
    }
    
    render(){
        return(
            <>
                <BrowserRouter>
                    <Switch>
                        {/* access to login and registration links */}
                        <RequireAuth
                            path="/login"
                            isLogin = {this.state.isLogin}
                        >
                            <Login loginUser = {this.afterLoginRenderApp}/>
                        </RequireAuth>
                        <RequireAuth
                            path="/registration"
                            isLogin = {this.state.isLogin}
                        >
                            <Registration />
                        </RequireAuth>
                        <PrivateRoute
                            path="/users"
                            isLogin = {this.state.isLogin}
                        >
                            <Users/>
                        </PrivateRoute>
                        <Route exact path="/">
                            <Home logoutUser = {this.afterLogoutRenderApp}/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;