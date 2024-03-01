import React from 'react';
import {hot} from 'react-hot-loader/root';
import {ReduxRouter} from '@lagunovsky/redux-react-router';
import {Routes, Route} from 'react-router-dom';

import store, {browserHistory} from '~/store';
import {getRouterWidget} from '~/store/widgets/router/selectors';
import Layout from '~/components/Layout';
import ROUTES from '~/constants/routing';
import List from '~/pages/List';
import Detail from '~/pages/Details';
import Bingo from '~/pages/Bingo';
import Emoji from '~/pages/Emoji';

function App() {
    return (
        <Layout>
            <ReduxRouter routerSelector={getRouterWidget} store={store} history={browserHistory} enableTimeTravelling>
                <Routes>
                    <Route path={ROUTES.home} element={<List />} />
                    <Route path={ROUTES.details} element={<Detail />} />
                    <Route path={ROUTES.bingo} element={<Bingo />} />
                    <Route path={ROUTES.emoji} element={<Emoji />} />
                </Routes>
            </ReduxRouter>
        </Layout>
    );
}

export default hot(App);
