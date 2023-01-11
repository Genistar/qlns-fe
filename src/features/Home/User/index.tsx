import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BusinessUser from './BusinessUser'
import ContractUser from './ContractUser'
import CultivateUser from './CultivateUser'
import DetailUser from './DetailUser'
import DisciplineUser from './DisciplineUser'
import RewardUser from './RewardUser'
import TrainingUser from './TrainingUser'

type Props = {}

const UserPage = (props: Props) => {
    return (
        <Routes>
            <Route path='/detail' element={<DetailUser />} />
            <Route path='/detail' element={<DetailUser />} />
            <Route path='/rewarduser/*' element={<RewardUser />} />
            <Route path='/cultivateuser/*' element={<CultivateUser />} />
            <Route path='/businessuser/*' element={<BusinessUser />} />
            <Route path='/disciplineuser/*' element={<DisciplineUser />} />
            <Route path='/traininguser/*' element={<TrainingUser />} />
            <Route path='/contractuser/*' element={<ContractUser />} />
        </Routes>
    )
}

export default UserPage