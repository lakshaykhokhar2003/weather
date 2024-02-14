import {configureStore} from '@reduxjs/toolkit';
import {rootReducer, RootState} from "../interfaces.ts";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const {users, weather} = state;
        const currentState = {
            users: {
                currentUser: users.currentUser
            },
            weather
        };
        const serializedState = JSON.stringify(currentState);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};
const persistedState = loadState();

const store = configureStore({
    reducer: rootReducer, preloadedState: persistedState
});

store.subscribe(() => {
    saveState(store.getState());
});
export default store;
