import {combineEpics} from 'redux-observable';

import type {Api} from '~/api';

import charactersList from './widgets/charactersList/epics';

export default combineEpics(charactersList);

export type Dependencies = {api: Api};
