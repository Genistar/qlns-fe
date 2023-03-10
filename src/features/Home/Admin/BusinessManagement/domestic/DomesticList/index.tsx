
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getAll, businessSelector, deleteBusiness, removeBusiness } from '../businessSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import Delete from '../../../../../../components/button/Delete';
import Update from '../../../../../../components/button/Update';
import Detail from '../../../../../../components/button/Detail';

type Props = {}



const DomesticList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const dispatch = useAppDispatch();
    const { businesss, authLoading } = useAppSelector(businessSelector);
    const { users } = useAppSelector(userSelector)
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword }));
        dispatch(getUsers())
    }, [keyword])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên Cán bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'Thời gian',
            dataIndex: 'thoiGianCT',
            key: 'thoiGianCT',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'chucVu',
            key: 'chucVu',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'donViCT',
            key: 'donViCT',
        },
        {
            title: 'Chuyên môn',
            dataIndex: 'chuyenMon',
            key: 'chuyenMon',
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Detail link={`/admin/businessmanagement/domestic/${record.id}`} id={record.id} />
                        <Update link={`/admin/businessmanagement/domestic/update/${record.id}`} id={record.id} />
                        <Delete
                            title='Công tác trong nước'
                            id={record.id}
                            removeAction={removeBusiness}
                            deleteAction={deleteBusiness}
                            dailyName='Thông tin công tác trong nước'
                        />
                    </Space>
                )
            }
        },
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Tên cán bộ", key: "tenCanBo" },
        { label: "Thời gian", key: "thoiGianCT" },
        { label: 'Chức vụ', key: 'chucVu' },
        { label: 'Đơn vị', key: 'donViCT' },
        { label: 'Chuyên môn', key: 'chuyenMon' }
    ];
    const data2 = businesss.map((busi, index) => ({
        stt: index + 1,
        tenCanBo: isNameOff(users, busi.fkMaCanBo),
        ...busi
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Công tác trong nước
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350, marginLeft: 550 }}
                >
                    <Typography.Text className={styles.title_item}>Từ khóa</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nhập từ khóa cần tìm'
                        style={{ borderRadius: '0.3rem', marginTop: 2, height: 44 }}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                >
                    <Button className={styles.button}>
                        <Link to={'/admin/businessmanagement/domestic/add'} style={{ height: 44 }}>Thêm công tác</Link>
                    </Button>
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                >
                    <CSVLink headers={headers} data={data2} className={styles.btnEx}>
                        <Typography.Text className={styles.textEx}>
                            Xuất file {'(.csv)'}
                        </Typography.Text>
                    </CSVLink>
                </Form.Item>
            </Form>
            <Row>

                <Table
                    rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.dark}
                    className={styles.table}
                    dataSource={
                        businesss.map((busi, index) => ({
                            stt: index + 1,
                            tenCanBo: isNameOff(users, busi.fkMaCanBo),
                            ...busi
                        }))
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
export default DomesticList