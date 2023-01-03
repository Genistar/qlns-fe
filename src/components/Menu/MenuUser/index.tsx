import React from 'react'
import { Button, Image, Menu, MenuProps, Typography } from 'antd';
import { ScheduleOutlined, RocketOutlined, IdcardOutlined, MoreOutlined, LogoutOutlined, ReadOutlined, SmileOutlined, FrownOutlined, HighlightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { logoutUser } from '../../../features/Auth/userSlice';
type Props = {}
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    expandIcon?: React.ReactNode,
    children?: MenuItem[],
    className?: any
): MenuItem {
    return {
        key,
        icon,
        label,
        expandIcon,
        children,
        className
    } as MenuItem;
}
const role = localStorage.getItem('role');
const userItems: MenuItem[] = [

    getItem(<Link to='/user/detail'>Thông tin cá nhân</Link>, '/user/detail', <IdcardOutlined />),

    getItem(<Link to='/user/contractuser'>Thông tin hợp đồng</Link>, '/user/contractuser', <ScheduleOutlined />),

    getItem(<Link to='/user/cultivateuser'>Quá trình bồi dưỡng</Link>, '/user/cultivateuser', <ReadOutlined />),

    getItem(<Link to='/user/traininguser'>Quá trình đào tạo</Link>, '/user/traininguser', <HighlightOutlined />),

    getItem(<Link to='/user/rewarduser'>Quá trình khen thưởng</Link>, '/user/rewarduser', <SmileOutlined />),
    getItem(<Link to='/user/disciplineuser'>Quá trình kỹ luật</Link>, '/user/disciplineuser', <FrownOutlined />),



    getItem('Quá trình công tác', 'sub5', <RocketOutlined />,
        <MoreOutlined style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }}
        />,
        [
            getItem(<Link to='/user/businessuser/domesticuser'>Trong nước</Link>, '/admin/businessuser/domesticuser'),
            getItem(<Link to='/user/businessuser/foreignuser'>Ngoài nước</Link>, '/admin/businessuser/foreignuser'),
        ])
];
const MenuUserBar: React.FC = (props: Props) => {
    const navigate = useNavigate();
    let role = localStorage.getItem('role')
    const dispatch = useAppDispatch()

    return (
        <>
            <Menu
                style={{ width: 200, color: '#7E7D88', marginTop: '40%' }}
                mode="vertical"
                items={userItems}
                color='#00FFFF'
                className={'ant-menu-user'}
            />
            <Button
                style={{
                    textAlign: 'center',
                    marginTop: '68%',
                    marginLeft: 12,
                    width: 176,
                    height: 48,
                    backgroundColor: '#CCFFFF',
                    color: '#00FFFF',
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 8
                }}
                icon={
                    <LogoutOutlined style={{ width: 20, height: 20, marginTop: -5, marginLeft: -10, paddingLeft: 0, color: '#3366CC' }} />
                }
                onClick={() => { dispatch(logoutUser()); navigate('/login') }}
                title='Đăng xuất'
            >
                <Typography.Text style={{ marginTop: -30, marginLeft: 10, paddingLeft: 10, color: '#3366CC' }}>
                    Đăng xuất
                </Typography.Text>
            </Button>
        </>

    )
}

export default MenuUserBar