import {combineEpics, ofType, Epic} from 'redux-observable';
import {equals} from 'ramda';
import {of} from 'rxjs';
import {
    map, filter, switchMap, distinctUntilChanged, catchError, skip,
} from 'rxjs/operators';

import type {Dependencies} from '~/store/epics';
import type {FetchParams} from '~/store/widgets/charactersList';
import {fetchFulfilled, fetchFailed, reset} from '~/store/widgets/charactersList';
import {
    getIsCharacterListAbleToFetch,
    getCharacterListRequestParams,
    getCharacterListQueryString,
} from '~/store/widgets/charactersList/selectors';
import {save} from '~/store/collections/characters';

const fetchCharactersList: Epic = (action$, state$, {api}: Dependencies) => state$.pipe(
    filter(getIsCharacterListAbleToFetch),
    map(getCharacterListRequestParams),
    distinctUntilChanged<FetchParams>(equals),
    switchMap(params => api.characters.getList(params).pipe(
        map(result => fetchFulfilled({
            ...params,
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
    ofType(fetchFulfilled),
    map(({payload}) => save(payload.entities.characters)),
);

export default combineEpics(
    resetCharactersList,
    fetchCharactersList,
    storeCharactersCollection,
);
