import React, { memo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import homes from './Home.module.scss'
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import HomeRoutes from './Home';
import MenuRoutes from '../../components/Menu/index';

var { Sider, Header, Content, Footer } = Layout;
type Props = {}

const Home = (props: Props) => {
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role');
    let location = useLocation()
    if (role && cbId) {
        return (
            <Layout style={{
                minHeight: '100vh',
            }}>
                <Sider style={{ backgroundColor: '#fff' }}>
                    <Link to='/admin' className={homes.logo}>
                        Logo
                    </Link>
                    {/* <MenuBar /> */}
                    <MenuRoutes />
                </Sider>
                <Layout className={homes.siteLayout} style={{ backgroundColor: '#f0f2f5' }}>
                    <Header
                        style={{
                            padding: 0,
                            backgroundColor: '#f0f2f5',
                        }}
                    >
                        <TopBar />
                    </Header>
                    <Content style={{ margin: '11% 4%' }}>
                        <HomeRoutes />
                    </Content>
                    <Footer></Footer>
                </Layout>
            </Layout>

        )
    } else {
        return <Navigate to='/login' />
    }

}

export default memo(Home)