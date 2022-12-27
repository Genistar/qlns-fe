import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";
import { contract } from "../../../../interface/contract";


export interface defaultState {
    authLoading: boolean;
    contractUser: contract | null;
    contractsUser: contract[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    contractsUser: [],
    contractUser: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('contractsUser/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let contractUser: any;
            const response = await axios({
                method: 'GET',
                url: `/user/contract?BenB=${filter?.cbId}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            contractUser = await response;
            return contractUser

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const updateContractUser = createAsyncThunk('contractUser/updateContractUser',
    async (value: any, thunkAPI) => {
        try {
            console.log(value)
            const response = await axios({
                method: 'PUT',
                url: '/user/contract',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
const contractUserSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        removeUserContract: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.contractsUser.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.contractsUser.splice(result, 1);
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.contractUser = action.payload;
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
        // builder.addCase(getcontract.pending, (state, action) => {
        //     state.authLoading = true;
        // });
        // builder.addCase(getcontract.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.contract = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getcontract.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const contractUserReducer = contractUserSlice.reducer;

export const { removeUserContract } = contractUserSlice.actions

export const contractUserSelector = (state: RootState) => state.contractUserReducer;

export default contractUserReducer