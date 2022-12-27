import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { business } from "../../../../../interface/business";
import { iFilter } from "../../../../../interface/filter";
import { RootState } from "../../../../../store/store";


export interface defaultState {
    authLoading: boolean;
    business: business | null;
    businesss: business[];
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    businesss: [],
    business: null,
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAll = createAsyncThunk('businesss/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let businesss: any;
            const response = await axios({
                method: 'GET',
                url: '/api/business',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            businesss = response;
            if (filter) {
                if (filter.keyword != '') {
                    const businesss = await response.filter((business: any) =>
                        business.chucDanh.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        business.chuyenMon.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        business.fkMaCanBo.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return businesss
                }
                return businesss
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getBusiness = createAsyncThunk('business/getBusinessByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let business: any;
            const response = await axios({
                method: 'GET',
                url: `/api/business/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            business = await response;
            console.log(business)
            return business
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const addBusiness = createAsyncThunk('business/addBusiness',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/business',
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
export const updateBusiness = createAsyncThunk('business/update',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: '/api/business',
                data: value
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    })
export const deleteBusiness = createAsyncThunk('business/deleteBusiness',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/business/${id}`,
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
const businessSlice = createSlice({
    name: 'businesss',
    initialState,
    reducers: {
        removeBusiness: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.businesss.findIndex((business) => business.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.businesss.splice(result, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.businesss = action.payload;
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
        builder.addCase(getBusiness.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getBusiness.fulfilled, (state, action) => {
            if (action.payload) {
                state.business = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getBusiness.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        // builder.addCase(getBusiness.pending, (state, action) => {
        //     state.authLoading = true;
        // });
        // builder.addCase(getBusiness.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.business = action.payload;
        //         state.message.fail = false;
        //         state.message.text = "";
        //     } else {
        //         state.message.fail = true;
        //         state.message.text = "Đã xảy ra lỗi !";
        //     }
        //     state.authLoading = false;
        // });
        // builder.addCase(getBusiness.rejected, (state, action) => {
        //     state.message.fail = true;
        //     state.message.text = action.error.message;
        //     state.authLoading = false;
        // });
    }
})

const businessReducer = businessSlice.reducer;
export const { removeBusiness } = businessSlice.actions;
export const businessSelector = (state: RootState) => state.businessReducer;

export default businessReducer