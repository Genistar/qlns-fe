import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DomesticAction from './DomesticAction'
import DomesticDetail from './DomesticDetail'
import DomesticList from './DomesticList'

type Props = {}

const Domestic = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<DomesticList />} />
            <Route path='/:key' element={<DomesticDetail />} />
            <Route path='/add' element={<DomesticAction />} />
            <Route path='/update/:key' element={<DomesticAction />} />
        </Routes>
    )
}

export default Domestic