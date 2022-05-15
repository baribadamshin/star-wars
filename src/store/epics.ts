import {combineEpics} from 'redux-observable';

import type {Api} from '~/api';

import charactersList from './widgets/charactersList/epics';
import characterDetails from './widgets/characterDetails/epics';

export default combineEpics(
    charactersList,
    characterDetails,
);

export type Dependencies = {api: Api};
