
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import SelectItem from '../../../../../components/Select/index'
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { deleteTraining, getAll, removeTraining, trainingSelector } from '../trainingSlice';
import moment from 'moment';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { directorySelector, getTrainingLevel, gettypeOfTrainingD } from '../../../../../slices/directorySlice'
import { CSVLink } from 'react-csv';
import Delete from '../../../../../components/button/Delete';
import Update from '../../../../../components/button/Update';

type Props = {}

export const isNameOff = (arr: any, id: any) => {
    let results = ''
    for (let i = 0; arr.length > i; i++) {
        if (arr[i].id === id) {
            results = `${arr[i].ho} ${arr[i].ten}`
        }
    }
    return results;
    // return num > 1;
}
export const imageOff = (arr: any, id: any) => {
    let results = ''
    for (let i = 0; arr.length > i; i++) {
        if (arr[i].id === id) {
            if (arr[i].hinh_anh !== undefined) {
                results = `http://localhost:4444/${arr[i].hinh_anh.slice(4, 200)}`
            }
            else {
                results = ``
            }
        }
    }
    return results;
    // return num > 1;
}


const TrainingList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const [type, setType] = useState(null);
    const [level, setLevel] = useState(null);
    const [userValue, setUserValue] = useState(null);
    const dispatch = useAppDispatch();
    const { trainings, authLoading } = useAppSelector(trainingSelector);
    const { users } = useAppSelector(userSelector);
    const { typeOfTraining, trainingLevel } = useAppSelector(directorySelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: userValue, typeTrainOption: type, levelTrainOption: level }));
        dispatch(getUsers())
        dispatch(gettypeOfTrainingD())
        dispatch(getTrainingLevel())
    }, [keyword, userValue, type, level])

    const onDelete = (id: string) => {

        dispatch(removeTraining({ id }))
        dispatch(deleteTraining(id)).then((res: any) => {
            if (res.payload.errCode === 0) {
                dispatch(addDaily({
                    ten_hoat_dong: 'Xóa',
                    fkMaCanBo: cbId,
                    noiDung: `Thông tin mục đào tạo ${id}`
                }))
                notice.success(res.payload.errMessage)
            }
            else {
                notice.error(res.payload.errMessage)
            }
        })
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const typeOfTrainingOption = typeOfTraining.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenHeDaoTao}</Select.Option>
    ))
    const trainingLevelOption = trainingLevel.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenBac}</Select.Option>
    ))
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
            title: 'Hệ đào tạo',
            dataIndex: 'tenHeDaoTao',
            key: 'tenHeDaoTao',
        },
        {
            title: 'Bậc Đào tạo',
            dataIndex: 'tenBac',
            key: 'tenBac',
        },
        {
            title: 'Ngành',
            dataIndex: 'nganhDaoTao',
            key: 'nganhDaoTao',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'noiDaoTao',
            key: 'noiDaoTao',
        },
        {
            title: 'Quốc gia',
            dataIndex: 'quocGia',
            key: 'quocGia',
        },
        {
            title: 'Luận án',
            dataIndex: 'tenLuanAn',
            key: 'tenLuanAn',
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'batDau',
            key: 'batDau',
        },
        {
            title: 'Kết Thúc',
            dataIndex: 'ketThuc',
            key: 'ketThuc',
        },
        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Link to={`/admin/trainingmanagement/${record.id}`} >Chi tiết</Link>
                </Space>
            ),
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Update link={`/admin/trainingmanagement/update/${record.id}`} id={record.id} />
                        <Delete title='đào tạo' id={record.id} onDelete={onDelete} />
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
            label: 'Tên Cán bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Hệ đào tạo',
            key: 'tenHeDaoTao',
        },
        {
            label: 'Bậc Đào tạo',
            key: 'tenBac',
        },
        {
            label: 'Ngành',
            key: 'nganhDaoTao',
        },
        {
            label: 'Địa điểm',
            key: 'noiDaoTao',
        },
        {
            label: 'Quốc gia',
            key: 'quocGia',
        },
        {
            label: 'Luận án',
            key: 'tenLuanAn',
        },
        {
            label: 'Bắt đầu',
            key: 'batDau',
        },
        {
            label: 'Kết Thúc',
            key: 'ketThuc',
        },
    ];
    const data2 = trainings.map(training => ({
        tenBac: training.Bac_dao_tao?.tenBac,
        tenHeDaoTao: training.DM_he_dao_tao?.tenHeDaoTao,
        batDau: moment(training.thoiGianBD).format('DD/MM/YYYY'),
        ketThuc: moment(training.thoiGianKT).format('DD/MM/YYYY'),
        tenCanBo: isNameOff(users, training.fkMaCanBo),
        ...training
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách đào tạo
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Hệ đào tạo</Typography.Text>
                    <Select
                        placeholder='Chọn mục hệ đào tạo'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setType(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {typeOfTrainingOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Bậc đào tạo</Typography.Text>
                    <Select
                        placeholder='Chọn mục bậc đào tạo'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setLevel(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {trainingLevelOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn cán bộ</Typography.Text>
                    <Select
                        placeholder='Chọn cán bộ'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setUserValue(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350, marginLeft: 0 }}
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
                    style={{ marginLeft: -10 }}
                >
                    <Button className={styles.button} style={{ height: 44 }}>
                        <Link to={'/admin/trainingmanagement/add'}>Thêm đào tạo</Link>
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
                        trainings.map((training, index) => ({
                            stt: index + 1,
                            tenBac: training.Bac_dao_tao?.tenBac,
                            tenHeDaoTao: training.DM_he_dao_tao?.tenHeDaoTao,
                            batDau: moment(training.thoiGianBD).format('DD/MM/YYYY'),
                            ketThuc: moment(training.thoiGianKT).format('DD/MM/YYYY'),
                            tenCanBo: isNameOff(users, training.fkMaCanBo),
                            ...training
                        }))
                    }
                    columns={columns}
                    size='small'
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
export default TrainingList