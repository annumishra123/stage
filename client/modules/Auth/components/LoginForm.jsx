import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './login.css';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        const { email, password } = this.refs;
        this.props.handleLogin(email.value, password.value);
        email.value = password.value = '';
    }

    render() {
        return (
            <form onSubmit={this.handleLogin} className={styles.loginForm}>
                <h2>Login</h2>
                <br />
                <input placeholder="Email address" type="email" className="form-field" ref="email" />
                <br />
                <br />
                <input placeholder="Password" type="password" className="form-field" ref="password" />
                <br />
                <br />
                <button className="post-submit-button" type="submit" onClick={this.handleLogin}>Submit</button>
            </form>
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