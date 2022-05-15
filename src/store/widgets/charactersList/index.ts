import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import type {CharacterId} from '~/entities/characters';
import type {CharactersListNormalizedResult} from '~/api/characters/types';

type State = {
    page: number,
    loading: boolean,
    hasNextPage: boolean,
    error: null | boolean,
    items: CharacterId[],
    total: number;
}

const initialState:State = {
    page: 1,
    loading: false,
    hasNextPage: false,
    error: null,
    items: [],
    total: 0,

};

export type FetchParams = {
    page: number;
    search?: string;
};

type FetchFulfilledPayload = FetchParams & CharactersListNormalizedResult;

export const charactersList = createSlice({
    name: 'charactersList',
    initialState,
    reducers: {
        fetch: (state, {payload}: PayloadAction<FetchParams>) => {
            state.loading = true;
            state.page = payload.page;
            state.error = null;

            if (payload.page === 1) {
                state.items = [];
            }
        },
        nextPage: (state, {payload}: PayloadAction<number>) => {
            state.page = payload;
        },
        reset: state => {
            state.page = 1;
            state.items = [];
            state.total = 0;
            state.loading = true;
        },
        fetchFulfilled: (state, {payload}: PayloadAction<FetchFulfilledPayload>) => {
            state.loading = false;
            state.hasNextPage = Boolean(payload.result.next);
            state.items = state.items.concat(payload.result.results);
            state.total = payload.result.count;
        },
        fetchFailed: state => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const {
    fetch, fetchFulfilled, fetchFailed, reset, nextPage,
} = charactersList.actions;

export default charactersList.reducer;
