import {createSelector, type Selector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import {getCurrentRouteName, getQueryParams} from '~/store/widgets/router/selectors';

import type {FetchParams} from '.';

export const getCharacterListWidget = (state: State) => state.widgets.charactersList;

export const getIsCharacterListLoading = (state: State) => getCharacterListWidget(state).loading;
export const getCharacterListCurrentPage = (state: State) => getCharacterListWidget(state).page;
export const getIsCharacterListHasNextPage = (state: State) => getCharacterListWidget(state).hasNextPage;
export const getCharacterItems = (state: State) => getCharacterListWidget(state).items;
export const getIsEmptyResult = (state: State) => getCharacterListWidget(state).total === 0;

export const getIsCharacterListAbleToFetch = createSelector(
    getCurrentRouteName,
    currentRouteName => currentRouteName === 'home',
);

export const getCharacterListQueryString = createSelector(
    getQueryParams,
    ({query}) => ((query && !Array.isArray(query)) ? query : undefined),
);

export const getCharacterListRequestParams: Selector<State, FetchParams> = createSelector(
    [getCharacterListCurrentPage, getCharacterListQueryString],
    (page, search) => ({
        page,
        search,
    }),
);
