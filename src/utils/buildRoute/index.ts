import queryString from 'query-string';
import {generatePath, type Params} from 'react-router';
import {pickBy} from 'ramda';

import ROUTES, {type RouteNames} from '~/constants/routing';

export default (routeName: RouteNames, params?: Params, query?: Params) => {
    let routePath = generatePath(ROUTES[routeName], params);
    const search = query ? queryString.stringify(pickBy(Boolean, query)) : undefined;

    if (search) {
        routePath += `?${search}`;
    }

    return routePath;
};
