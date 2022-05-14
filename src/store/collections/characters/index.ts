import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {CharacterCollections} from '~/entities/characters';

const initialState: CharacterCollections = {};

export const characters = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        save: (state, {payload}: PayloadAction<CharacterCollections>) => {
            Object.assign(state, payload);
        },
    },
});

export const {save} = characters.actions;

export default characters.reducer;
