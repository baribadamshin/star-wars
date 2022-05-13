import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {CharacterCollections} from '~/entities/characters';

const initialState: CharacterCollections = {};

export const characters = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        fetchFulfilled: (state, {payload}: PayloadAction<CharacterCollections>) => {
            Object.assign(state, payload);
        },
    },
});

export const {fetchFulfilled} = characters.actions;

export default characters.reducer;
