import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TrainingUserList from './List'

type Props = {}

const TrainingUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<TrainingUserList />} />
        </Routes>
    )
}

export default TrainingUser