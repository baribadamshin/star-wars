import {generatePath, type Params} from 'react-router';

import ROUTES, {type RouteNames} from '~/constants/routing';

export default (routeName: RouteNames, params?: Params) => generatePath(ROUTES[routeName], params);
