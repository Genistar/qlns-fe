
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import SelectItem from '../../../../../../components/Select/index'
import styles from '../../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { deleteRole, getAll, removeRole, roleSelector } from '../roleSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
import { roleOption } from '../../../../../../constant/selectOption';
import Update from '../../../../../../components/button/Update';

type Props = {}



const RoleList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const [role, setRole] = useState(null)
    const dispatch = useAppDispatch();
    const { roles, authLoading } = useAppSelector(roleSelector);
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
            title: 'Tên vai trò',
            dataIndex: 'tenVaiTro',
            key: 'tenVaiTro'
        },
        {
            title: 'Mô tả chức năng',
            dataIndex: 'chucNang',
            key: 'chucNang'
        },
        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Update link={`/admin/setting/role/update/${record.id}`} id={record.id} />
                </Space>
            ),
        }
    ];

    const onDelete = (id: string) => {

        // let newUser = users.filter((user) => user.can_bo_giang_day.id === id)

        if (confirm("Bạn có muốn xóa cán bộ này không ?")) { //eslint-disable-line
            dispatch(removeRole({ id }))
            dispatch(deleteRole(id)).then((res: any) => {
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
    const data2 = roles.map((role, index) => ({
        stt: index + 1,
        ...role
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách vai trò
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
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
                    <Button className={styles.button} style={{ height: 44, width: 100 }}>
                        <Link to={'/admin/setting/role/add'} >Thêm</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 150 }}>
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
                        roles.map((role, index) => ({
                            stt: index + 1,
                            ...role
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
export default RoleList