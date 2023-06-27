import {combineReducers} from 'redux';

import {examplePluginApi} from 'services';

import globalModalSlice from './globalModal';
import apiRequestCompletionSlice from './apiRequest';
import websocketEventSlice from './websocketEvent';
import viewConfigModalSlice from './viewConfigModal';

const reducers = combineReducers({
    apiRequestCompletionSlice,
    globalModalSlice,
    websocketEventSlice,
    viewConfigModalSlice,
    [examplePluginApi.reducerPath]: examplePluginApi.reducer,
});

export default reducers;
