import {combineEpics, ofType, Epic} from 'redux-observable';
import {of} from 'rxjs';
import {
    map, filter, switchMap, distinctUntilChanged, catchError,
} from 'rxjs/operators';

import type {Dependencies} from '~/store/epics';
import {fetch, fetchFulfilled, fetchFailed} from '~/store/widgets/charactersList';
import {fetchFulfilled as fetchFulfilledCharacters} from '~/store/collections/characters';
import {getIsCharacterListShouldInitiated} from '~/store/widgets/charactersList/selectors';

const fetchInitialCharactersList: Epic = (action$, state$) => state$.pipe(
    map(getIsCharacterListShouldInitiated),
    distinctUntilChanged(),
    filter(Boolean),
    map(() => fetch({page: 1})),
);

const fetchCharactersList: Epic = (action$, state$, {api}: Dependencies) => action$.pipe(
    ofType(fetch),
    switchMap(({payload}) => api.characters.getList(payload.page).pipe(
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
    fetchCharactersList,
    fetchInitialCharactersList,
    storeCharactersCollection,
);
