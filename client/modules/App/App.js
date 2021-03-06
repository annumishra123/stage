import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { checkToken } from '../Auth/AuthActions';
// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import { logoutUser } from '../Auth/AuthActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    }); // eslint-disable-line
    this.props.dispatch(checkToken());
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  logoutUser() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <div>
        { this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools /> }
        <div>
          <Helmet title="Stage3" titleTemplate="%s - Dashboard" meta={ [{ charset: 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }] } />
          <Header logoutUser={ this.logoutUser.bind(this) } switchLanguage={ lang => this.props.dispatch(switchLanguage(lang)) } intl={ this.props.intl } toggleAddPost={ this.toggleAddPostSection } />
          <div className={ styles.container }>
            { this.props.children }
          </div>
          <Footer />
        </div>
      </div>
      );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(App);
