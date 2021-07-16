import { Component } from "react";
import {Route, Redirect} from "react-router-dom";

class RequireAuth extends Component{
    render(){
        const isLogin = !!localStorage.getItem("userData")

        const {path, children} = this.props
        const showComponent = !isLogin ?
            (children) :
            <Redirect to="/home"/>
        return(
            <Route path={path}>
                {showComponent}
            </Route>
        )
    }
}

export default RequireAuth;