import type {Selector} from '@reduxjs/toolkit';
import {createSelector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import {getCurrentRouteName, getQueryParams} from '~/store/widgets/router/selectors';

import type {FetchParams} from '.';

export const getCharacterListWidget = (state: State) => state.widgets.charactersList;

export const getIsCharacterListLoading = (state: State) => getCharacterListWidget(state).loading;
export const getCharacterListCurrentPage = (state: State) => getCharacterListWidget(state).page;
export const getIsCharacterListHasNextPage = (state: State) => getCharacterListWidget(state).hasNextPage;
export const getCharacterItems = (state: State) => getCharacterListWidget(state).items;

export const getIsCharacterListAbleToFetch = createSelector(
    [getCharacterListCurrentPage, getCurrentRouteName, getIsCharacterListLoading],
    (currentPage, currentRouteName, isLoading) => currentRouteName === 'home' && !isLoading,
);

export const getIsCharacterListFreshLoading = createSelector(
    [getCharacterListCurrentPage, getIsCharacterListLoading, getCharacterItems],
    (currentPage, isLoading, items) => items.length === 0 && isLoading,
);

export const getCharacterListQueryString = createSelector(
    getQueryParams,
    ({query}) => {
        if (!query || Array.isArray(query)) {
            return undefined;
        }

        return query;
    },
);

export const getCharacterListRequestParams: Selector<State, FetchParams> = createSelector(
    [getCharacterListCurrentPage, getCharacterListQueryString],
    (page, search) => ({
        page,
        search,
    }),
);
