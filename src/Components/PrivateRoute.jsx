import { Component } from "react";
import {Route, Redirect} from "react-router-dom";

class PrivateRoute extends Component{
    render(){
        const {isLogin, path, children} = this.props
        const showComponent = isLogin ?
            (children) :
            <Redirect to="/login"/>
        return(
            <Route path={path}>
                {showComponent}
            </Route>
        )
    }
}

export default PrivateRoute;