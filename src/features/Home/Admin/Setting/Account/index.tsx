import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AccountAction from './Action'
import AccountList from './List'

type Props = {}

const Account = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<AccountList />} />
            <Route path='/update/:key' element={<AccountAction />} />
        </Routes>
    )
}

export default Account