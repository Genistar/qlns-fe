
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import SelectItem from '../../../../../../components/Select/index'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getAll, dailySelector, removeDaily, deleteDaily } from '../dailySlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { statusOption } from '../../../../../../constant/selectOption';
import Delete from '../../../../../../components/button/Delete';

type Props = {}



const DailyList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [hDDi, setHDDi] = useState(null);
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { dailys, authLoading } = useAppSelector(dailySelector);
    const { users } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: officer, hd: hDDi }));
        dispatch(getUsers())
    }, [keyword, officer, hDDi])
    const onDelete = (id: string) => {

        dispatch(removeDaily({ id }))
        dispatch(deleteDaily(id)).then((res: any) => {
            if (res.payload.errCode === 0) {
                notice.success(res.payload.errMessage)
            }
            else {
                notice.error(res.payload.errMessage)
            }
        })
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'ten_hoat_dong',
            key: 'ten_hoat_dong',
        },
        {
            title: 'Tên Cán Bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'Nội dung',
            dataIndex: 'noiDung',
            key: 'noiDung',
        },
        {
            title: 'Thời gian',
            dataIndex: 'hoatDong',
            key: 'hoatDong',
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Delete title='nhật ký' id={record.id} onDelete={onDelete} />
                    </Space>
                )
            }
        },
    ];
    const headers = [
        {
            label: 'STT',
            key: 'stt',
        },
        {
            label: 'Tên Hoạt Động',
            key: 'ten_hoat_dong',
        },
        {
            label: 'Hoạt động',
            key: 'tenHoatDong',
        },
        {
            label: 'Nội dung',
            key: 'noiDung',
        },
        {
            label: 'Thời gian',
            key: 'hoatDong',
        }
    ];
    const data2 = dailys.map((daily, index) => ({
        stt: index + 1,
        tenCanBo: isNameOff(users, daily?.fkMaCanBo),
        hoatDong: moment(daily?.createAt).format('HH:mm DD-MM-YYYY'),
        ...daily
    }))
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách nhật ký
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn họat động</Typography.Text>
                    <Select
                        placeholder='Chọn hoạt động'
                        className={styles.cardFormInput}
                        onChange={(e) => { setHDDi(e) }}
                        options={statusOption}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn tên cán bộ</Typography.Text>
                    <Select
                        placeholder='Chọn tên cán bộ'
                        className={styles.cardFormInput}
                        onChange={(e) => { setOfficer(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {userOption}
                    </Select>
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
                        dailys.map((daily, index) => ({
                            stt: index + 1,
                            tenCanBo: isNameOff(users, daily?.fkMaCanBo),
                            hoatDong: moment(daily?.createAt).format('HH:mm DD-MM-YYYY'),
                            ...daily
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
export default DailyList