
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import styles from '../../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getAll, foreignSelector, removeForeign, deleteForeign } from '../foreignSlice';
import moment from 'moment';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import Delete from '../../../../../../components/button/Delete';
import Update from '../../../../../../components/button/Update';
import Detail from '../../../../../../components/button/Detail';

type Props = {}


const ForeignList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { foreigns, authLoading } = useAppSelector(foreignSelector);
    const { users } = useAppSelector(userSelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, cbId: officer }));
        dispatch(getUsers())
        console.log(foreigns)
    }, [keyword, officer])
    const onDelete = (id: string) => {

        dispatch(removeForeign({ id }));
        dispatch(addDaily({
            ten_hoat_dong: 'Xóa',
            fkMaCanBo: cbId,
            noiDung: `Thông tin mục công tác nước ngoài ${id}`
        }))
        dispatch(deleteForeign(id)).then((res: any) => {
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
            title: 'Tên Cán bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
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
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Detail link={`/admin/businessmanagement/foreign/${record.id}`} id={record.id} />
                        <Update link={`/admin/businessmanagement/foreign/update/${record.id}`} id={record.id} />
                        <Delete
                            title='Công tác nước ngoài'
                            id={record.id}
                            removeAction={removeForeign}
                            deleteAction={deleteForeign}
                            dailyName={`Thông tin công tác nước ngoài`}
                        />
                    </Space>
                )
            }
        },
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
    const data2 = foreigns.map((foreign: any, index: any) => (
        {
            stt: index + 1,
            batDau: moment(foreign.ngayDi).format('DD/MM/YYYY'),
            ketThuc: moment(foreign.ngayVe).format('DD/MM/YYYY'),
            tenCanBo: isNameOff(users, foreign.fkMaCanBo),
            ...foreign
        }
    ))
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Công tác ngoài nước
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn cán bộ</Typography.Text>
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
                    className={styles.input_search}
                    style={{ width: 320, marginLeft: 20 }}
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
                    <Button className={styles.button} style={{ height: 44 }}>
                        <Link to={'/admin/businessmanagement/foreign/add'} >Thêm công tác</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 140 }}>
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
                        foreigns.map((foreign: any, index) => (
                            {
                                stt: index + 1,
                                batDau: moment(foreign.ngayDi).format('DD/MM/YYYY'),
                                ketThuc: moment(foreign.ngayVe).format('DD/MM/YYYY'),
                                tenCanBo: isNameOff(users, foreign.fkMaCanBo),
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
export default ForeignList