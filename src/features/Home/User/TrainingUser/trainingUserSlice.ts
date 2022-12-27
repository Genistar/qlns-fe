import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { training } from "../../../../interface/training";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    trainingUser: training | null;
    trainingsUser: training[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    trainingsUser: [],
    trainingUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('trainingsUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let trainingsUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/training?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            trainingsUser = await response;
            if (filter) {
                if (filter.levelTrainOption != null) {
                    trainingsUser = trainingsUser.filter((data: any) => data.fkMaBac == filter.levelTrainOption)
                }
                if (filter.typeTrainOption != null) {
                    trainingsUser = trainingsUser.filter((data: any) => data.fkMaHeDaoTao == data.typeTrainOption)
                }
                if (filter.keyword != '') {
                    const trainings = await response.filter((training: any) =>
                        training.fkMaKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return trainings
                }
                return trainingsUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
const trainingUserSlice = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        removeUsertraining: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.trainingsUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.trainingsUser.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.trainingsUser = action.payload;
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
        // builder.addCase(gettraining.pending, (state, action) => {
        //     state.authLoading = true;
        // });
        // builder.addCase(gettraining.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.training = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(gettraining.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const trainingUserReducer = trainingUserSlice.reducer;

export const { removeUsertraining } = trainingUserSlice.actions

export const trainingUserSelector = (state: RootState) => state.trainingUserReducer;

export default trainingUserReducer