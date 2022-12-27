import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { business } from "../../../../../interface/business";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    domesticUser: business | null;
    domesticsUser: business[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    domesticsUser: [],
    domesticUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('domesticsUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let domesticsUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/business?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            domesticsUser = await response;
            console.log(domesticsUser)
            if (filter) {
                if (filter.keyword != '') {
                    const domestics = await response.filter((domestic: any) =>
                        domestic.fkMaKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return domestics
                }
                return domesticsUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
// export const getdomestic = createAsyncThunk('domestic/getdomestic',
//     async (id?: string | null, thunkAPI?: any) => {
//         try {
//             let domestic: any;
//             const response = await axios({
//                 method: 'GET',
//                 url: `/api/domestic/${id}`,
//                 data: null,
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             domestic = await response;
//             console.log(domestic)
//             return domestic
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error });
//         }
//     }
// )
// export const adddomestic = createAsyncThunk('domestic/adddomestic',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'POST',
//                 url: '/api/domestic',
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
// export const updatedomestic = createAsyncThunk('domestic/update',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'PUT',
//                 url: '/api/domestic',
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
// export const deletedomestic = createAsyncThunk('domestic/deletedomestic',
//     async (id: string | null, thunkAPI?: any) => {
//         try {
//             const response = await axios({
//                 method: 'DELETE',
//                 url: `/api/domestic/${id}`,
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
const domesticUserSlice = createSlice({
    name: 'domestics',
    initialState,
    reducers: {
        removeUserdomestic: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.domesticsUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.domesticsUser.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.domesticsUser = action.payload;
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
        // builder.addCase(getdomestic.pending, (state, action) => {
        //     state.authLoading = true;domesticUserReducer
        // });
        // builder.addCase(getdomestic.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.domestic = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getdomestic.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const domesticUserReducer = domesticUserSlice.reducer;

export const { removeUserdomestic } = domesticUserSlice.actions

export const domesticUserSelector = (state: RootState) => state.domesticUserReducer;

export default domesticUserReducer