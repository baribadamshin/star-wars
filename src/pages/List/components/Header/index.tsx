import type {FunctionComponent} from 'react';
import TextField from '@mui/material/TextField';

import css from './styles.css';

const Header: FunctionComponent = () => (
    <header className={css.root}>
        <TextField className={css.search} type="search" label="Search characters by name" variant="standard" />
    </header>
);

export default Header;
