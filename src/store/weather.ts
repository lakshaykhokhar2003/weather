import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    city: {},
    currentWeather: {},
    hourlyWeather: [],
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateCity(state, action) {
            state.city = action.payload;
        }, updateWeather(state, action) {
            state.currentWeather = action.payload;
        },
        updateHourlyWeather(state, action) {
            state.hourlyWeather = action.payload;
        },clearWeather(state) {
            state.city = {};
            state.currentWeather = {};
            state.hourlyWeather = [];
        }
    }
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
