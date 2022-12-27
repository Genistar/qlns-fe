import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { academicRank, civilServantRank, contractType, cultivationForm, degreeD, disciplineD, majors, nation, position, religion, rewardD, salaryScale, subject, trainingLevel, typeOfTraining } from "../interface/directory";
import { family } from "../interface/family";
import { iFilter } from "../interface/filter";
import { RootState } from "../store/store";


export interface defaultState {
    authLoading: boolean;
    nationD: nation[];
    religionD: religion[];
    typeOfTraining: typeOfTraining[];
    cultivationForm: cultivationForm[];
    disciplineD: disciplineD[];
    academicRank: academicRank[];
    rewardD: rewardD[];
    degreeD: degreeD[];
    majors: majors[];
    subject: subject[];
    trainingLevel: trainingLevel[];
    contractType: contractType[];
    civilServant: civilServantRank[];
    salaryScale: salaryScale[];
    position: position[];
    relationship: any;
    typeOfficer: any
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

const initialState: defaultState = {
    nationD: [],
    religionD: [],
    typeOfTraining: [],
    cultivationForm: [],
    rewardD: [],
    disciplineD: [],
    academicRank: [],
    degreeD: [],
    majors: [],
    subject: [],
    trainingLevel: [],
    contractType: [],
    civilServant: [],
    salaryScale: [],
    position: [],
    relationship: [],
    typeOfficer: [],
    authLoading: false,
    message: {
        fail: false,
        text: ''
    }
}

export const getNationD = createAsyncThunk('directory/nationD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let nationD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_dan_toc',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            nationD = await response;
            return nationD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getReligionD = createAsyncThunk('directory/religionD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let religionD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_ton_giao',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            religionD = await response;
            return religionD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const cultivationFormD = createAsyncThunk('directory/cultivationFormD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let cultivationFormD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_hinh_thuc_bd',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            cultivationFormD = await response;
            return cultivationFormD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const gettypeOfTrainingD = createAsyncThunk('directory/typeOfTrainingD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let typeOfTrainingD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_he_dao_tao',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            typeOfTrainingD = await response;
            return typeOfTrainingD;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getAcademicRankD = createAsyncThunk('directory/academicRankD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let academicRankD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_hoc_ham',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            academicRankD = await response;
            return academicRankD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getDegreeD = createAsyncThunk('directory/degreeD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let degreeD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_hoc_vi',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            degreeD = await response;
            return degreeD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getDisciplineD = createAsyncThunk('directory/disciplineD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let disciplineD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_ky_luat',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            disciplineD = await response;
            return disciplineD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getMajorsD = createAsyncThunk('directory/majorsD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let majorsD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_nganh',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            majorsD = await response;
            return majorsD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getSubjectsD = createAsyncThunk('directory/subjectD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let subjectD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_bo_mon',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            subjectD = await response;
            return subjectD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getRewardD = createAsyncThunk('directory/rewardD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let rewardD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_khen_thuong',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            rewardD = await response;
            return rewardD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getTrainingLevel = createAsyncThunk('directory/trainingLevelD',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let trainingLevelD: any;
            const response = await axios({
                method: 'GET',
                url: '/api/dm_bac_dao_tao',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            trainingLevelD = await response;
            return trainingLevelD
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getContractType = createAsyncThunk('directory/contractType',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let contractType: any;
            const response = await axios({
                method: 'GET',
                url: '/api/loai_hop_dong',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            contractType = await response;
            return contractType
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getCivilServant = createAsyncThunk('directory/civilServant',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let civilServant: any;
            const response = await axios({
                method: 'GET',
                url: '/api/ngach_cong_chuc',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            civilServant = await response;
            return civilServant
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getSalaryScale = createAsyncThunk('directory/salaryScale',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let salaryScale: any;
            const response = await axios({
                method: 'GET',
                url: '/api/bac_luong',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            salaryScale = await response;
            return salaryScale
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getPosition = createAsyncThunk('directory/getPosition',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let position: any;
            const response = await axios({
                method: 'GET',
                url: '/api/chuc_vu',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            position = await response;
            return position
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getRelationship = createAsyncThunk('directory/getRelationShip',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let position: any;
            const response = await axios({
                method: 'GET',
                url: '/api/quan_he',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            position = await response;
            return position
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getTypeOfOfficer = createAsyncThunk('directory/getTypeOfOfficer',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let typeOfficer: any;
            const response = await axios({
                method: 'GET',
                url: '/api/loai_can_bo',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            typeOfficer = await response;
            return typeOfficer
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)

const directorySlice = createSlice({
    name: 'directorys',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNationD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getNationD.fulfilled, (state, action) => {
            if (action.payload) {
                state.nationD = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getNationD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getReligionD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getReligionD.fulfilled, (state, action) => {
            if (action.payload) {
                state.religionD = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getReligionD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(gettypeOfTrainingD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(gettypeOfTrainingD.fulfilled, (state, action) => {
            if (action.payload) {
                state.typeOfTraining = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(gettypeOfTrainingD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(cultivationFormD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(cultivationFormD.fulfilled, (state, action) => {
            if (action.payload) {
                state.cultivationForm = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(cultivationFormD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getAcademicRankD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAcademicRankD.fulfilled, (state, action) => {
            if (action.payload) {
                state.academicRank = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getAcademicRankD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getDegreeD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getDegreeD.fulfilled, (state, action) => {
            if (action.payload) {
                state.degreeD = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getDegreeD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getMajorsD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getMajorsD.fulfilled, (state, action) => {
            if (action.payload) {
                state.majors = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getMajorsD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getSubjectsD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getSubjectsD.fulfilled, (state, action) => {
            if (action.payload) {
                state.subject = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getSubjectsD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getDisciplineD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getDisciplineD.fulfilled, (state, action) => {
            if (action.payload) {
                state.disciplineD = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getDisciplineD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getRewardD.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getRewardD.fulfilled, (state, action) => {
            if (action.payload) {
                state.rewardD = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getRewardD.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getTrainingLevel.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getTrainingLevel.fulfilled, (state, action) => {
            if (action.payload) {
                state.trainingLevel = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getTrainingLevel.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getContractType.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getContractType.fulfilled, (state, action) => {
            if (action.payload) {
                state.contractType = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getContractType.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getCivilServant.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getCivilServant.fulfilled, (state, action) => {
            if (action.payload) {
                state.civilServant = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getCivilServant.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getSalaryScale.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getSalaryScale.fulfilled, (state, action) => {
            if (action.payload) {
                state.salaryScale = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getSalaryScale.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getPosition.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getPosition.fulfilled, (state, action) => {
            if (action.payload) {
                state.position = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getPosition.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getRelationship.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getRelationship.fulfilled, (state, action) => {
            if (action.payload) {
                state.relationship = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getRelationship.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getTypeOfOfficer.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getTypeOfOfficer.fulfilled, (state, action) => {
            if (action.payload) {
                state.typeOfficer = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getTypeOfOfficer.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const directoryReducer = directorySlice.reducer;

export const directorySelector = (state: RootState) => state.directoryReducer;

export default directoryReducer