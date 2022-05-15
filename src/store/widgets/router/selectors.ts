import {createSelector, type Selector} from '@reduxjs/toolkit';
import {matchPath, Params} from 'react-router';
import queryString from 'query-string';

import type {State} from '~/store';
import ROUTES, {type RouteNames} from '~/constants/routing';

export const getRouterWidget = (state: State) => state.router;

const getLocation = (state: State) => getRouterWidget(state).location;
const getLocationPathname = (state: State) => getLocation(state).pathname;
const getLocationSearch = (state: State) => getLocation(state).search;

export const getCurrentRouteName: Selector<State, RouteNames | null> = createSelector(
    getLocationPathname,
    pathname => Object.entries(ROUTES).reduce<RouteNames | null>((acc, [name, pattern]) => {
        if (matchPath(pattern, pathname)) {
            return name as RouteNames;
        }

        return acc;
    }, null),
);

export const getQueryParams = createSelector(
    getLocationSearch,
    queryString.parse,
);

const EMPTY_PARAMS = {};

export const getRouteParams: Selector<State, Params> = createSelector(
    [getCurrentRouteName, getLocationPathname],
    (name, pathname) => {
        if (name) {
            const target = matchPath(ROUTES[name], pathname);

            if (target) {
                return target.params;
            }
        }

        return EMPTY_PARAMS;
    },
);
