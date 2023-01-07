import React, { memo } from 'react'
import { Button, Image, Menu, MenuProps, Typography } from 'antd';
import { AppstoreOutlined, RocketOutlined, SettingOutlined, MoreOutlined, FormOutlined, HighlightOutlined, SmileOutlined, FrownOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { logoutUser } from '../../../features/Auth/userSlice';
import styles from '../../Style.module.scss'
var logoutImage = require('../../../assets/logout.png');
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
const items: MenuItem[] = [
    getItem(<Link to='/admin/dashboard'>Dashboard</Link>, '/admin/dashboard', <AppstoreOutlined />, styles.antMenu),

    getItem(<Link to='/admin/personalmanagement'>Quản lý nhân sự</Link>, '/admin/personalmanagement', <UserOutlined />),
    getItem(<Link to='/admin/trainingmanagement'>Quản lý đào tạo</Link>, '/admin/trainingmanagement', <HighlightOutlined />),
    getItem(<Link to='/admin/rewardmanagement'>Quản lý khen thưởng</Link>, '/admin/rewardmanagement', <SmileOutlined />),
    getItem(<Link to='/admin/disciplinemanagement'>Quản lý kỹ luật</Link>, '/admin/disciplinemanagement', <FrownOutlined />),
    getItem(<Link to='/admin/cultivatemanagement'>Quản lý bồi dưỡng</Link>, '/admin/cultivatemanagement', <ReadOutlined />),
    getItem(<Link to='/admin/contractmanagement'>Quản lý hợp đồng</Link>, '/admin/contractmanagement', <FormOutlined />),
    getItem('Quá trình công tác', 'sub5', <RocketOutlined />,
        <MoreOutlined style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }}
        />,
        [
            getItem(<Link to='/admin/businessmanagement/domestic'>Trong nước</Link>, '/admin/businessmanagement/domestic'),
            getItem(<Link to='/admin/businessmanagement/foreign'>Ngoài nước</Link>, '/admin/businessmanagement/foreign'),
        ]),

    getItem('Cài đặt hệ thống', 'sub6', <SettingOutlined />,
        <MoreOutlined style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)'
        }}
        />,
        [
            getItem(<Link to='/admin/setting/account'>Quản lý tài khoản</Link>, '/admin/setting/account'),
            getItem(<Link to='/admin/setting/role'>Quản lý vai trò</Link>, '/admin/setting/role'),
            getItem(<Link to='/admin/setting/daily'>Nhật ký người dùng</Link>, '/admin/setting/daily')
        ]),
];
const MenuBar: React.FC = (props: Props) => {
    const navigate = useNavigate();
    let role = localStorage.getItem('role')
    const dispatch = useAppDispatch()

    return (
        <>
            <Menu
                style={{ width: 200, color: '#7E7D88', marginTop: '40%' }}
                mode="vertical"
                items={items}
                color='#00FFFF'
                className={'ant-menu'}
            />
            <Button
                style={{
                    textAlign: 'center',
                    marginTop: '50%',
                    marginLeft: 12,
                    width: 176,
                    height: 48,
                    backgroundColor: '#FFF2E7',
                    color: '#FF7506',
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 8
                }}
                icon={

                    <Image src={logoutImage} style={{ width: 20, height: 20, marginTop: -5, marginLeft: -60 }} />
                }
                onClick={() => { dispatch(logoutUser()); navigate('/login') }}
                title='Đăng xuất'
            >
                <Typography.Text style={{ marginTop: -3, marginLeft: 0, paddingLeft: 0, color: '#FF7506' }}>
                    Đăng xuất
                </Typography.Text>
            </Button>
        </>

    )
}

export default memo(MenuBar)