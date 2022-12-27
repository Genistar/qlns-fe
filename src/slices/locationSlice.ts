import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { location } from "../interface/location";
import { iFilter } from "../interface/filter";
import { RootState } from "../store/store";
import { PATHS } from "../constant/path";


export interface defaultState {
    authLoading: boolean;
    cities: location[];
    districts: location[];
    wards: location[]
    message: {
        fail: boolean;
        text: string | undefined;
    };
}
const initialState: defaultState = {
    cities: [],
    districts: [],
    wards: [],
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}
export const getAllCities = createAsyncThunk('location/getAllCities',
    async (_, thunkAPI?: any) => {
        try {
            let cities: any;
            const response = await axios({
                method: 'GET',
                url: `${PATHS.CITIES}`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            cities = await response["data"];
            return cities
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getAllDistricts = createAsyncThunk('location/getAllDistricts',
    async (locationId?: number, thunkAPI?: any) => {
        try {
            let districts: any;
            const response = await axios({
                method: 'GET',
                url: `${PATHS.DISTRICTS}/${locationId}.json`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            districts = await response["data"];
            return districts
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getAllWards = createAsyncThunk('location/getAllWards',
    async (locationId?: number, thunkAPI?: any) => {
        try {
            let wards: any;
            const response = await axios({
                method: 'GET',
                url: `${PATHS.WARDS}/${locationId}.json`,
                data: null

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            wards = await response["data"];
            return wards
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
const locationUserSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCities.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAllCities.fulfilled, (state, action) => {
            if (action.payload) {
                state.cities = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAllCities.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getAllDistricts.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAllDistricts.fulfilled, (state, action) => {
            if (action.payload) {
                state.districts = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAllDistricts.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getAllWards.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAllWards.fulfilled, (state, action) => {
            if (action.payload) {
                state.wards = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAllWards.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const locationUserReducer = locationUserSlice.reducer;

export const locationUserSelector = (state: RootState) => state.locationUserReducer;

export default locationUserReducer