import { Component } from "react";
import {Route, Redirect} from "react-router-dom";

class RequireAuth extends Component{
    render(){
        const {isLogin, path, children} = this.props
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

export default RequireAuth;