import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { reward } from "../../../../interface/reward";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    reward: reward | null;
    rewards: reward[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    rewards: [],
    reward: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('rewards/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let rewards: any;
            const response = await axios({
                method: 'GET',
                url: '/api/reward',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            rewards = response;
            if (filter) {
                if (filter.userOption != null) {
                    rewards = rewards.filter((data: any) => data.fkMaCanBo == filter.userOption)
                }
                if (filter.rewardOption != null) {
                    rewards = rewards.filter((data: any) => data.fkMaKhenThuong == filter.rewardOption)
                }
                if (filter.keyword != '') {
                    const rewards = await response.filter((reward: any) =>
                        reward.DM_khen_thuong?.tenKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return rewards
                }
                return rewards
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getReward = createAsyncThunk('reward/getReward',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let reward: any;
            const response = await axios({
                method: 'GET',
                url: `/api/reward/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            reward = await response;
            console.log(reward)
            return reward
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addReward = createAsyncThunk('reward/addReward',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/reward',
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
export const updateReward = createAsyncThunk('reward/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/reward',
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
export const deleteReward = createAsyncThunk('reward/deleteReward',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/reward/${id}`,
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
const rewardSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        removeReward: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.rewards.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.rewards.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.rewards = action.payload;
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
        builder.addCase(getReward.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getReward.fulfilled, (state, action) => {
            if (action.payload) {
                state.reward = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getReward.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const rewardReducer = rewardSlice.reducer;

export const { removeReward } = rewardSlice.actions

export const rewardSelector = (state: RootState) => state.rewardReducer;

export default rewardReducer