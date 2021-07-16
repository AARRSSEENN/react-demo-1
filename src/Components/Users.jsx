import {Component} from "react";
import {Link} from "react-router-dom"
import {getUsers} from "../store/actions/usersAction";
import {connect} from "react-redux";

class Users extends Component{

    state = {
        data : ''
    }

    componentDidMount() {
        fetch(`http://localhost:3001/users`)
            .then(response=>response.json())
            .then(data => {
                this.props.getUsers(data)
                })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        const usersTable = this.props.users ? this.props.users.map(param => {
            return (
                <tr key={param.id}>
                    <td>{param.first_name + ' ' + param.last_name}</td>
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

function mapStateToProps(state){
    return {
        users : state.users.users
    }
}

const mapDispatchToProps = {
    getUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);