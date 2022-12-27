import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { family } from "../../../../interface/family";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    family: family | null;
    familys: family[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    familys: [],
    family: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('familys/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let familys: any;
            const response = await axios({
                method: 'GET',
                url: `/user/family?fkMaCanBo=${filter?.cbId}`,
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            familys = response;
            return familys

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getFamily = createAsyncThunk('family/getFamily',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let family: any;
            const response = await axios({
                method: 'GET',
                url: `/user/family/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            family = await response;
            console.log(family)
            return family
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addFamily = createAsyncThunk('family/addFamily',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/user/family',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response

        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    }
)
export const updateFamily = createAsyncThunk('family/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/user/family',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    }
)
export const deleteFamily = createAsyncThunk('family/deleteFamily',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/user/family/${id}`,
                data: null
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return {
                id: id,
                ...response
            };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
const familySlice = createSlice({
    name: 'familys',
    initialState,
    reducers: {
        removeFamily: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.familys.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.familys.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.familys = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getFamily.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getFamily.fulfilled, (state, action) => {
            if (action.payload) {
                state.family = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getFamily.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const familyReducer = familySlice.reducer;

export const { removeFamily } = familySlice.actions;

export const familySelector = (state: RootState) => state.familyReducer;

export default familyReducer