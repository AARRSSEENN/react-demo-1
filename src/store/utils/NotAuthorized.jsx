import {Route, Redirect} from "react-router-dom";

export default function NotAuthorized(props){
        const isLogin = !!localStorage.getItem("userId")

        const {path, children} = props
        const showComponent = !isLogin ?
            (children) :
            <Redirect to="/"/>
        return(
            <Route path={path}>
                {showComponent}
            </Route>
        )
}