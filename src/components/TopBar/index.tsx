import { Avatar, Breadcrumb, Button, Image, PageHeader, Typography } from 'antd';
import { BellOutlined, RightOutlined } from '@ant-design/icons'
import React, { Fragment, useMemo, memo, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { routesAdmin, routesUser } from '../../constant/route';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { userSelector, getNameUser, getUsers, getUser } from '../../features/Auth/userSlice';
import { imageOff, isNameOff } from '../../features/Home/Admin/TrainingManagement/TrainingList';

type Props = {}
const breadcrumbNameMap: Record<string, string> = {
    "/admin/personalmanagementF": "Nhân sự",
    '/admin/businessmanagement/domesticF': 'Công tác trong nước',
    '/admin/businessmanagement/foreignF': 'Công tác ngoài nước',
    '/admin/trainingmanagementF': 'Bồi dưỡng',
    '/admin/rewardmanagementF': 'Khen thưởng',
    '/admin/disciplinemanagementF': 'Kỹ luật',
    '/admin/cultivatemanagementF': 'Đào tạo',
    '/admin/contractmanagementF': 'Hợp đồng',
    '/admin/setting/accountF': 'Cài đặt',
    '/admin/setting/dailyF': 'Cài đặt',

};
const breadcrumbUserMap: Record<string, string> = {
    "/user/detailF": "Thông tin cá nhân",
    '/user/businessuser/domesticuserF': 'Công tác trong nước',
    '/user/businessuser/foreignuserF': 'Công tác ngoài nước',
    '/user/traininguserF': 'Bồi dưỡng',
    '/user/rewarduserF': 'Khen thưởng',
    '/user/disciplineuserF': 'Kỹ luật',
    '/user/cultivateuserF': 'Đào tạo',
    '/user/contractuserF': 'Hợp đồng',

};
const TopBar = (props: Props) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { users, user } = useAppSelector(userSelector);
    let role = localStorage.getItem('role');
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getUser(cbId))
    }, [])
    const breadcrumbs = useBreadcrumbs(location.pathname.slice(1, 6) === 'admin' ? routesAdmin : routesUser, { disableDefaults: true });
    const extraBreadcrumbItems = breadcrumbs.map(
        ({ match, breadcrumb }, index) => {
            if (match.route?.props?.root) {
                return (
                    <Fragment key={index}>
                        <Breadcrumb.Item>
                            <Link to={match.pathname}>
                                {location.pathname.slice(1, 6) === 'admin' ? breadcrumbNameMap[match.pathname + "F"] : breadcrumbUserMap[match.pathname + "F"]}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={match.pathname}>{breadcrumb}</Link>
                        </Breadcrumb.Item>
                    </Fragment>
                );
            }

            if (match.route?.props?.isNotLink) {
                return (
                    <Breadcrumb.Item key={match.pathname}>
                        {breadcrumb}
                    </Breadcrumb.Item>
                );
            }
            return (
                <Breadcrumb.Item key={match.pathname}>
                    <Link to={match.pathname}>{breadcrumb}</Link>
                </Breadcrumb.Item>
            );
        }
    );

    const breadcrumbItems = useMemo(
        () =>
            location.pathname === "/admin/dashboard"
                ? [
                    <Breadcrumb.Item key="home">
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>,
                ]
                : extraBreadcrumbItems,
        [location, extraBreadcrumbItems]
    );
    return (
        <PageHeader
            style={{ position: 'absolute', zIndex: 1 }} extra={[
                <div>
                    <Breadcrumb separator={<RightOutlined size={12} />}>{breadcrumbItems}</Breadcrumb>

                </div>
                ,
                < div style={{ position: 'absolute', display: 'flex', left: 1034, top: 14 }}>
                    <Button
                        icon={<BellOutlined />}
                        style={{
                            backgroundColor: `${role === 'admin' ? '#FFF2E7' : '#c6fffc'}`,
                            width: 40, height: 40, borderRadius: '100%',
                        }}
                    />
                    <Avatar
                        size={40}
                        icon={<Image
                            preview={false}
                            width={40}
                            src={imageOff(users, cbId)}
                        />}
                        style={{ marginLeft: 10 }}
                    />
                    <Link to='/user/detail' >
                        <Typography.Text style={{ fontSize: 12, marginTop: -3, color: '#7E7D88' }}>
                            Xin chào <br />
                            <Typography.Text style={{ fontSize: 16, fontWeight: 700, marginTop: -3, color: '#535261' }}>{isNameOff(users, cbId)}</Typography.Text>
                        </Typography.Text>
                    </Link>
                </div>
            ]}
        />
    )
}

export default memo(TopBar)