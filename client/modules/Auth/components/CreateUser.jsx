import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllUsers, createUser, deleteUser } from '../AuthActions';
import ReactTable from 'react-table';
import clientConfig from '../../../config';

// Import Style
import styles from './login.css';


class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            designation: '',
            password: '',
            owner: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        this.props.getAllUsers();
    }

    deleteUser(email) {
        this.props.deleteUser(email)
    }

    handleNavigationPage() {
        browserHistory.push('/menu');
    }

    handleCreateEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleCreateName(e) {
        this.setState({ name: e.target.value });
    }

    handleCreateDesignation(e) {
        this.setState({ designation: e.target.value });
    }

    handleCreatePhoneNumber(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    handleCreatePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleCreateOwner(e) {
        this.setState({ owner: e.target.value });
    }

    renderUsers() {
        if (this.props.allUsers) {
            if (this.props.allUsers.length > 0) {
                if (!clientConfig.userColumns.find(o => o.id == 'delete')) {
                    clientConfig.userColumns.unshift({
                        Header: '',
                        id: 'delete',
                        accessor: 'email',
                        Cell: ({ value }) => (<button onClick={this.deleteUser.bind(this, value)}>Delete</button>)
                    });
                }
                return <div>
                    <h1>Users</h1>
                    <ReactTable filterable data={this.props.allUsers} columns={clientConfig.userColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    createUser(e) {
        e.preventDefault();
        if (this.state.email != '' && this.state.name != '' && this.state.role != '' && this.state.password != '') {
            let user = {
                email: this.state.email,
                name: this.state.name,
                role: this.state.designation,
                password: this.state.password,
                owner: this.state.owner,
                phoneNumber: this.state.phoneNumber
            }
            this.props.createUser(user);
            this.setState({
                email: '',
                name: '',
                designation: '',
                password: '',
                owner: '',
                phoneNumber: ''
            })
        }
        else {
            alert('Fill in all the details')
        }
    }

    render() {
        return (<section className={styles.createUser}>
            <button className={styles.back} onClick={this.handleNavigationPage.bind(this)}><i className={styles.backicon + " fa fa-chevron-left"} aria-hidden="true"></i>Back</button>
            <h1>Create User</h1>
            <form onSubmit={this.createUser.bind(this)}>
                <div>
                    <h4>Email: </h4>
                    <input type="email" value={this.state.email} onChange={this.handleCreateEmail.bind(this)} />
                </div>
                <div>
                    <h4>Name: </h4>
                    <input type="text" value={this.state.name} onChange={this.handleCreateName.bind(this)} />
                </div>
                <div>
                    <h4> Role </h4>
                    <select value={this.state.designation} onChange={this.handleCreateDesignation.bind(this)}>
                        <option value="superuser">Super User</option>
                        <option value="admin">Admin</option>
                        <option value="designer">Designer</option>
                        <option value="viewer">Viewer</option>
                        <option value="delivery">Delivery</option>
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>
                        <option value="logistics">Logistics</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="qa-executive">QA Executive</option>
                        <option value="qa-manager">QA Manager</option>
                    </select>
                </div>
                <div>
                    <h4>Password: </h4>
                    <input type="password" value={this.state.password} onChange={this.handleCreatePassword.bind(this)} />
                </div>
                {this.state.designation == 'designer' ? <div>
                    <h4>Owner: </h4>
                    <input type="text" value={this.state.owner} onChange={this.handleCreateOwner.bind(this)} />
                </div> : null}
                {this.state.designation == 'delivery' ? <div>
                    <h4>Phone Number: </h4>
                    <input type="text" value={this.state.phoneNumber} onChange={this.handleCreatePhoneNumber.bind(this)} />
                </div> : null}
                <br />
                <button type="submit" className={styles.submitBtn} onClick={this.createUser.bind(this)}>Create User</button>
            </form>
            <br />
            {this.renderUsers()}
        </section>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllUsers,
        createUser,
        deleteUser
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        allUsers: state.allUsers ? state.allUsers : null
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateUser);
