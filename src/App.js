import { Component } from "react"
import Nested from "./Nested"

class App extends Component{
    
    state = {
        value: ""
    }
    
    render(){
        return(
            <div>
                <Nested
                    inputValue = {this.state.value}
                />
                <input
                    type = "text"
                    onChange = {(event) => this.setState({value: event.target.value})}
                    placeholder = {this.state.value}
                />
            </div>
        )
    }
}

export default App;