import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>
      {lang}
    </li>
  );
  const logout = function () {
    props.logoutUser();
  }
  const style = {
    position: 'absolute',
    right: '40px',
    top: '40px'
  }

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}><Link to="/menu" ><img src="https://res.cloudinary.com/stage3/image/upload/f_auto,q_auto:low/stage3-dashboard-white.png" alt="Stage3 Dashboard" /></Link></h1>
        {props.isAuthenticated ? <button className={styles.logOut} style={style} onClick={logout}><img src="https://res.cloudinary.com/stage3/image/upload/f_auto,q_auto:low/logout-icon.png" />Logout</button> : null}
      </div>
      <p className={styles.nameStrip}>hi, {props.user}!</p>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

Header = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.name
  })
)(Header);

export default Header;
