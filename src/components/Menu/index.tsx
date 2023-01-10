import React, { memo } from 'react'
import { useLocation } from 'react-router-dom';
import MenuBar from './MenuAdmin';
import MenuUserBar from './MenuUser';

type Props = {}

const MenuRoutes = (props: Props) => {
    let location = useLocation()
    if (location.pathname.slice(1, 6) === 'admin' && localStorage.getItem('role') !== '5') {
        return (
            <MenuBar />
        )
    } else {
        return (
            <MenuUserBar />
        )
    }

}

export default memo(MenuRoutes)