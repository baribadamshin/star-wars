import {combineEpics, Epic} from 'redux-observable';
import {of} from 'rxjs';
import {map, filter, distinctUntilChanged, switchMap, catchError} from 'rxjs/operators';

import type {Dependencies} from '~/store/epics';
import {getIsCharacterDidNotFetched, getCurrentCharacterId} from '~/store/widgets/characterDetails/selectors';
import {fetch, fetchFulfilled, fetchFailed} from '~/store/widgets/characterDetails';
import {store} from '~/store/collections/characters';

const fetchCharacter: Epic = (action$, state$) => state$.pipe(
    filter(getIsCharacterDidNotFetched),
    map(getCurrentCharacterId),
    distinctUntilChanged(),
    map(id => fetch({id})),
);

const characterFetching: Epic = (action$, state$, {api}: Dependencies) => action$.pipe(
    filter(fetch.match),
    switchMap(({payload}) => api.characters.getById(payload.id).pipe(
        map(result => fetchFulfilled(result)),
        catchError(() => of(fetchFailed())),
    )),
);

const storeCharacterInCollection: Epic = action$ => action$.pipe(
    filter(fetchFulfilled.match),
    map(({payload}) => store(payload.entities.characters)),
);

export default combineEpics(
    characterFetching,
    fetchCharacter,
    storeCharacterInCollection,
);
