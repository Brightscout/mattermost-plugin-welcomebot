import {createSlice} from '@reduxjs/toolkit';

const initialState: ViewConfigModalState = {
    isVisible: false,
};

export const viewConfigModalSlice = createSlice({
    name: 'viewConfigModalSlice',
    initialState,
    reducers: {
        showViewConfigModalState: (state: ViewConfigModalState) => {
            state.isVisible = true;
        },
        hideViewConfigModalState: (state: ViewConfigModalState) => {
            state.isVisible = false;
        },
    },
});

export const {showViewConfigModalState, hideViewConfigModalState} = viewConfigModalSlice.actions;

export default viewConfigModalSlice.reducer;
