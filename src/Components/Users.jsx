import {Component} from "react";

class Users extends Component{

    state = {
        data : []
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
                <tr>
                    <td>{param.name}</td>
                    <td>{param.email}</td>
                </tr>
            )
        }) : null

        return(
            <>
                <table>
                    <th>
                        <td>Name</td>
                        <td>Email</td>
                    </th>
                    {usersTable}
                </table>
            </>
        )
    }
}

export default Users;