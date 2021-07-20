import {Route, Redirect} from "react-router-dom";

export default function PrivateRoute(props){
        const isLogin = !!localStorage.getItem("userId")

        const {path, children} = props
        const showComponent = isLogin ?
            (children) :
            <Redirect to="/login"/>
        return(
            <Route path={path}>
                {showComponent}
            </Route>
        )
}