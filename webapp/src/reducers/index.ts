import {combineReducers} from 'redux';

import apiRequestEventSlice from './apiRequestEvent';
import mySlice from './testReducer';

const reducers = combineReducers({
    test: apiRequestEventSlice,
    mySlice,
});

export default reducers;
