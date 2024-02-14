import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FormData} from "../interfaces.ts";


const initialState: FormData = {
    data: {
        email: '',
        password: ''
    },
    error: {
        email: false,
        password: false
    }
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateForm(state, action: PayloadAction<{ name: string, value: string }>) {
            state.data = {
                ...state.data,
                [action.payload.name]: action.payload.value
            };
        },
        updateError(state, action) {
            state.error = {
                ...state.error,
                ...action.payload
            };
        }
    }
});
export const formActions = formSlice.actions;
export default formSlice.reducer;
