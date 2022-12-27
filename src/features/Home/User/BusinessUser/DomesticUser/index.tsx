import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DomesticUserList from './List'

type Props = {}

const DomesticUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<DomesticUserList />} />
        </Routes>
    )
}

export default DomesticUser