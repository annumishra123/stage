import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createUser } from '../AuthActions';


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

    createUser() {
        let user = {
            email: this.state.email,
            name: this.state.name,
            role: this.state.designation,
            password: this.state.password,
            owner: this.state.owner
        }
        this.props.createUser(user);
    }

    render() {
        return (<label>
            <button onClick={this.handleNavigationPage.bind(this)}>Back</button>
            <form>
                <label>
                    <h4>Email: </h4>
                    <input type="text" onChange={this.handleCreateEmail.bind(this)} />
                </label>
                <label>
                    <h4>Name: </h4>
                    <input type="text" onChange={this.handleCreateName.bind(this)} />
                </label>
                <label>
                    <h4>Role: </h4>
                    <input type="text" onChange={this.handleCreateDesignation.bind(this)} />
                </label>
                <label>
                    <h4>Password: </h4>
                    <input type="text" onChange={this.handleCreatePassword.bind(this)} />
                </label>
                <label>
                    <h4>Owner: </h4>
                    <input type="text" onChange={this.handleCreateOwner.bind(this)} />
                </label>
                <br />
                <button onClick={this.createUser.bind(this)}>Create User</button>
            </form>
        </label>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        createUser
    }, dispatch);
}

function mapStateToProps(state) {
    return {};
}


export default connect(mapStateToProps, matchDispatchToProps)(CreateUser);
