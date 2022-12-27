import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DomesticUser from './DomesticUser'
import ForeinUser from './ForeignUser'

type Props = {}

const BusinessUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/domesticuser/*' element={<DomesticUser />} />
            <Route path='/foreignuser/*' element={<ForeinUser />} />
        </Routes>
    )
}

export default BusinessUser