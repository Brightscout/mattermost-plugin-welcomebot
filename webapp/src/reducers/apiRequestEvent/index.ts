import {createSlice} from '@reduxjs/toolkit';

const initialState: ApiRequestPendingState = {
    pending: true,
};

// const initialState = usePluginApi().pluginState.test;

export const apiRequestEventSlice = createSlice({
    name: 'apiRequestEventSlice',
    initialState,
    reducers: {
        togglePendingState: (state) => {
            // console.log('heyeye 1 ', state.pending);
            // state.pending = !state.pending;
            // console.log('heyeye 2 ', state.pending);

            return {
                ...state,
                pending: !state.pending,
            };
        },
    },
});

export const {togglePendingState} = apiRequestEventSlice.actions;

export default apiRequestEventSlice.reducer;
