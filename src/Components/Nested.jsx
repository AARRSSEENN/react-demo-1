import { Component } from "react"

class Nested extends Component{
    
    render(){
        return(
            <div>
                <p>{this.props.inputValue}</p>
            </div>
        )
    }
}

export default Nested;