import {createSelector, type Selector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import type {CharacterId} from '~/entities/characters';
import {getRouteParams, getCurrentRouteName} from '~/store/widgets/router/selectors';
import {getCharactersCollection} from '~/store/collections/characters/selectors';

export const getIsCharacterLoading = (state: State) => state.widgets.characterDetails.loading;

export const getCurrentCharacterId: Selector<State, CharacterId> = createSelector(
    getRouteParams,
    ({id}) => id || '',
);

export const getIsCharacterDidNotFetched = createSelector(
    [getCurrentRouteName, getCurrentCharacterId, getCharactersCollection],
    (routeName, id, collections) => routeName === 'details' && (!id || !collections[id]),
);
