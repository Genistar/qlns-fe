import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoleAction from './RoleAction'
import RoleDetail from './RoleDetail'
import RoleList from './RoleList'

type Props = {}

const RoleManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<RoleList />} />
            <Route path='/:key' element={<RoleDetail />} />
            <Route path='/add' element={<RoleAction />} />
            <Route path='/update/:key' element={<RoleAction />} />
        </Routes>
    )
}

export default RoleManagement