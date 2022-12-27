import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { discipline } from "../../../../interface/discipline";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    discipline: discipline | null;
    disciplines: discipline[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    disciplines: [],
    discipline: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('discipline/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let disciplines: any;
            const response = await axios({
                method: 'GET',
                url: '/api/discipline',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            disciplines = response;
            if (filter) {
                if (filter.userOption != null) {
                    disciplines = disciplines.filter((data: any) => data.fkMaCanBo == filter.userOption)
                }
                if (filter.disciplineOption != null) {
                    disciplines = disciplines.filter((data: any) => data.fkMaKyLuat == filter.disciplineOption)
                }
                if (filter.keyword != '') {
                    const disciplines = await response.filter((discipline: any) =>
                        discipline.DM_ky_luat?.tenKyLuat.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return disciplines
                }
                return disciplines
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getDiscipline = createAsyncThunk('discipline/getDisciplineByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let discipline: any;
            const response = await axios({
                method: 'GET',
                url: `/api/discipline/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            discipline = await response;
            console.log(discipline)
            return discipline
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addDiscipline = createAsyncThunk('discipline/addDiscipline',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/discipline',
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
export const updateDiscipline = createAsyncThunk('discipline/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/discipline',
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
export const deleteDiscipline = createAsyncThunk('discipline/deleteDiscipline',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/discipline/${id}`,
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
const disciplineSlice = createSlice({
    name: 'disciplines',
    initialState,
    reducers: {
        removeDiscipline: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.disciplines.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.disciplines.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.disciplines = action.payload;
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
        builder.addCase(getDiscipline.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getDiscipline.fulfilled, (state, action) => {
            if (action.payload) {
                state.discipline = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getDiscipline.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const disciplineReducer = disciplineSlice.reducer;

export const { removeDiscipline } = disciplineSlice.actions;

export const disciplineSelector = (state: RootState) => state.disciplineReducer;

export default disciplineReducer