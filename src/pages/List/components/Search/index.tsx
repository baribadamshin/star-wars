import {useCallback, useState, useEffect, type FunctionComponent, type ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {push} from '@lagunovsky/redux-react-router';
import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import TextField from '@mui/material/TextField';

import buildRoute from '~/utils/buildRoute';

import css from './styles.css';

const Search: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [query$] = useState(() => new BehaviorSubject<string>(''));
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        query$.next(event.target.value);
    }, [query$]);

    useEffect(() => {
        query$
            .pipe(debounceTime(400))
            .subscribe(query => {
                dispatch(push(buildRoute('home', {}, {query})));
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
