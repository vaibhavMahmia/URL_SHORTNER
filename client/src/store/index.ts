import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload; // Set the error message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
            })
            .addCase(signupThunkAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.links = action.payload.links;
                localStorage.setItem('loggedIn', 'true');
            })
            .addCase(signupThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed';
            })
            .addCase(loginThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunkAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.links = action.payload.links;
                localStorage.setItem('loggedIn', 'true');
            })
            .addCase(loginThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
            })
            .addCase(logoutThunkAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutThunkAction.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.links = [];
                localStorage.setItem('loggedIn', 'false');
            })
            .addCase(logoutThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Logout failed';
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
                state.error = action.payload || 'Error while fetching profile';
            });
    }
});

export const { setError } = URIShortnerSlice.actions;
export const store = configureStore({
    reducer: {
        URIShortner: URIShortnerSlice.reducer
    }
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;