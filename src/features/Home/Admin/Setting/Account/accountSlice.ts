import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Can_bo_giang_day } from "../../../../../interface/index";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    account: Can_bo_giang_day | null;
    accounts: Can_bo_giang_day[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    accounts: [],
    account: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('accounts/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let accounts: any;
            const response = await axios({
                method: 'GET',
                url: '/api/account',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            accounts = response;
            if (filter) {
                if (filter.role != null) {
                    accounts = accounts.filter((data: any) => data.role === filter.role)
                }
                if (filter.keyword != '') {
                    const accounts = await response.filter((account: any) =>
                        account?.username.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return accounts
                }
                return accounts
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getAccount = createAsyncThunk('account/getAccount',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let account: any;
            const response = await axios({
                method: 'GET',
                url: `/api/account/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            account = await response;
            console.log(account)
            return account
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addAccount = createAsyncThunk('account/addAccount',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/account',
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
export const updateAccount = createAsyncThunk('account/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/account',
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
export const deleteAccount = createAsyncThunk('account/deleteAccount',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/account/${id}`,
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
const accountSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        removeAccount: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.accounts.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.accounts.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.accounts = action.payload;
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
        builder.addCase(getAccount.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.account = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAccount.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const accountReducer = accountSlice.reducer;

export const { removeAccount } = accountSlice.actions

export const accountSelector = (state: RootState) => state.accountReducer;

export default accountReducer