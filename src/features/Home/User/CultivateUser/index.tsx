import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CultivateUserList from './CultivateUserList'

type Props = {}

const CultivateUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<CultivateUserList />} />
        </Routes>

    )
}

export default CultivateUser