const ROUTES = {
    home: '/',
    details: '/:id',
} as const;

export type RouteNames = keyof typeof ROUTES;

export default ROUTES;
