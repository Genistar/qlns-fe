import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "../features/Auth/userSlice";
import rewardReducer from "../features/Home/Admin/RewardManagement/rewardSlice";
import disciplineReducer from "../features/Home/Admin/DisciplineManagement/disciplineSlice";
import cultivateReducer from "../features/Home/Admin/CultivateManagement/cultivateSlice";
import businessReducer from "../features/Home/Admin/BusinessManagement/domestic/businessSlice";
import trainingReducer from "../features/Home/Admin/TrainingManagement/trainingSlice";
import foreignReducer from "../features/Home/Admin/BusinessManagement/foreign/foreignSlice";
import directoryReducer from "../slices/directorySlice";
import rewardUserReducer from "../features/Home/User/RewardUser/rewardUserSlice";
import trainingUserReducer from "../features/Home/User/TrainingUser/trainingUserSlice";
import disciplineUserReducer from "../features/Home/User/DisciplineUser/disciplineUserSlice";
import cultivateUserReducer from "../features/Home/User/CultivateUser/cultivateUserSlice";
import domesticUserReducer from "../features/Home/User/BusinessUser/DomesticUser/domesticUserSlice";
import foreignUserReducer from "../features/Home/User/BusinessUser/ForeignUser/foreignUserSlice";
import dailyReducer from "../features/Home/Admin/Setting/DailyManagement/dailySlice";
import accountReducer from "../features/Home/Admin/Setting/Account/accountSlice";
import contractReducer from "../features/Home/Admin/ContractManagement/contractSlice";
import contractUserReducer from "../features/Home/User/ContractUser/contractUserSlice";
import locationUserReducer from "../slices/locationSlice";
import familyReducer from "../features/Home/User/FamilyUser/familyUserSlice";

const store = configureStore({
    reducer: {
        userReducer,
        rewardReducer,
        disciplineReducer,
        cultivateReducer,
        businessReducer,
        trainingReducer,
        foreignReducer,
        directoryReducer,
        rewardUserReducer,
        trainingUserReducer,
        disciplineUserReducer,
        cultivateUserReducer,
        domesticUserReducer,
        foreignUserReducer,
        dailyReducer,
        accountReducer,
        contractReducer,
        contractUserReducer,
        locationUserReducer,
        familyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store