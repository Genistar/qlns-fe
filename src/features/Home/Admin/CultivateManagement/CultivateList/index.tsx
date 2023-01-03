
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getAll, cultivateSelector, removeCultivate, deleteCultivate } from '../cultivateSlice';
import moment from 'moment';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { cultivationFormD, directorySelector } from '../../../../../slices/directorySlice';
import Delete from '../../../../../components/button/Delete';
import Update from '../../../../../components/button/Update';

type Props = {}



const CultivateList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [cultivateDi, setCultivateDi] = useState(null);
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { cultivates, authLoading } = useAppSelector(cultivateSelector)
    const { users } = useAppSelector(userSelector);
    const { cultivationForm } = useAppSelector(directorySelector)
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: officer, cultivateOption: cultivateDi }));
        dispatch(getUsers());
        dispatch(cultivationFormD())
    }, [keyword, officer, cultivateDi])
    const onDelete = (id: string) => {

        if (confirm("Bạn có muốn xóa mục bồi dưỡng này không ?")) { //eslint-disable-line
            dispatch(removeCultivate({ id }))
            dispatch(deleteCultivate(id)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Xóa',
                        fkMaCanBo: cbId,
                        noiDung: `Thông tin mục bồi dưỡng ${id}`
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
    const cultivateOption = cultivationForm.map((cul: any, index) => (
        <Select.Option key={index} value={cul.id}>{cul.tenHinhThuc}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên bồi dưỡng',
            dataIndex: 'tenHinhThucBD',
            key: 'tenHinhThucBD',
        },
        {
            title: 'Tên Cán Bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'Từ ngày',
            dataIndex: 'tuNgay',
            key: 'tuNgay',
        },
        {
            title: 'Đến ngày',
            dataIndex: 'denNgay',
            key: 'denNgay',
        },
        {
            title: 'Nội dung',
            dataIndex: 'noiDungBoiDuong',
            key: 'noiDungBoiDuong',
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
                    <Link to={`/admin/cultivatemanagement/${record.id}`} >Chi tiết</Link>
                </Space>
            ),
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Update link={`/admin/cultivatemanagement/update/${record.id}`} id={record.id} />
                        <Delete id={record.id} onDelete={onDelete} />
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
            label: 'Tên bồi dưỡng',
            key: 'tenHinhThucBD',
        },
        {
            label: 'Tên Cán Bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Từ ngày',
            key: 'tuNgay',
        },
        {
            label: 'Đến ngày',
            key: 'denNgay',
        },
        {
            label: 'Nội dung',
            key: 'noiDungBoiDuong',
        },
        {
            label: 'Ghi Chú',
            key: 'ghiChu',
        },
    ];
    const data2 = cultivates.map(cultivate => ({
        tenHinhThucBD: cultivate.DM_Hinh_Thuc_BD?.tenHinhThuc,
        tuNgay: moment(cultivate.boiDuongTuNgay).format('DD/MM/YYYY'),
        denNgay: moment(cultivate.boiDuongDenNgay).format('DD/MM/YYYY'),
        tenCanBo: isNameOff(users, cultivate.fkMaCanBo),
        ...cultivate
    }))

    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách bồi dưỡng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn mục bồi dưỡng</Typography.Text>
                    <Select
                        placeholder='Chọn mục bồi dưỡng'
                        className={styles.cardFormInput}
                        onChange={(e) => { setCultivateDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {cultivateOption}
                    </Select>
                </Form.Item>
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
                    style={{ width: 350 }}
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
                    <Button className={styles.button} style={{ height: 44, width: 120 }}>
                        <Link to={'/admin/cultivatemanagement/add'}>Thêm</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 130 }}>
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
                        cultivates.map((cultivate, index) => ({
                            stt: index + 1,
                            tenHinhThucBD: cultivate.DM_Hinh_Thuc_BD?.tenHinhThuc,
                            tuNgay: moment(cultivate.boiDuongTuNgay).format('DD/MM/YYYY'),
                            denNgay: moment(cultivate.boiDuongDenNgay).format('DD/MM/YYYY'),
                            tenCanBo: isNameOff(users, cultivate.fkMaCanBo),
                            ...cultivate
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
export default CultivateList