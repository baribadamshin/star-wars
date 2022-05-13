import {createSelector} from '@reduxjs/toolkit';
import {matchPath} from 'react-router';

import type {State} from '~/store';
import ROUTES from '~/constants/routing';

export const getRouterWidget = (state: State) => state.router;

const getLocation = (state: State) => getRouterWidget(state).location;
const getLocationPathname = (state: State) => getLocation(state).pathname;

export const getCurrentRouteName = createSelector(
    getLocationPathname,
    pathname => Object.entries(ROUTES).reduce<string | null>((acc, [name, pattern]) => {
        if (matchPath(pattern, pathname)) {
            return name;
        }

        return acc;
    }, null),
);
