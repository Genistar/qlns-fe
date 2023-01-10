import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './Admin';
import Dashboard from './Dashboard/index';
import UserPage from './User';

type Props = {}

const HomeRoutes = (props: Props) => {
    let role = localStorage.getItem('role');
    if (role !== '5') {
        return (
            <Routes>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/user/*' element={<UserPage />} />
                <Route path='/admin/*' element={<AdminPage />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/user' element='Home' />
                <Route path='/user/*' element={<UserPage />} />
            </Routes>
        )
    }

}

export default HomeRoutes