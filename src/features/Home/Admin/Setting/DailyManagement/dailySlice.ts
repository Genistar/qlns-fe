import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { daily } from "../../../../../interface/daily";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    daily: daily | null;
    dailys: daily[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    dailys: [],
    daily: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('daily/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let dailys: any;
            const response = await axios({
                method: 'GET',
                url: '/api/daily',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            dailys = response;
            if (filter) {
                if (filter.hd != null) {
                    dailys = dailys.filter((data: any) => data.ten_hoat_dong == filter.hd)
                }
                if (filter.userOption != null) {
                    dailys = dailys.filter((data: any) => data.fkMaCanBo == filter.userOption)
                }
                if (filter.keyword != '') {
                    const dailys = await response.filter((daily: any) =>
                        daily.ten_hoat_dong.toLowerCase().includes(filter.keyword?.toLowerCase()) |
                        daily.can_bo_giang_day.ten.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return dailys
                }
                return dailys
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getDaily = createAsyncThunk('daily/getdailyByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let daily: any;
            const response = await axios({
                method: 'GET',
                url: `/api/daily/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            daily = await response;
            console.log(daily)
            return daily
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addDaily = createAsyncThunk('daily/addDaily',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/daily',
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
export const updateDaily = createAsyncThunk('daily/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/daily',
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
export const deleteDaily = createAsyncThunk('daily/deleteDaily',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/daily/${id}`,
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
const dailySlice = createSlice({
    name: 'dailys',
    initialState,
    reducers: {
        removeDaily: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.dailys.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.dailys.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.dailys = action.payload;
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
        builder.addCase(getDaily.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getDaily.fulfilled, (state, action) => {
            if (action.payload) {
                state.daily = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getDaily.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const dailyReducer = dailySlice.reducer;

export const { removeDaily } = dailySlice.actions;

export const dailySelector = (state: RootState) => state.dailyReducer;

export default dailyReducer