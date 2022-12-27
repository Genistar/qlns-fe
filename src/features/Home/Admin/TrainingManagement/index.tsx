import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TrainingAction from './TrainingAction'
import TrainingDetail from './TrainingDetail'
import TrainingList from './TrainingList'

type Props = {}

const TrainingManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<TrainingList />} />
            <Route path='/:key' element={<TrainingDetail />} />
            <Route path='/add' element={<TrainingAction />} />
            <Route path='/update/:key' element={<TrainingAction />} />
        </Routes>
    )
}

export default TrainingManagement