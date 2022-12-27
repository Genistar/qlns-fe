import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DisciplineUserList from './List'

type Props = {}

const DisciplineUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<DisciplineUserList />} />
        </Routes>
    )
}

export default DisciplineUser