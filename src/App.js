import { Component } from "react"
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Users from "./Components/Users";
import Home from "./Components/Home";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";




class App extends Component{
    
    state = {
        isLogedIn: false,
        userId: '',
        userName: ''
    }

    componentDidMount(){
        // data from storage if exist
        const localData = JSON.parse(localStorage.getItem("userData"))
        if(localData){
            const {userId, userName} = localData
            this.setState({isLogedIn: true, userId, userName})
        }
    }

    logoutFunctionality = () => {
        // remove data
        localStorage.removeItem("userData")
        this.setState({isLogedIn: !this.state.isLogedIn, userId: '', userName: ''})
    }
    
    setData(userId, userName){
        this.setState({isLogedIn: true, userId, userName})
    }
    
    render(){

        let login = !this.state.isLogedIn ? 
            (
                <Route path="/login">
                    <Login setUserData = {(userId, userName) => this.setData(userId, userName)}/>
                </Route>
            ) : null

        let registration = !this.state.isLogedIn ? 
            (
                <Route path="/registration">
                    <Registration />
                </Route>
            ) : null

        return(
            <>
                <BrowserRouter>
                    <Switch>
                        {/* access to login and registration links */}
                        {login}
                        {registration}
                        <Route path="/users">
                            <Users/>
                        </Route>
                        <Route exact path="/">
                            <Home
                                isLogedIn = {this.state.isLogedIn}
                                userId = {this.state.userId}
                                userName = {this.state.userName}
                                userLogout = {this.logoutFunctionality}
                            />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;