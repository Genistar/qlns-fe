import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { discipline } from "../../../../interface/discipline";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    disciplineUser: discipline | null;
    disciplinesUser: discipline[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    disciplinesUser: [],
    disciplineUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('disciplinesUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let disciplinesUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/discipline?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            disciplinesUser = await response;
            if (filter) {
                if (filter.disciplineOption != null) {
                    disciplinesUser = disciplinesUser.filter((data: any) => data.fkMaKyLuat == filter.disciplineOption)
                }
                if (filter.keyword != '') {
                    const disciplines = await response.filter((discipline: any) =>
                        discipline.fkMaKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return disciplines
                }
                return disciplinesUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
// export const getdiscipline = createAsyncThunk('discipline/getdiscipline',
//     async (id?: string | null, thunkAPI?: any) => {
//         try {
//             let discipline: any;
//             const response = await axios({
//                 method: 'GET',
//                 url: `/api/discipline/${id}`,
//                 data: null,
//             }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
//                 console.log(err)
//             });
//             discipline = await response;
//             console.log(discipline)
//             return discipline
//         } catch (error) {
//             return thunkAPI.rejectWithValue({ error });
//         }
//     }
// )
// export const adddiscipline = createAsyncThunk('discipline/adddiscipline',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'POST',
//                 url: '/api/discipline',
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
// export const updatediscipline = createAsyncThunk('discipline/update',
//     async (value: any, thunkAPI) => {
//         try {
//             const response = await axios({
//                 method: 'PUT',
//                 url: '/api/discipline',
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
// export const deletediscipline = createAsyncThunk('discipline/deletediscipline',
//     async (id: string | null, thunkAPI?: any) => {
//         try {
//             const response = await axios({
//                 method: 'DELETE',
//                 url: `/api/discipline/${id}`,
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
const disciplineUserSlice = createSlice({
    name: 'disciplines',
    initialState,
    reducers: {
        removeUserdiscipline: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.disciplinesUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.disciplinesUser.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.disciplinesUser = action.payload;
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
        // builder.addCase(getdiscipline.pending, (state, action) => {
        //     state.authLoading = true;disciplineUserReducer
        // });
        // builder.addCase(getdiscipline.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.discipline = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getdiscipline.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const disciplineUserReducer = disciplineUserSlice.reducer;

export const { removeUserdiscipline } = disciplineUserSlice.actions

export const disciplineUserSelector = (state: RootState) => state.disciplineUserReducer;

export default disciplineUserReducer