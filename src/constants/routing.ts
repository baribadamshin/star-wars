const ROUTES = {
    home: '/',
    details: '/:id',
    bingo: '/bingo',
    emoji: '/emoji',
} as const;

export type RouteNames = keyof typeof ROUTES;

export default ROUTES;
