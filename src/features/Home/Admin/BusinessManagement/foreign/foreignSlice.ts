import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { foreign } from "../../../../../interface/foreign";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    foreign: foreign | null;
    foreigns: foreign[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    foreigns: [],
    foreign: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('foreigns/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let foreigns: any;
            const response = await axios({
                method: 'GET',
                url: '/api/aboardB',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            foreigns = response;
            if (filter) {
                if (filter.cbId != null) {
                    foreigns = foreigns.filter((data: any) => data.fkMaCanBo == filter.cbId)
                }
                if (filter.keyword != '') {
                    const foreigns = await response.filter((foreign: any) =>
                        foreign.chucDanh.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        foreign.nganhHoc.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        foreign.noiden.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return foreigns
                }
                return foreigns
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getForeign = createAsyncThunk('foreign/getForeignByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let foreign: any;
            const response = await axios({
                method: 'GET',
                url: `/api/aboardB/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            foreign = await response;
            return foreign
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addForeign = createAsyncThunk('foreign/addForeign',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/aboardB',
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
export const deleteForeign = createAsyncThunk('foreign/deleteForeign',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/aboardB/${id}`,
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
export const updateForeign = createAsyncThunk('foreign/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/aboardB',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            console.log(response)
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
const foreignSlice = createSlice({
    name: 'foreigns',
    initialState,
    reducers: {
        removeForeign: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.foreigns.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.foreigns.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.foreigns = action.payload;
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
        builder.addCase(getForeign.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getForeign.fulfilled, (state, action) => {
            if (action.payload) {
                state.foreign = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getForeign.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        // builder.addCase(getForeign.pending, (state, action) => {
        //     state.authLoading = true;
        // });
        // builder.addCase(getForeign.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.foreign = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getForeign.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const foreignReducer = foreignSlice.reducer;

export const foreignSelector = (state: RootState) => state.foreignReducer;

export const { removeForeign } = foreignSlice.actions;

export default foreignReducer