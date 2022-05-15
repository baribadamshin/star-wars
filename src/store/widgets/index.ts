import {combineReducers} from '@reduxjs/toolkit';

import charactersList from './charactersList';
import characterDetails from './characterDetails';

export default combineReducers({charactersList, characterDetails});
