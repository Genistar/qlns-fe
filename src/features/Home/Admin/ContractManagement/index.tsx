import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContractAction from './ContractAction'
import ContractDetail from './ContractDetail'
import ContractList from './ContractList'

type Props = {}

const ContractManagement = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<ContractList />} />
            <Route path='/:key' element={<ContractDetail />} />
            <Route path='/add' element={<ContractAction />} />
            <Route path='/update/:key' element={<ContractAction />} />
        </Routes>
    )
}

export default ContractManagement