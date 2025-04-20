import { createAsyncThunk } from "@reduxjs/toolkit";
import { signUP, signUPDataType } from "../../api";

export const signup_thunk_action = createAsyncThunk(
    'uri_shortner/signup',
    async(formdata: signUPDataType) => {
        const res = signUP(formdata);
        return res
    }
);