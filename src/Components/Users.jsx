import {Component} from "react";
import {Link} from "react-router-dom"

class Users extends Component{

    state = {
        data : ''
    }

    componentDidMount() {
        fetch(`http://localhost:3001/users`)
            .then(response=>response.json())
            .then(data => {
                this.setState({data})
                })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const usersTable = this.state.data ? this.state.data.map(param => {
            return (
                <tr key={param.id}>
                    <td>{param.name}</td>
                    <td>{param.email}</td>
                </tr>
            )
        }) : null

        return(
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersTable}
                    </tbody>
                </table>

                <button>
                    <Link to="/">Home</Link>
                </button>
            </>
        )
    }
}

export default Users;