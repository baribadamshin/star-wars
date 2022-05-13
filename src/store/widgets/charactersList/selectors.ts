import {createSelector} from '@reduxjs/toolkit';

import type {State} from '~/store';
import {getCurrentRouteName} from '~/store/widgets/router/selectors';

export const getCharacterListWidget = (state: State) => state.widgets.charactersList;

export const getIsCharacterListLoading = (state: State) => getCharacterListWidget(state).loading;
export const getCharacterListCurrentPage = (state: State) => getCharacterListWidget(state).page;
export const getIsCharacterListHasNextPage = (state: State) => getCharacterListWidget(state).hasNextPage;
export const getCharacterItems = (state: State) => getCharacterListWidget(state).items;

export const getIsCharacterListShouldInitiated = createSelector(
    [getCharacterListCurrentPage, getCurrentRouteName, getIsCharacterListLoading],
    (currentPage, currentRouteName, isLoading) => currentRouteName === 'home' && currentPage === 0 && !isLoading,
);

export const getIsCharacterListFreshLoading = createSelector(
    [getCharacterListCurrentPage, getIsCharacterListLoading, getCharacterItems],
    (currentPage, isLoading, items) => items.length === 0 && isLoading,
);
