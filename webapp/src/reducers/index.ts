import {combineReducers} from 'redux';

import globalModalSlice from './globalModal';
import apiRequestCompletionSlice from './apiRequest';
import websocketEventSlice from './websocketEvent';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    globalModalSlice,
    websocketEventSlice,
});

export default reducers;
