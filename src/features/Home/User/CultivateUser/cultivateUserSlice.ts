import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { cultivate } from "../../../../interface/cultivate";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    cultivateUser: cultivate | null;
    cultivatesUser: cultivate[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    cultivatesUser: [],
    cultivateUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('cultivatesUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let cultivatesUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/cultivation?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            cultivatesUser = await response;
            if (filter) {
                if (filter.cultivateOption != null) {
                    cultivatesUser.filter((data: any) => data.fkMaHinhThucBD == filter.cultivateOption)
                }
                if (filter.keyword != '') {
                    const cultivates = await response.filter((cultivate: any) =>
                        cultivate.DM_Hinh_Thuc_BD.tenHinhThuc.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return cultivates
                }
                return cultivatesUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
// export const getcultivate = createAsyncThunk('cultivate/getcultivate',
//     async (id?: string | null, thunkAPI?: any) => {
//         try {
//             let cultivate: any;
//             const response = await axios({
//                 method: 'GET',
//                 url: `/api/cultivate/${id}`,
//                 data: null,
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             cultivate = await response;
//             console.log(cultivate)
//             return cultivate
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error });
//         }
//     }
// )
// export const addcultivate = createAsyncThunk('cultivate/addcultivate',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'POST',
//                 url: '/api/cultivate',
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
// export const updatecultivate = createAsyncThunk('cultivate/update',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'PUT',
//                 url: '/api/cultivate',
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
// export const deletecultivate = createAsyncThunk('cultivate/deletecultivate',
//     async (id: string | null, thunkAPI?: any) => {
//         try {
//             const response = await axios({
//                 method: 'DELETE',
//                 url: `/api/cultivate/${id}`,
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
const cultivateUserSlice = createSlice({
    name: 'cultivates',
    initialState,
    reducers: {
        removeUserCultivate: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.cultivatesUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.cultivatesUser.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.cultivatesUser = action.payload;
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
        // builder.addCase(getcultivate.pending, (state, action) => {
        //     state.authLoading = true;cultivateUserReducer
        // });
        // builder.addCase(getcultivate.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.cultivate = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getcultivate.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const cultivateUserReducer = cultivateUserSlice.reducer;

export const { removeUserCultivate } = cultivateUserSlice.actions

export const cultivateUserSelector = (state: RootState) => state.cultivateUserReducer;

export default cultivateUserReducer