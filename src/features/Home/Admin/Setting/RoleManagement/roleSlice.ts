import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";
import { role } from "../../../../../interface/role";


export interface defaultState {
    authLoading: boolean;
    role: role | null;
    roles: role[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    roles: [],
    role: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('roles/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let roles: any;
            const response = await axios({
                method: 'GET',
                url: '/api/role',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            roles = response;
            return roles

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getRole = createAsyncThunk('role/getRole',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let role: any;
            const response = await axios({
                method: 'GET',
                url: `/api/role/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            role = response;
            return role
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addRole = createAsyncThunk('role/addRole',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/role',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            console.log(value)
            return response

        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    }
)
export const updateRole = createAsyncThunk('role/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/role',
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
export const deleteRole = createAsyncThunk('role/deleteRole',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/role/${id}`,
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
const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        removeRole: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.roles.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.roles.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.roles = action.payload;
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
        builder.addCase(getRole.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getRole.fulfilled, (state, action) => {
            if (action.payload) {
                state.role = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getRole.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const roleReducer = roleSlice.reducer;

export const { removeRole } = roleSlice.actions

export const roleSelector = (state: RootState) => state.roleReducer;

export default roleReducer