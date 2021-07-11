import { Component } from "react"
import Login from "./Components/Login";
import Registration from "./Components/Registration";
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

    logoutFunctionality(){
        // remove data
        localStorage.removeItem("userData")
        this.setState({isLogedIn: !this.state.isLogedIn, userId: '', userName: ''})
    }
    
    currentUserData(email, password){
        fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(response=>response.json())
            .then(data => {

                // bad solution data.length !== 0
                if(data.length !== 0){
                    const userId = data[0]?.id
                    const userName = data[0]?.name
                    localStorage.setItem("userData", JSON.stringify({userId, userName}))
                    this.setState({isLogedIn: true, userId, userName})
                }else{
                    throw new Error("data is empty")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    render(){

        let welcomeUser = this.state.isLogedIn ? 
            (
                <h2>Welcome {this.state.userName}</h2>
            ) : null

        // login and reg or logout buttons in home page
        let buttons = this.state.isLogedIn ? 
            (
                <>
                    <button onClick={() => this.logoutFunctionality()}>
                        Logout
                    </button>
                </>
            ) : 
            (
                <>
                    <button>
                        <Link to="login">Login</Link>
                    </button>
                    <button>
                        <Link to="registration">Registration</Link>
                    </button>
                </>
            )

        let login = !this.state.isLogedIn ? 
            (
                <Route path="/login">
                    <Login getCurrentUserData = {(email, password) => this.currentUserData(email, password)}/>
                </Route>
            ) : null

        let registration = !this.state.isLogedIn ? 
            (
                <Route path="/registration">
                    <Registration />
                </Route>
            ) : null

        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        {/* access to login and registration links */}
                        {login}
                        {registration}
                        <Route exact path="/">
                            <h1>Home Page</h1>
                            <br/>
                            {welcomeUser}
                            <hr/>
                            {/* show login and registration buttons in home page */}
                            {buttons}
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;