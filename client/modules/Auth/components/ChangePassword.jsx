import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePassword } from '../AuthActions';


class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: ''
        }
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    changePassword() {
        if (this.state.password && (this.state.password == this.state.confirmPassword)) {
            this.props.changePassword(this.state.confirmPassword);
        } else {
            alert("Passwords don't match");
            this.setState({
                password: '',
                confirmPassword: ''
            });
        }
    }

    render() {
        return <section>
                 <label>New Password</label>
                 <input type="password" value={ this.state.password } onChange={ this.handleChangePassword.bind(this) } />
                 <br/>
                 <label>Confirm Password</label>
                 <input type="password" value={ this.state.confirmPassword } onChange={ this.handleChangeConfirmPassword.bind(this) } />
                 <br/>
                 <br/>
                 <button onClick={ this.changePassword.bind(this) }>Save</button>
               </section>;
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        changePassword
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        owner: state.auth.owner,
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(ChangePassword);
