import { configureStore, createSlice } from "@reduxjs/toolkit";
import { signupThunkAction } from "./reducers/auth_reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface User {
    id: number;
}

interface SignupData {
    success: boolean;
    user: User;
}

interface InitialStateType {
    signupData: SignupData | null;
    loading: boolean;
    error: string | null;
}

const initialState: InitialStateType = {
    signupData: null,
    loading: false,
    error: null,
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
            .addCase(signupThunkAction.fulfilled, (state, action) => {
                state.loading = false;
                state.signupData = action.payload.data;
            })
            .addCase(signupThunkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Signup failed';
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