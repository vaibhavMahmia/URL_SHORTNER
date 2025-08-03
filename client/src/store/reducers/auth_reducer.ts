import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, logIn, logOut, signUP } from "../../api";
import { login_payload_datatype, LogoutResponse, ProfileResponse, signup_payload_datatype } from "../../Types/types";
import axios from "axios";


export const signupThunkAction = createAsyncThunk<ProfileResponse, signup_payload_datatype, { rejectValue: string }>(
    'uriShortner/signup',
    async (formdata, { rejectWithValue }) => {
        try {
            await signUP(formdata);
            const { data } = await getProfile();
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.error || "Signup error");
            }
            return rejectWithValue("Unknown error");
        }
    }
);

export const loginThunkAction = createAsyncThunk<ProfileResponse, login_payload_datatype, { rejectValue: string }>(
    'uriShortner/login',
    async (formData, { rejectWithValue }) => {
        try {
            await logIn(formData);
            const { data } = await getProfile();
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.error || "Login error");
            }
            return rejectWithValue("Unknown error");
        }
    }
);

export const logoutThunkAction = createAsyncThunk<LogoutResponse, void, { rejectValue: string }>(
    'uriShortner/logout',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await logOut();
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.error || "Logout error");
            }
            return rejectWithValue("Unknown error");
        }
    }
);

export const getProfileThunkAction = createAsyncThunk<ProfileResponse, void, { rejectValue: string }>(
    'uriShortner/profile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getProfile();
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.error || "Fetch profile error");
            }
            return rejectWithValue("Unknown error");
        }
    }
);