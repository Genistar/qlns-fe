
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getAll, disciplineSelector, removeDiscipline, deleteDiscipline } from '../disciplineSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { directorySelector, getDisciplineD } from '../../../../../slices/directorySlice';

type Props = {}



const DisciplineList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [disciplineDi, setDisciplineDi] = useState(null);
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { disciplines, authLoading } = useAppSelector(disciplineSelector)
    const { disciplineD } = useAppSelector(directorySelector)
    const { users } = useAppSelector(userSelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: officer, disciplineOption: disciplineDi }));
        dispatch(getUsers())
        dispatch(getDisciplineD());
    }, [keyword, officer, disciplineDi])
    const onDelete = (id: string) => {

        // let newUser = users.filter((user) => user.can_bo_giang_day.id === id)

        if (confirm("Bạn có muốn xóa mục kỹ luật này không ?")) { //eslint-disable-line
            dispatch(removeDiscipline({ id }))
            dispatch(deleteDiscipline(id)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Xóa',
                        fkMaCanBo: cbId,
                        noiDung: `Thông tin mục Kỹ luật${id}`
                    }))
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        }
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const disciplineDOptions = disciplineD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKyLuat}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên Kỷ Luật',
            dataIndex: 'tenKyLuat',
            key: 'tenKyLuat',
        },
        {
            title: 'Tên Cán Bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'Năm Kỷ Luật',
            dataIndex: 'namBiKyLuat',
            key: 'namBiKyLuat',
        },
        {
            title: 'Năm Xóa Kỷ Luật',
            dataIndex: 'namXoaHieuLucKyLuat',
            key: 'namXoaHieuLucKyLuat',
        },
        {
            title: 'Cơ Quan',
            dataIndex: 'coQuan',
            key: 'coQuan',
        },
        {
            title: 'Số Công Văn',
            dataIndex: 'soCongVan',
            key: 'soCongVan',
        },
        {
            title: 'Ghi Chú',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Link to={`/admin/disciplinemanagement/${record.id}`} >Chi tiết</Link>
                </Space>
            ),
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Link to={`/admin/disciplinemanagement/update/${record.id}`}>Cập nhật</Link>
                        <a className="btn btn-lg btn-danger" onClick={() => onDelete(record.id)}>Xóa</a>
                    </Space>
                )
            }
        },
    ];
    const headers = [
        {
            label: 'STT',
            key: 'id',
        },
        {
            label: 'Tên Kỷ Luật',
            key: 'tenKyLuat',
        },
        {
            label: 'Tên Cán Bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Năm Kỷ Luật',
            key: 'namBiKyLuat',
        },
        {
            label: 'Năm Xóa Kỷ Luật',
            key: 'namXoaHieuLucKyLuat',
        },
        {
            label: 'Cơ Quan',
            key: 'coQuan',
        },
        {
            label: 'Số Công Văn',
            key: 'soCongVan',
        },
        {
            label: 'Ghi Chú',
            key: 'ghiChu',
        },
    ];
    const data2 = disciplines.map(discipline => ({
        tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
        tenCanBo: isNameOff(users, discipline.fkMaCanBo),
        ...discipline
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách kỷ luật
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn mục kỹ luật</Typography.Text>
                    <Select
                        placeholder='Chọn mục kỹ luật'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setDisciplineDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {disciplineDOptions}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn tên cán bộ</Typography.Text>
                    <Select
                        placeholder='Chọn tên cán bộ'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setOfficer(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 450, marginLeft: 80 }}
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
                        <Link to={'/admin/disciplinemanagement/add'}>Thêm</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 120 }}>
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
                        disciplines.map(discipline => ({
                            tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
                            tenCanBo: isNameOff(users, discipline.fkMaCanBo),
                            ...discipline
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
export default DisciplineList