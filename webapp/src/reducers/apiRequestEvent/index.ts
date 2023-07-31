import {createSlice} from '@reduxjs/toolkit';

const initialState: ApiRequestPendingState = {
    pending: false,
};

export const apiRequestEventSlice = createSlice({
    name: 'apiRequestEventSlice',
    initialState,
    reducers: {
        togglePendingState: (state: ApiRequestPendingState) => {
            console.log('dsfdf d ', state.pending);
            state.pending = !state.pending;
            console.log('dsfdf d ', state.pending);
        },
    },
});

export const {togglePendingState} = apiRequestEventSlice.actions;

export default apiRequestEventSlice.reducer;
