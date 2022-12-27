import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PersonalAction from './PersonalAction'
import PersonalDetail from './PersonalDetail'
import PersonalList from './PersonalList'

type Props = {}

const PersonalManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<PersonalList />} />
            <Route path='/:key' element={<PersonalDetail />} />
            <Route path='/add' element={<PersonalAction />} />
            <Route path='/update/:key' element={<PersonalAction />} />
        </Routes>
    )
}

export default PersonalManagement