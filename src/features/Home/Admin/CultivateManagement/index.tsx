import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CultivateAction from './CultivateAction'
import CultivateDetail from './CultivateDetail'
import CultivateList from './CultivateList'

type Props = {}

const CultivateManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<CultivateList />} />
            <Route path='/:key' element={<CultivateDetail />} />
            <Route path='/add' element={<CultivateAction />} />
            <Route path='/update/:key' element={<CultivateAction />} />
        </Routes>
    )
}

export default CultivateManagement