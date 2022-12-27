import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { contract } from "../../../../interface/contract";
import { iFilter } from "../../../../interface/filter";
import { RootState } from "../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    contract: contract | null;
    contracts: contract[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    contracts: [],
    contract: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('contracts/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let contracts: any;
            const response = await axios({
                method: 'GET',
                url: '/api/contract',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            contracts = await response;
            if (filter) {
                if (filter.userOption != null) {
                    contracts = contracts.filter((data: any) => data.BenB == filter.userOption)
                }
                if (filter.contractDi != null) {
                    contracts = contracts.filter((data: any) => data.fkMaLoaiHD == filter.contractDi)
                }
                if (filter.keyword != '') {
                    const contracts = await response.filter((contract: any) =>
                        contract.Can_bo_giang_day.ho.toLowerCase().includes(filter.keyword?.toLowerCase()) |
                        contract.Can_bo_giang_day.ten.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return contracts
                }
                return contracts
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getContract = createAsyncThunk('contract/getContractByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let contract: any;
            const response = await axios({
                method: 'GET',
                url: `/api/contract/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            contract = await response;
            console.log(contract)
            return contract
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addContract = createAsyncThunk('contract/addContract',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/contract',
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
export const deleteContract = createAsyncThunk('contract/deleteContract',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/contract/${id}`,
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
export const updateContract = createAsyncThunk('contract/updateContract',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/contract',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
export const updateDateContract = createAsyncThunk('contract/updateDateContract',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/contractdate',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
const contractSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        removeContract: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.contracts.findIndex((data) => data.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.contracts.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.contracts = action.payload;
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
        builder.addCase(getContract.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getContract.fulfilled, (state, action) => {
            if (action.payload) {
                state.contract = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getContract.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const contractReducer = contractSlice.reducer;
export const { removeContract } = contractSlice.actions;

export const contractSelector = (state: RootState) => state.contractReducer;

export default contractReducer