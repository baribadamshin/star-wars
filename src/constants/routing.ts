const ROUTES = {
    home: '/',
    details: '/:id',
    bingo: '/bingo',
} as const;

export type RouteNames = keyof typeof ROUTES;

export default ROUTES;
