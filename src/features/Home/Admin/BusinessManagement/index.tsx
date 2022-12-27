import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Domestic from './domestic'
import Foreign from './foreign'

type Props = {}

const BusinessManagement = (props: Props) => {
    return (
        <Routes>
            <Route path="/domestic/*" element={<Domestic />} />
            <Route path="/foreign/*" element={<Foreign />} />
        </Routes>
    )
}

export default BusinessManagement