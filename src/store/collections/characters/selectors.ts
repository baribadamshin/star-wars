import {createSelector, type ParametricSelector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import type {CharacterId, Character} from '~/entities/characters';

export const getCharactersCollection = (state: State) => state.collections.characters;

export const getCharacterById: ParametricSelector<State, CharacterId, Character> = createSelector(
    [getCharactersCollection, (state, id: CharacterId) => id],
    (characters, id) => characters[id],
);

export const makeGetCharacterById = () => getCharacterById;
