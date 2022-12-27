import React, { memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import ContractDetail from './Detail'

type Props = {}

const ContractUser = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<ContractDetail />} />
        </Routes>
    )
}

export default memo(ContractUser)