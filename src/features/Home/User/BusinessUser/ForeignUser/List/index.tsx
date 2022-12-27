import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store'
import { getAll, foreignUserSelector } from '../foreignUserSlice';
import styles from '../../../../Admin/PersonalManagement/Style.module.scss'
import moment from 'moment';
import ForeignUserDetail from '../Detail';
import { isNameOff } from '../../../../Admin/TrainingManagement/TrainingList';
import { CSVLink } from 'react-csv';

type Props = {}

const ForeignUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useAppDispatch();
    const { foreignsUser, authLoading } = useAppSelector(foreignUserSelector);
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role')
    useEffect(() => {
        dispatch(getAll({ keyword: '', cbId }))
    }, [cbId])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày đi',
            dataIndex: 'batDau',
            key: 'batDau',
        },
        {
            title: 'Ngày về',
            dataIndex: 'ketThuc',
            key: 'ketThuc',
        },
        {
            title: 'Quốc gia',
            dataIndex: 'quocGia',
            key: 'quocGia',
        },
        {
            title: 'Nơi đến',
            dataIndex: 'noiden',
            key: 'noiden',
        },
        {
            title: 'Passport',
            dataIndex: 'soPassport',
            key: 'soPassport',
        },
        {
            title: 'Ngành',
            dataIndex: 'nganhHoc',
            key: 'nganhHoc',
        },
        {
            title: 'Chi Phí',
            dataIndex: 'chiPhiCT',
            key: 'chiPhiCT',
        },
        {
            title: 'Phần trăm hưởng lương',
            dataIndex: 'phanTramHuongLuong',
            key: 'phanTramHuongLuong',
        },
        {
            key: 'action',
            render: (data: any, record: any) => (
                <Space size="middle">
                    <ForeignUserDetail key={record.id} data={data} cbId={cbId} />
                </Space>
            ),
        }
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Tên cán bộ", key: "tenCanBo" },
        { label: "Ngày đi", key: "batDau" },
        { label: 'Ngày về', key: 'ketThuc' },
        { label: 'Quốc gia', key: 'quocGia' },
        { label: 'Nơi đén', key: 'noiDen' },
        { label: 'Số Passport', key: 'soPassport' },
        {
            label: 'Ngành', key: 'nganhHoc'
        },
        {
            label: 'Chi Phí', key: 'chiPhiCT'
        },
        {
            label: 'Phần trăm hưởng lương', key: 'phanTramHuongLuong'
        },
    ];
    const data2 = foreignsUser.map(foreign => (
        {
            batDau: moment(foreign.ngayDi).format('DD/MM/YYYY'),
            ketThuc: moment(foreign.ngayVe).format('DD/MM/YYYY'),
            tenCanBo: isNameOff(foreign, foreign.fkMaCanBo),
            ...foreign
        }
    ))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Công tác nước ngoài
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 250, marginLeft: 20 }}
                >
                    <Typography.Text className={styles.title_item}>Từ khóa</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nhập từ khóa cần tìm'
                        style={{ borderRadius: '0.3rem', marginTop: 2 }}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                    style={{ width: 250, marginLeft: 20 }}
                >
                    <CSVLink headers={headers} data={data2} className={`${styles.btnEx} ${styles.borderBlue}`}>
                        <Typography.Text className={styles.textEx + ' ' + styles.blue}>
                            Xuất file {'(.csv)'}
                        </Typography.Text>
                    </CSVLink>
                </Form.Item>
            </Form>
            <Row>

                <Table
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : (role === 'admin' ? styles.dark : styles.blue)}
                    className={styles.table + ' header-table'}
                    dataSource={
                        foreignsUser.map(foreign => (
                            {
                                batDau: moment(foreign.ngayDi).format('DD/MM/YYYY'),
                                ketThuc: moment(foreign.ngayVe).format('DD/MM/YYYY'),
                                ...foreign
                            }
                        ))
                    }
                    columns={columns}
                    size='middle'
                    loading={authLoading}
                    pagination={{
                        pageSize: 8,
                        position: ['bottomCenter'],
                        showLessItems: true,
                        showSizeChanger: false,
                        itemRender(page, type, element) {
                            if (type === 'prev') {
                                return <CaretLeftOutlined />;
                            }
                            if (type === 'next') {
                                return <CaretRightOutlined style={{ color: '#FF993C' }} />;
                            }
                            return element;
                        },
                    }}
                />
            </Row>
        </Row>
    )
}

export default ForeignUserList