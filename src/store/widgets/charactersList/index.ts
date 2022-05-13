import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {CharacterId} from '~/entities/characters';
import type {CharactersListNormalizedResult} from '~/api/characters/types';

type State = {
    page: number,
    loading: boolean,
    hasNextPage: boolean,
    error: null | boolean,
    items: CharacterId[]
}

const initialState:State = {
    page: 0,
    loading: false,
    hasNextPage: false,
    error: null,
    items: [],

};

type FetchPayload = {
    page: number
};

type FetchFulfilledPayload = FetchPayload & CharactersListNormalizedResult;

export const charactersList = createSlice({
    name: 'charactersList',
    initialState,
    reducers: {
        fetch: (state, {payload}: PayloadAction<FetchPayload>) => {
            state.loading = true;
            state.page = payload.page;
            state.error = null;
        },
        fetchFulfilled: (state, {payload}: PayloadAction<FetchFulfilledPayload>) => {
            state.loading = false;
            state.hasNextPage = Boolean(payload.result.next);
            state.items = state.items.concat(payload.result.results);
        },
        fetchFailed: state => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {fetch, fetchFulfilled, fetchFailed} = charactersList.actions;

export default charactersList.reducer;
