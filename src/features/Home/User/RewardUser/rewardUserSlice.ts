import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { reward } from "../../../../interface/reward";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    rewardUser: reward | null;
    rewardsUser: reward[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    rewardsUser: [],
    rewardUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('rewardsUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let rewardsUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/reward?cbId=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            rewardsUser = await response;
            if (filter) {
                if (filter.rewardOption != null) {
                    rewardsUser = rewardsUser.filter((data: any) => data.fkMaKhenThuong == filter.rewardOption)
                }
                if (filter.keyword != '') {
                    const rewards = await response.filter((reward: any) =>
                        reward.fkMaKhenThuong.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return rewards
                }
                return rewardsUser
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
const rewardUserSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        removeUserReward: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.rewardsUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.rewardsUser.splice(result, 1);
        },
        updateRewardOfUser: (state, action) => {
            let data = state.rewardsUser;
            console.log(current(data))
            data.map(item => {
                if (item.id === action.payload.id) item = action.payload
            })
            state.rewardsUser = data;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.rewardsUser = action.payload;
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
        // builder.addCase(getReward.pending, (state, action) => {
        //     state.authLoading = true;
        // });
        // builder.addCase(getReward.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.reward = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getReward.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const rewardUserReducer = rewardUserSlice.reducer;

export const { removeUserReward, updateRewardOfUser } = rewardUserSlice.actions

export const rewardUserSelector = (state: RootState) => state.rewardUserReducer;

export default rewardUserReducer