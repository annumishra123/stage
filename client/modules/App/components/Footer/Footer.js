import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div className={ styles.footer }>
      <p>© 2017 · Stage3</p>
    </div>
    );
}

export default Footer;
