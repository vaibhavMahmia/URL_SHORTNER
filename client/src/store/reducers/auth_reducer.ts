import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, logIn, logINDataType, logOut, signUP, signUPDataType } from "../../api";


export const signupThunkAction = createAsyncThunk(
    'uriShortner/signup',
    async (formdata: signUPDataType, { rejectWithValue }) => {
        try {
            await signUP(formdata); // Ensure signUP returns a promise
            const { data } = await getProfile();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error); // Handle error appropriately
        }
    }
);

export const loginThunkAction = createAsyncThunk(
    'uriShortner/login',
    async (formData: logINDataType, { rejectWithValue }) => {
        try {
            await logIn(formData);
            const { data } = await getProfile();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error);
        }
    }
);

export const logoutThunkAction = createAsyncThunk(
    'uriShortner/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await logOut();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error);
        }
    }
);

export const getProfileThunkAction = createAsyncThunk(
    'uriShortner/profile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getProfile();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error);
        }
    }
);