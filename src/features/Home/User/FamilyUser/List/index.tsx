import { Form, Input, Row, Space, Table, Typography, message as notice, Col, Button } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { getAll, familySelector, removeFamily, deleteFamily } from '../familyUserSlice';
import styles from '../family.module.scss'
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../Admin/TrainingManagement/TrainingList';
import { family } from '../../../../../interface/family';
import FamilyUserDetail from '../Action';
import Delete from '../../../../../components/button/Delete';

type Props = {}

const FamilyUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const dispatch = useAppDispatch();
    const { familys, authLoading } = useAppSelector(familySelector);
    let role = localStorage.getItem('role');
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ cbId }))
    }, [cbId])
    console.log(familys)
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên',
            dataIndex: 'hovaten',
            key: 'hovaten',
        },
        {
            title: 'Quê quán',
            dataIndex: 'queQuan',
            key: 'queQuan',
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'ngheNghiep',
            key: 'ngheNghiep',
        },
        {
            title: 'Đơn vị công tác',
            dataIndex: 'donViCongTacHocTap',
            key: 'donViCongTacHocTap',
        },
        {
            title: 'Nơi ở',
            dataIndex: 'noiO',
            key: 'noiO'
        },
        {
            title: 'Quan hệ',
            dataIndex: 'quanHe',
            key: 'quanHe'
        },
        {
            key: 'action',
            render: (data: any, record: any) => (
                <Space size="middle">
                    <Delete
                        id={record.id}
                        title='quan hệ gia đình'
                        removeAction={removeFamily}
                        deleteAction={deleteFamily}
                        dailyName={`mối quan hệ Tên: ${data.hovaten}, Mối quan hệ: ${data.Quan_he.tenQuanHe}`}
                    />
                    <FamilyUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
                </Space>
            ),
        }
    ];
    const headers = [
        { label: "STT", key: "stt" },
        { label: "Tên", key: "hovaten" },
        { label: "Quê quán", key: "queQuan" },
        { label: 'Nghề nghiệp', key: 'ngheNghiep' },
        { label: 'Đơn vị công tác', key: 'donViCongTacHocTap' },
        { label: 'Nơi ở', key: 'noiO' },
        { label: 'Quan hệ', key: 'quanHe' }
    ];
    const data2 = familys.map((data: family, index) => ({
        stt: index + 1,
        quanHe: data.Quan_he?.tenQuanHe,
        ...data
    }))
    return (
        <Row>
            <Form
                layout='inline'
            >
                <Form.Item
                    className={styles.addButton}
                >
                    <FamilyUserDetail label='Thêm' cbId={cbId} style={styles.button} />
                </Form.Item>
                <Form.Item className={styles.addButton}>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx}>
                        <Typography.Text className={styles.textEx}>
                            Xuất file {'(.csv)'}
                        </Typography.Text>
                    </CSVLink>
                </Form.Item>

            </Form>
            <Row>
                <Col span={24}>
                    <Table
                        rowClassName={(record: any, index: any) => index % 2 === 0 ? styles.light : styles.blue}
                        dataSource={
                            familys.map((data: family, index) => ({
                                stt: index + 1,
                                quanHe: data.Quan_he?.tenQuanHe,
                                ...data
                            }))
                        }
                        className={'header-table'}
                        columns={columns}
                        size='small'
                        loading={authLoading}
                        pagination={{
                            pageSize: 4,
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
                </Col>

            </Row>
        </Row>
    )
}

export default FamilyUserList