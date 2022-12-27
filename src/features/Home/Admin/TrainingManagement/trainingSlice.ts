import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { training } from "../../../../interface/training";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    training: training | null;
    trainings: training[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    trainings: [],
    training: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('trainings/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let trainings: any;
            const response = await axios({
                method: 'GET',
                url: '/api/training',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            trainings = response;
            if (filter) {
                if (filter.userOption != null) {
                    trainings = trainings.filter((data: any) => data.fkMaCanBo == filter.userOption)
                }
                if (filter.levelTrainOption != null) {
                    trainings = trainings.filter((data: any) => data.fkMaBac == filter.levelTrainOption)
                }
                if (filter.typeTrainOption != null) {
                    trainings = trainings.filter((data: any) => data.fkMaHeDaoTao == data.typeTrainOption)
                }
                if (filter.keyword != '') {
                    const trainings = await response.filter((training: any) =>
                        training.DM_he_dao_tao?.tenHeDaoTao.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        training.Bac_dao_tao?.tenBac.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return trainings
                }
                return trainings
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getTraining = createAsyncThunk('training/getTraining',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let training: any;
            const response = await axios({
                method: 'GET',
                url: `/api/training/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            training = await response;
            console.log(training)
            return training
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addTraining = createAsyncThunk('training/addTraining',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/training',
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
export const updateTraining = createAsyncThunk('training/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/training',
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
export const deleteTraining = createAsyncThunk('training/deleteTraining',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/training/${id}`,
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
const trainingSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        removeTraining: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.trainings.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.trainings.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.trainings = action.payload;
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
        builder.addCase(getTraining.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getTraining.fulfilled, (state, action) => {
            if (action.payload) {
                state.training = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getTraining.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const trainingReducer = trainingSlice.reducer;

export const { removeTraining } = trainingSlice.actions;

export const trainingSelector = (state: RootState) => state.trainingReducer;

export default trainingReducer