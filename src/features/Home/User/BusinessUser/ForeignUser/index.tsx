import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForeignUserList from './List'

type Props = {}

const ForeinUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<ForeignUserList />} />
        </Routes>
    )
}

export default ForeinUser