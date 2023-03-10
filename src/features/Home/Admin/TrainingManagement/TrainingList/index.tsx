
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
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
import Detail from '../../../../../components/button/Detail';

type Props = {}

export const isNameOff = (arr: any, id: any) => {
    let results = ''
    for (let i = 0; arr.length > i; i++) {
        if (arr[i].id === id) {
            results = `${arr[i].ho} ${arr[i].ten}`
        }
    }
    return results;
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
            title: 'T??n C??n b???',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'H??? ????o t???o',
            dataIndex: 'tenHeDaoTao',
            key: 'tenHeDaoTao',
        },
        {
            title: 'B???c ????o t???o',
            dataIndex: 'tenBac',
            key: 'tenBac',
        },
        {
            title: 'Ng??nh',
            dataIndex: 'nganhDaoTao',
            key: 'nganhDaoTao',
        },
        {
            title: '?????a ??i???m',
            dataIndex: 'noiDaoTao',
            key: 'noiDaoTao',
        },
        {
            title: 'Qu???c gia',
            dataIndex: 'quocGia',
            key: 'quocGia',
        },
        {
            title: 'Lu???n ??n',
            dataIndex: 'tenLuanAn',
            key: 'tenLuanAn',
        },
        {
            title: 'B???t ?????u',
            dataIndex: 'batDau',
            key: 'batDau',
        },
        {
            title: 'K???t Th??c',
            dataIndex: 'ketThuc',
            key: 'ketThuc',
        },
        {
            key: 'action',
            render: (data: any, record: any) => {
                return (
                    <Space size="middle">
                        <Detail link={`/admin/trainingmanagement/${record.id}`} id={record.id} />
                        <Update link={`/admin/trainingmanagement/update/${record.id}`} id={record.id} />
                        <Delete
                            title='????o t???o'
                            id={record.id}
                            removeAction={removeTraining}
                            deleteAction={deleteTraining}
                            dailyName={`Th??ng tin ????o t???o c???a ${isNameOff(users, data.fkMaCanBo)} t???i ${data.noiDaoTao}`}
                        />
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
            label: 'T??n C??n b???',
            key: 'tenCanBo',
        },
        {
            label: 'H??? ????o t???o',
            key: 'tenHeDaoTao',
        },
        {
            label: 'B???c ????o t???o',
            key: 'tenBac',
        },
        {
            label: 'Ng??nh',
            key: 'nganhDaoTao',
        },
        {
            label: '?????a ??i???m',
            key: 'noiDaoTao',
        },
        {
            label: 'Qu???c gia',
            key: 'quocGia',
        },
        {
            label: 'Lu???n ??n',
            key: 'tenLuanAn',
        },
        {
            label: 'B???t ?????u',
            key: 'batDau',
        },
        {
            label: 'K???t Th??c',
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
                Danh s??ch ????o t???o
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>H??? ????o t???o</Typography.Text>
                    <Select
                        placeholder='Ch???n m???c h??? ????o t???o'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setType(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {typeOfTrainingOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>B???c ????o t???o</Typography.Text>
                    <Select
                        placeholder='Ch???n m???c b???c ????o t???o'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setLevel(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {trainingLevelOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n c??n b???</Typography.Text>
                    <Select
                        placeholder='Ch???n c??n b???'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setUserValue(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350, marginLeft: 0 }}
                >
                    <Typography.Text className={styles.title_item}>T??? kh??a</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nh???p t??? kh??a c???n t??m'
                        style={{ borderRadius: '0.3rem', marginTop: 2, height: 44 }}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                    style={{ marginLeft: -10 }}
                >
                    <Button className={styles.button} style={{ height: 44 }}>
                        <Link to={'/admin/trainingmanagement/add'}>Th??m ????o t???o</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 120 }}>
                        <Typography.Text className={styles.textEx}>
                            Xu???t file {'(.csv)'}
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