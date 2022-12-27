import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { cultivate } from "../../../../interface/cultivate";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    cultivate: cultivate | null;
    cultivates: cultivate[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    cultivates: [],
    cultivate: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('cultivates/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let cultivates: any;
            const response = await axios({
                method: 'GET',
                url: '/api/cultivation',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            cultivates = response;
            if (filter) {
                if (filter.userOption != null) {
                    cultivates = cultivates.filter((data: any) => data.fkMaCanBo == filter.userOption)
                }
                if (filter.cultivateOption != null) {
                    cultivates = cultivates.filter((data: any) => data.fkMaHinhThucBD == filter.cultivateOption)
                }
                if (filter.keyword != '') {
                    const cultivates = await response.filter((cultivate: any) =>
                        cultivate.DM_Hinh_Thuc_BD?.tenHinhThuc.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return cultivates
                }
                return cultivates
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getCultivate = createAsyncThunk('cultivate/getCultivateByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let cultivate: any;
            const response = await axios({
                method: 'GET',
                url: `/api/cultivation/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            cultivate = await response;
            console.log(cultivate)
            return cultivate
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addCultivate = createAsyncThunk('cultivate/addCultivate',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/cultivation',
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
export const deleteCultivate = createAsyncThunk('cultivate/deleteCultivate',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/cultivation/${id}`,
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
export const updateCultivate = createAsyncThunk('cultivate/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/cultivation',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
const cultivateSlice = createSlice({
    name: 'cultivates',
    initialState,
    reducers: {
        removeCultivate: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.cultivates.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.cultivates.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.cultivates = action.payload;
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
        builder.addCase(getCultivate.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getCultivate.fulfilled, (state, action) => {
            if (action.payload) {
                state.cultivate = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getCultivate.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const cultivateReducer = cultivateSlice.reducer;
export const { removeCultivate } = cultivateSlice.actions;

export const cultivateSelector = (state: RootState) => state.cultivateReducer;

export default cultivateReducer