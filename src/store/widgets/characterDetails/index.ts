import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {CharacterId} from '~/entities/characters';
import type {CharacterDetailsNormalizedResult} from '~/api/characters/types';

type State = {
    loading: boolean
}

const initialState: State = {
    loading: false,
};

type FetchPayload = {
    id: CharacterId;
}

export const characterDetails = createSlice({
    name: 'characterDetails',
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        fetch: (state, payload: PayloadAction<FetchPayload>) => {
            state.loading = true;
        },
        // eslint-disable-next-line no-unused-vars
        fetchFulfilled: (state, payload: PayloadAction<CharacterDetailsNormalizedResult>) => {
            state.loading = false;
        },
        fetchFailed: (state) => {
            state.loading = false;
        },
    },
});

export const {fetch, fetchFailed, fetchFulfilled} = characterDetails.actions;

export default characterDetails.reducer;
