import { Form, Input, Row, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store'
import { getAll, domesticUserSelector } from '../domesticUserSlice';
import styles from '../../../../Admin/PersonalManagement/Style.module.scss'
import DomesticUserDetail from '../Detail';
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../../Admin/TrainingManagement/TrainingList';

type Props = {}

const DomesticUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const dispatch = useAppDispatch();
    const { domesticsUser, authLoading } = useAppSelector(domesticUserSelector);
    let role = localStorage.getItem('role');
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword: keyword, cbId }))
    }, [cbId])
    console.log(domesticsUser)
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
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
            render: (data: any, record: any) => (
                <Space size="middle">
                    <DomesticUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
                </Space>
            ),
        }
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Tên cán bộ", key: "tenCanBo" },
        { label: "Thời gian", key: "thoiGianCT" },
        { label: 'Chức vụ', key: 'chucVu' },
        { label: 'Đơn vị', key: 'donViCT' },
        { label: 'Chuyên môn', key: 'chuyenMon' }
    ];
    const data2 = domesticsUser.map((busi, index) => ({
        stt: index + 1,
        tenCanBo: isNameOff(busi, busi.fkMaCanBo),
        ...busi
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách công tác trong nước
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
                <Form.Item className={styles.addButton}>
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
                        domesticsUser.map((d, index) => ({
                            stt: index + 1,
                            ...d
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

export default DomesticUserList