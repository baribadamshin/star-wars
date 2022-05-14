import type {FunctionComponent, ChangeEvent} from 'react';
import {useCallback, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {push} from '@lagunovsky/redux-react-router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import TextField from '@mui/material/TextField';

import ROUTES from '~/constants/routing';

import css from './styles.css';

const Search: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [query$] = useState(() => new Subject<string>());
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        query$.next(event.target.value);
    }, [query$]);

    useEffect(() => {
        query$
            .pipe(debounceTime(300))
            .subscribe(query => {
                if (query.length) {
                    dispatch(push(`${ROUTES.home}?query=${query}`));
                } else {
                    dispatch(push(ROUTES.home));
                }
            });
    }, [query$, dispatch]);

    return (
        <header className={css.root}>
            <TextField
                onChange={onChange}
                className={css.search}
                type="search"
                label="Search characters by name"
                variant="standard"
            />
        </header>
    );
};

export default Search;
