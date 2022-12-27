import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RewardUserList from './RewardUserList'

type Props = {}

const RewardUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<RewardUserList />} />
        </Routes>
    )
}

export default RewardUser