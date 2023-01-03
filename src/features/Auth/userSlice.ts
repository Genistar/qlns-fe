import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constant/token";
import { can_bo_giang_day, Can_bo_giang_day } from "../../interface";
import { iFilter } from "../../interface/filter";
import { RootState } from "../../store/store";


export interface defaultState {
    authLoading: boolean;
    userId: string;
    role: string | undefined;
    userLogin: {
        errCode: number,
        message: string,
        user: Can_bo_giang_day | null
    };
    user: can_bo_giang_day | null;
    users: can_bo_giang_day[];
    userName: string;
    avatar: string;
    message: {
        fail: boolean;
        text: string | undefined;
    };
}

const initialState: defaultState = {
    users: [],
    user: null,
    authLoading: false,
    role: '',
    userName: '',
    userLogin: {
        errCode: 0,
        message: '',
        user: null
    },
    userId: '',
    avatar: '',
    message: {
        fail: false,
        text: ''
    }
}

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }: { username: string, password: string }, thunkAPI) => {
        try {
            let user: {
                errCode: number,
                message: string,
                user: Can_bo_giang_day | null,
                token: string
            };
            const response = await axios({
                method: 'POST',
                url: '/login',
                data: {
                    username: username,
                    password: password
                },
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
            });
            user = await response
            localStorage.setItem('role', response.user.role)
            localStorage.setItem('cbId', response.user.cbId)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, user.token)
            return user
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const getUser = createAsyncThunk('user/getUserByID',
    async (id?: string | null, thunkAPI?: any) => {
        try {
            let user: any;
            const response = await axios({
                method: 'GET',
                url: `/api/officer/${id}`,
                data: null,
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
            });
            user = await response;
            return user
        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
)
export const getAll = createAsyncThunk('user/getAll',
    async (filter?: iFilter, thunkAPI?: any) => {
        try {
            let users: any;
            const response = await axios({
                method: 'GET',
                url: '/api/officer',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            users = await response;
            if (filter) {
                if (filter.academicRank != null) {
                    users = users.filter(
                        (user: any) => user.ma_hoc_ham == filter.academicRank
                    )
                }

                if (filter.degree !== null) {
                    users = users.filter(
                        (user: any) => user.ma_hoc_vi === filter.degree
                    )
                }

                if (filter.keyword != '') {
                    const users = await response.filter((user: any) =>
                        user.ho.toLowerCase().includes(filter.keyword?.toLowerCase()) ||
                        user.ten.toLowerCase().includes(filter.keyword?.toLowerCase())
                    )
                    return users
                }
                return users
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const getUsers = createAsyncThunk('user/getUsers',
    async (_, thunkAPI?: any) => {
        try {
            let users: any;
            const response = await axios({
                method: 'GET',
                url: '/api/officer',
                data: null,

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            users = await response;
            return users

        } catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }

    }
)
export const deleteUser = createAsyncThunk('user/deleteUser',
    async (id: string | null, thunkAPI?: any) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `/api/officer/${id}`,
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
export const addPersonal = createAsyncThunk('user/addPersonal',
    async (value: any, thunkAPI) => {
        try {
            const response = await axios({
                method: 'POST',
                url: '/api/officer',
                data: value,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response

        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    }
)
export const updatePersonal = createAsyncThunk('user/updateUser',
    async (value: any, thunkAPI) => {
        try {
            console.log(value)
            const response = await axios({
                method: 'PUT',
                url: '/api/officer',
                data: value,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res: AxiosResponse<any, any>) => { return res.data }).catch((err: any) => {
                console.log(err)
            });
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue({ e })
        }
    }
)
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeUser: (state, action) => {
            let { id } = action.payload;
            console.log(id)
            let result = state.users.findIndex((user) => user.id === id);
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.users.splice(result, 1);
        },
        logoutUser: (state) => {
            localStorage.removeItem("role");
            localStorage.removeItem("cbId");
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            state.userLogin = {
                errCode: 0,
                message: '',
                user: null,
            };
        },
        getNameUser: (state, action) => {
            let id = localStorage.getItem('cbId');
            let result = state.users.find(data => data.id === id)?.ho + ' ' + state.users.find(data => data.id === id)?.ten;
            // let i = state.users.findIndex((user) => user.can_bo_giang_day.id === id);
            state.userName = result
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.authLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.message.fail = false;
                state.userLogin.user = action.payload.user;
                state.message.text = 'Đăng nhập thành công';
            } else {
                state.message.fail = true;
                state.userLogin.user = null
                state.message.text = 'Sai tài khoản hoặc mật khẩu';
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.userLogin.user = null;
            state.authLoading = false;
        });
        builder.addCase(getAll.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            if (action.payload) {
                state.users = action.payload;
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
        builder.addCase(getUsers.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            if (action.payload) {
                state.users = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
        builder.addCase(getUser.pending, (state, action) => {
            state.authLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.message.fail = false;
                state.message.text = "";
            } else {
                state.message.fail = true;
                state.message.text = "Đã xảy ra lỗi !";
            }
            state.authLoading = false;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.message.fail = true;
            state.message.text = action.error.message;
            state.authLoading = false;
        });
    }
})

const userReducer = userSlice.reducer;
export const { removeUser, logoutUser, getNameUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.userReducer;

export default userReducer