
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import SelectItem from '../../../../../../components/Select/index'
import styles from '../../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { deleteAccount, getAll, removeAccount, accountSelector } from '../accountSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
import { roleOption } from '../../../../../../constant/selectOption';
import Update from '../../../../../../components/button/Update';
import { Can_bo_giang_day } from '../../../../../../interface';

type Props = {}



const AccountList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const [role, setRole] = useState(null)
    const dispatch = useAppDispatch();
    const { accounts, authLoading } = useAppSelector(accountSelector);
    const { users } = useAppSelector(userSelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, role }));
        dispatch(getUsers())
    }, [keyword, role])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên Cán Bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo'
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password'
        },
        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Update link={`/admin/setting/account/update/${record.id}`} id={record.id} />
                </Space>
            ),
        }
    ];

    const onDelete = (id: string) => {

        // let newUser = users.filter((user) => user.can_bo_giang_day.id === id)

        if (confirm("Bạn có muốn xóa cán bộ này không ?")) { //eslint-disable-line
            dispatch(removeAccount({ id }))
            dispatch(deleteAccount(id)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Xóa',
                        fkMaCanBo: cbId,
                        noiDung: `Tài khoản ${id}`
                    }))
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        }
    }
    const headers = [
        {
            label: 'STT',
            key: 'stt',
        },
        {
            label: 'Tên Cán bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Vai trò',
            key: 'role',
        },
        {
            label: 'Tài khoản',
            key: 'username',
        },
        {
            label: 'Mật khẩu',
            key: 'password',
        }
    ];
    const data2 = accounts.map((account, index) => ({
        stt: index + 1,
        tenCanBo: isNameOff(users, account.cbId),
        username: account.username,
        password: account.password,
        role: account.role
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách tài khoản
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Vai trò</Typography.Text>
                    <Select
                        placeholder='Chọn vai trò'
                        className={styles.cardFormInput}
                        onChange={(e) => { setRole(e) }}
                        options={roleOption}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350, marginLeft: 500 }}
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
                        accounts.map((account: Can_bo_giang_day, index) => ({
                            stt: index + 1,
                            id: account.id,
                            tenCanBo: isNameOff(users, account.cbId),
                            username: account.username,
                            password: account.password,
                            role: account.Vai_tro.tenVaiTro
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
export default AccountList