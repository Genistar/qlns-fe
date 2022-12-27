import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { foreign } from "../../../../../interface/foreign";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    foreignUser: foreign | null;
    foreignsUser: foreign[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    foreignsUser: [],
    foreignUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('foreignsUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let foreignsUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/aboardB?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            foreignsUser = await response;
            console.log(foreignsUser)
            if (filter) {
                if (filter.keyword != '') {
                    const foreigns = await response.filter((foreign: any) =>
                        foreign.fkMaKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return foreigns
                }
                return foreignsUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
// export const getforeign = createAsyncThunk('foreign/getforeign',
//     async (id?: string | null, thunkAPI?: any) => {
//         try {
//             let foreign: any;
//             const response = await axios({
//                 method: 'GET',
//                 url: `/api/foreign/${id}`,
//                 data: null,
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             foreign = await response;
//             console.log(foreign)
//             return foreign
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error });
//         }
//     }
// )
// export const addforeign = createAsyncThunk('foreign/addforeign',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'POST',
//                 url: '/api/foreign',
//                 data: value
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             return response

//         } catch (e) {
//             return thunkAPI.rejectWithValue({ e })
//         }
//     }
// )
// export const updateforeign = createAsyncThunk('foreign/update',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'PUT',
//                 url: '/api/foreign',
//                 data: value
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             return response
//         } catch (e) {
//             return thunkAPI.rejectWithValue({ e })
//         }
//     }
// )
// export const deleteforeign = createAsyncThunk('foreign/deleteforeign',
//     async (id: string | null, thunkAPI?: any) => {
//         try {
//             const response = await axios({
//                 method: 'DELETE',
//                 url: `/api/foreign/${id}`,
//                 data: null
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             return {
//                 id: id,
//                 ...response
//             };
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error });
//         }
//     }
// )
const foreignUserSlice = createSlice({
    name: 'foreigns',
    initialState,
    reducers: {
        removeUserforeign: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.foreignsUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.foreignsUser.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.foreignsUser = action.payload;
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
        // builder.addCase(getforeign.pending, (state, action) => {
        //     state.authLoading = true;foreignUserReducer
        // });
        // builder.addCase(getforeign.fulfilled, (state, action) => {
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
        // builder.addCase(getforeign.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const foreignUserReducer = foreignUserSlice.reducer;

export const { removeUserforeign } = foreignUserSlice.actions

export const foreignUserSelector = (state: RootState) => state.foreignUserReducer;

export default foreignUserReducer