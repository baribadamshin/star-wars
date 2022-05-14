import {combineEpics, ofType, Epic} from 'redux-observable';
import {of} from 'rxjs';
import {
    map, filter, switchMap, distinctUntilChanged, catchError, skip,
} from 'rxjs/operators';

import type {Dependencies} from '~/store/epics';
import {
    fetch, fetchFulfilled, fetchFailed, reset,
} from '~/store/widgets/charactersList';
import {
    getIsCharacterListAbleToFetch,
    getCharacterListRequestParams,
    getCharacterListQueryString,
} from '~/store/widgets/charactersList/selectors';
import {fetchFulfilled as fetchFulfilledCharacters} from '~/store/collections/characters';

const fetchCharactersList: Epic = (action$, state$) => state$.pipe(
    filter(getIsCharacterListAbleToFetch),
    map(getCharacterListRequestParams),
    distinctUntilChanged(),
    map(fetch),
);

const resetCharactersList: Epic = (action$, state$) => state$.pipe(
    map(getCharacterListQueryString),
    distinctUntilChanged(),
    skip(1),
    map(() => reset()),
);

const charactersListFetching: Epic = (action$, state$, {api}: Dependencies) => action$.pipe(
    ofType(fetch),
    switchMap(({payload}) => api.characters.getList(payload).pipe(
        map(result => fetchFulfilled({
            ...payload,
            ...result,
        })),
        catchError(() => of(fetchFailed())),
    )),
);

const storeCharactersCollection: Epic = action$ => action$.pipe(
    ofType(fetchFulfilled),
    map(({payload}) => fetchFulfilledCharacters(payload.entities.characters)),
);

export default combineEpics(
    resetCharactersList,
    charactersListFetching,
    fetchCharactersList,
    storeCharactersCollection,
);
