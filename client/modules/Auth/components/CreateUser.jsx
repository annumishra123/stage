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
            onwer: ''
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
                    <ReactTable data={this.props.allUsers} columns={clientConfig.userColumns} className="-striped -highlight" />
                </div>
            }
        }
    }

    createUser() {
        e.preventDefault();
        if (this.state.email != '' && this.state.name != '' && this.state.role != '' && this.state.password != '' && this.state.owner != '') {
            let user = {
                email: this.state.email,
                name: this.state.name,
                role: this.state.designation,
                password: this.state.password,
                owner: this.state.owner
            }
            this.props.createUser(user);
        }
        else {
            alert('Fill in all the details')
        }
    }

    render() {
        return (<section className={styles.createUser}>
            <button className={styles.back} onClick={this.handleNavigationPage.bind(this)}><i className={styles.backicon + " fa fa-chevron-left"} aria-hidden="true"></i>Back</button>
            <h1>Create User</h1>
            <form>
                <div>
                    <h4>Email: </h4>
                    <input type="email" onChange={this.handleCreateEmail.bind(this)} />
                </div>
                <div>
                    <h4>Name: </h4>
                    <input type="text" onChange={this.handleCreateName.bind(this)} />
                </div>
                <div>
                    <h4> Role </h4>
                    <select defaultValue={this.state.designation} onChange={this.handleCreateDesignation.bind(this)}>
                        <option value="superuser">SuperUser</option>
                        <option value="admin">Admin</option>
                        <option value="designer">Designer</option>
                        <option value="viewer">Marketing</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>
                <div>
                    <h4>Password: </h4>
                    <input type="password" onChange={this.handleCreatePassword.bind(this)} />
                </div>
                <div>
                    <h4>Owner: </h4>
                    <input type="text" onChange={this.handleCreateOwner.bind(this)} />
                </div>
                <br />
                <button className={styles.submitBtn} onClick={this.createUser.bind(this)}>Create User</button>
            </form>
            <br/>
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
