import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUP, signUPDataType } from "../../api";

export const signupThunkAction = createAsyncThunk(
    'uriShortner/signup',
    async (formdata: signUPDataType, { rejectWithValue }) => {
        try {
            const { data } = await signUP(formdata); // Ensure signUP returns a promise
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle error appropriately
        }
    }
);
