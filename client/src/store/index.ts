import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getProfileThunkAction, loginThunkAction, logoutThunkAction, signupThunkAction } from "./reducers/auth_reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { InitialStateType } from "./reducers/reducer.types";

const initialState: InitialStateType = {
    loading: false,
    error: null,
    user: null,
    links: []
};

const URIShortnerSlice = createSlice({
    name: 'uriShortner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(signupThunkAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(signupThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Signup failed';
            })
            .addCase(loginThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunkAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(loginThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(logoutThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutThunkAction.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.links = [];
            })
            .addCase(logoutThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
            })
            .addCase(getProfileThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfileThunkAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.links = action.payload.links;
            })
            .addCase(getProfileThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error while fetching profile';
            });
    }
});

export const store = configureStore({
    reducer: {
        URIShortner: URIShortnerSlice.reducer
    }
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;