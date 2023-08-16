import {createSlice} from '@reduxjs/toolkit';

interface MyState {
    count: boolean;
}

const initialState: MyState = {
    count: false,
};

export const mySlice = createSlice({
    name: 'mySlice',
    initialState,
    reducers: {
        increment: (state) => {
            state.count = !state.count;
        },
    },
});

export const {increment} = mySlice.actions;
export default mySlice.reducer;
