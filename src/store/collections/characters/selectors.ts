import {createSelector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import type {CharacterId} from '~/entities/characters';

const getCharactersCollection = (state: State) => state.collections.characters;

export const makeGetCharactersById = (id: CharacterId) => createSelector(
    getCharactersCollection,
    characters => characters[id],
);
