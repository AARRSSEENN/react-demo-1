import {Component} from "react";
import {Link} from "react-router-dom"
import {usersAction} from "../store/actions/usersAction";
import {connect} from "react-redux";

class Users extends Component{

    componentDidMount() {
        fetch(`http://localhost:3001/users`)
            .then(response=>response.json())
            .then(data => {
                this.props.usersAction(data)
                })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const {users} = this.props

        const usersTable = users ? users.map(param => {
            return (
                <tr key={param.id}>
                    <td>{param.first_name + ' ' + param.second_name}</td>
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
                    <Link to="/welcome">Home</Link>
                </button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : state.users.users
    }
}

const mapDispatchToProps = {
    usersAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);