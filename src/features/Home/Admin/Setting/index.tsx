import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './Account'
import DailyList from './DailyManagement/DailyList'
import RoleManagement from './RoleManagement'

type Props = {}

const Setting = (props: Props) => {
    return (
        <Routes>
            <Route path='/daily/*' element={<DailyList />} />
            <Route path='/account/*' element={<Account />} />
            <Route path='/role/*' element={<RoleManagement />} />
        </Routes>
    )
}

export default Setting