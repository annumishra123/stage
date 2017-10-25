import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../Auth/AuthActions';
import LoginForm from '../../Auth/components/LoginForm';



class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(email, password) {
    const creds = {
      email,
      password
    };
    this.props.dispatch(Actions.loginUser(creds));
  }

  render() {
    return (
      <div className="container">
        <LoginForm handleLogin={ this.handleLogin } />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  };
}

Dashboard.contextTypes = {
  router: React.PropTypes.object,
};

Dashboard.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Dashboard);