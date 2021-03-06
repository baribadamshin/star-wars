import {combineEpics, Epic} from 'redux-observable';
import {equals} from 'ramda';
import {of} from 'rxjs';
import {map, filter, switchMap, distinctUntilChanged, catchError, skip, debounceTime} from 'rxjs/operators';

import type {Dependencies} from '~/store/epics';
import type {FetchParams} from '~/store/widgets/charactersList';
import {fetchFulfilled, fetchFailed, reset, fetch} from '~/store/widgets/charactersList';
import {
    getIsCharacterListAbleToFetch,
    getCharacterListRequestParams,
    getCharacterListQueryString,
} from '~/store/widgets/charactersList/selectors';
import {store} from '~/store/collections/characters';

const fetchCharactersList: Epic = (action$, state$) => state$.pipe(
    filter(getIsCharacterListAbleToFetch),
    map(getCharacterListRequestParams),
    distinctUntilChanged<FetchParams>(equals),
    debounceTime(100),
    map(fetch),
);

const charactersListFetching: Epic = (action$, state$, {api}: Dependencies) => action$.pipe(
    filter(fetch.match),
    switchMap(({payload}) => api.characters.getList(payload).pipe(
        map(result => fetchFulfilled({
            ...payload,
            ...result,
        })),
        catchError(() => of(fetchFailed())),
    )),
);

const resetCharactersList: Epic = (action$, state$) => state$.pipe(
    map(getCharacterListQueryString),
    distinctUntilChanged(),
    skip(1),
    map(() => reset()),
);

const storeCharactersCollection: Epic = action$ => action$.pipe(
    filter(fetchFulfilled.match),
    filter(({payload}) => payload.result.count > 0),
    map(({payload}) => store(payload.entities.characters)),
);

export default combineEpics(
    charactersListFetching,
    resetCharactersList,
    fetchCharactersList,
    storeCharactersCollection,
);
