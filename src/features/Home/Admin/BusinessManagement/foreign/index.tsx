import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BusinessAction from './ForeignAction'
import BusinessDetail from './ForeignDetail'
import BusinessList from './ForeignList'

type Props = {}

const Foreign = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<BusinessList />} />
            <Route path='/:key' element={<BusinessDetail />} />
            <Route path='/add' element={<BusinessAction />} />
            <Route path='/update/:key' element={<BusinessAction />} />
        </Routes>
    )
}

export default Foreign