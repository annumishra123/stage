import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './login.css';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        const {email, password} = this.refs;
        this.props.handleLogin(email.value, password.value);
        email.value = password.value = '';
    }

    render() {
        return (
            <div className={ styles.loginForm }>
              <h2>Login</h2>
              <br/>
              <input placeholder="Email address" type="email" className="form-field" ref="email" />
              <br/>
              <br/>
              <input placeholder="Password" type="password" className="form-field" ref="password" />
              <br/>
              <br/>
              <a className="post-submit-button" href="#" onClick={ this.handleLogin }>Submit</a>
            </div>
        )
    }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object
};

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default LoginForm;