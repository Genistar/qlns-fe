import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisciplineAction from './DisciplineAction'
import DisciplineDetail from './DisciplineDetail'
import DisciplineList from './DisciplineList'

type Props = {}

const DisciplineManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<DisciplineList />} />
            <Route path='/:key' element={<DisciplineDetail />} />
            <Route path='/add' element={<DisciplineAction />} />
            <Route path='/update/:key' element={<DisciplineAction />} />
        </Routes>
    )
}

export default DisciplineManagement