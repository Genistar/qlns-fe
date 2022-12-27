import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RewardAction from './RewardAction'
import RewardDetail from './RewardDetail'
import RewardList from './RewardList'

type Props = {}

const RewardManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<RewardList />} />
            <Route path='/:key' element={<RewardDetail />} />
            <Route path='/add' element={<RewardAction />} />
            <Route path='/update/:key' element={<RewardAction />} />
        </Routes>
    )
}

export default RewardManagement