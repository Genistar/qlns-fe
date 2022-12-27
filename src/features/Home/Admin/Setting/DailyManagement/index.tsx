import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisciplineAction from './DailyAction'
import DisciplineList from './DailyList'

type Props = {}

const DailyManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<DisciplineList />} />
            <Route path='/add' element={<DisciplineAction />} />
            <Route path='/update/:key' element={<DisciplineAction />} />
        </Routes>
    )
}

export default DailyManagement