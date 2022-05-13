import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';
import {createRouterMiddleware, createRouterReducer} from '@lagunovsky/redux-react-router';
import {createBrowserHistory} from 'history';

import api from '~/api';

import collections from './collections';
import widgets from './widgets';
import epics from './epics';

export const browserHistory = createBrowserHistory();

const reducer = combineReducers({
    collections,
    widgets,
    router: createRouterReducer(browserHistory),
});

const routerMiddleware = createRouterMiddleware(browserHistory);
const epicMiddleware = createEpicMiddleware({
    dependencies: {api},
});

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(epicMiddleware, routerMiddleware),
});

epicMiddleware.run(epics);

export type AppDispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>

export default store;
