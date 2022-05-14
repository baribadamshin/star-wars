import {createSelector} from '@reduxjs/toolkit';
import {matchPath} from 'react-router';
import queryString from 'query-string';

import type {State} from '~/store';
import ROUTES from '~/constants/routing';

export const getRouterWidget = (state: State) => state.router;

const getLocation = (state: State) => getRouterWidget(state).location;
const getLocationPathname = (state: State) => getLocation(state).pathname;
const getLocationSearch = (state: State) => getLocation(state).search;

export const getCurrentRouteName = createSelector(
    getLocationPathname,
    pathname => Object.entries(ROUTES).reduce<string | null>((acc, [name, pattern]) => {
        if (matchPath(pattern, pathname)) {
            return name;
        }

        return acc;
    }, null),
);

export const getQueryParams = createSelector(
    getLocationSearch,
    queryString.parse,
);
