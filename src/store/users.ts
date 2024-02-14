import {createSlice} from "@reduxjs/toolkit";

import {User} from "../interfaces";

const initialState = {
    list: [] as User[],
    currentUser: {} as User | null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUsersList(state, action) {
            state.list = action.payload;
        },
        updateCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        clearUsers(state) {
            state.currentUser = null;
            state.list = [];
            localStorage.removeItem('reduxState');
        }
    }
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;