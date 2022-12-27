import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './Account'
import DailyList from './DailyManagement/DailyList'

type Props = {}

const Setting = (props: Props) => {
    return (
        <Routes>
            <Route path='/daily/*' element={<DailyList />} />
            <Route path='/account/*' element={<Account />} />
        </Routes>
    )
}

export default Setting