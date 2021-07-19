import { Component } from "react";
import {Route, Redirect} from "react-router-dom";

class NotAuthorized extends Component{
    render(){
        const isLogin = !!localStorage.getItem("userId")

        const {path, children} = this.props
        const showComponent = !isLogin ?
            (children) :
            <Redirect to="/"/>
        return(
            <Route path={path}>
                {showComponent}
            </Route>
        )
    }
}

export default NotAuthorized;