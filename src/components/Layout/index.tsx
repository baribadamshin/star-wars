import type {FunctionComponent} from 'react';

import './reset.css';
import './global.css';
import css from './styles.css';

const Layout: FunctionComponent = ({children}) => (
    <div className={css.root}>
        {children}
    </div>
);

export default Layout;
