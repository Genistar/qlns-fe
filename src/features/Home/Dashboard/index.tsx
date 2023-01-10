import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import { SolutionOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { Pie, Column } from '@ant-design/plots';
import React, { useEffect } from 'react';
import styles from './Dashboard.module.scss'
import CardContent from './components/CardContent';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getUsers, userSelector } from '../../Auth/userSlice';
import moment from 'moment';
import { contractSelector, getAll as getContracts } from '../Admin/ContractManagement/contractSlice';
import { daysdifference } from '../../../utils/getDate';
import { Link } from 'react-router-dom';
import { getAge } from '../../../utils/getAge';

type Props = {}
const iconCardStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60px',
    width: '60px',
    fontSize: '24px',
    borderRadius: '50%',
};
const Dashboard = (props: Props) => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { contracts } = useAppSelector(contractSelector)
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getContracts({ userOption: null, contractDi: null, keyword: '' }))
    }, []);

    let now = new Date()
    let newUser = users.filter((data) => (moment(data.ngay_vao_truong).year() === now.getFullYear()));
    let contract1 = contracts.filter(data => (
        daysdifference(moment(data.hdDenNgay).toDate().getTime(), now.getTime()) < 30
        && daysdifference(moment(data.hdDenNgay).toDate().getTime(), now.getTime()) > 7
    ))
    let contract2 = contracts.filter(data => (
        daysdifference(moment(data.hdDenNgay).toDate().getTime(), now.getTime()) < 7
    ));
    const data = [
        {
            type: '2013',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2013)).length,
        },
        {
            type: '2014',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2014)).length,
        },
        {
            type: '2015',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2015)).length,
        },
        {
            type: '2016',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2016)).length,
        },
        {
            type: '2017',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2017)).length,
        },
        {
            type: '2018',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2018)).length,
        },
        {
            type: '2019',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2019)).length,
        },
        {
            type: '2020',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2020)).length,
        },
        {
            type: '2021',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2021)).length,
        },
        {
            type: '2022',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2022)).length,
        },
        {
            type: '2023',
            sales: users.filter((data) => (moment(data.ngay_vao_truong).year() === 2023)).length,
        },
    ];
    const data2 = [
        {
            type: 'Dưới 40 tuổi',
            value: users.filter((data) => getAge(now.getFullYear(), moment(data.ngay_sinh).year()) <= 40).length,
        },
        {
            type: 'Trên 40 tuổi',
            value: users.filter((data) => getAge(now.getFullYear(), moment(data.ngay_sinh).year()) > 40).length,
        }
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        width: 400,
        height: 300,
        autofit: true,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Năm',
            },
            sales: {
                alias: 'Số người',
            },
        },
    };
    const config2 = {
        appendPadding: 10,
        data: data2,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        width: 400,
        height: 400,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <Row className={styles["container"]}>
            <Typography.Title className={styles["title"]} level={3}>
                Thống kê cán bộ trong trường
            </Typography.Title>
            <Col>
                <Row className={styles["first"]}>
                    <Col span={6}>
                        <Link to='/admin/personalmanagement'>
                            <CardContent
                                icon={
                                    <TeamOutlined
                                        style={{
                                            ...iconCardStyle,
                                            backgroundColor:
                                                'rgba(100, 147, 249, 0.2)',
                                            color: '#6493F9',
                                        }}
                                    />
                                }
                                title={'Tổng số nhân sự'}
                                number={users.length}
                                tag={{
                                    color: '#FF9138',
                                    number: 32.41,
                                }}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to='/admin/personalmanagement'>
                            <CardContent
                                icon={
                                    <UserAddOutlined
                                        style={{
                                            ...iconCardStyle,
                                            backgroundColor:
                                                '#CCFFCC',
                                            color: '#35C75A',
                                        }}
                                    />
                                }
                                title={'Số nhân sự mới vào trong năm'}
                                number={newUser.length}
                                tag={{
                                    color: '#FF9138',
                                    number: 32.41,
                                }}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to='/admin/contractmanagement'>
                            <CardContent
                                icon={
                                    <SolutionOutlined
                                        style={{
                                            ...iconCardStyle,
                                            backgroundColor:
                                                'rgb(255,140,0,0.2)',
                                            color: 'rgb(255,140,0)',
                                        }}
                                    />
                                }
                                title={'Số hợp đồng gần hết hạn'}
                                number={contract1.length}
                                tag={{
                                    color: '#FF9138',
                                    number: 32.41,
                                }}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to='/admin/contractmanagement'>
                            <CardContent
                                icon={
                                    <SolutionOutlined
                                        style={{
                                            ...iconCardStyle,
                                            backgroundColor:
                                                'rgb(255,0,0,0.2)',
                                            color: 'rgb(255,0,0)',
                                        }}
                                    />
                                }
                                title={'Số hợp đồng sắp hết hạn'}
                                number={contract2.length}
                                tag={{
                                    color: '#FF9138',
                                    number: 32.41,
                                }}
                            />
                        </Link>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row className={styles['second']}>
                    <Col span={6} style={{ width: '25%' }}>
                        <Card className={styles['pie-chart']}>
                            <Typography.Title className={styles['text']}>Độ tuổi cán bộ</Typography.Title>
                            <div>
                                <Pie {...config2} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={16} style={{ width: '75%' }}>
                        <Card className={styles['area-chart']}>
                            <Typography.Title className={styles['text']}>Biểu đồ hiển thị số cán bộ đã vào trong 10 năm gần đây</Typography.Title>
                            <div>
                                <Column {...config} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Dashboard