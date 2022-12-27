import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { getAll, trainingUserSelector } from '../trainingUserSlice';
import styles from '../../../Admin/PersonalManagement/Style.module.scss'
import moment from 'moment';
import TrainingUserDetail from '../Detail';
import { isNameOff } from '../../../Admin/TrainingManagement/TrainingList';
import { CSVLink } from 'react-csv';
import { directorySelector, getTrainingLevel, gettypeOfTrainingD } from '../../../../../slices/directorySlice';

type Props = {}

const TrainingUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState(null);
    const [level, setLevel] = useState(null);
    const dispatch = useAppDispatch();
    const { trainingsUser } = useAppSelector(trainingUserSelector);
    const { typeOfTraining, trainingLevel } = useAppSelector(directorySelector);
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role');
    useEffect(() => {
        dispatch(getAll({ keyword: keyword, cbId, levelTrainOption: level, typeTrainOption: type }))
        dispatch(gettypeOfTrainingD())
        dispatch(getTrainingLevel())
    }, [cbId, keyword, level, type])
    const typeOfTrainingOption = typeOfTraining.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenHeDaoTao}</Select.Option>
    ))
    const trainingLevelOption = trainingLevel.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenBac}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
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
            render: (data: any, record: any) => (
                <Space size="middle">
                    <TrainingUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
                </Space>
            ),
        }
    ];
    const headers = [
        {
            label: 'STT',
            key: 'id',
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
    const data2 = trainingsUser.map(training => ({
        tenBac: training.Bac_dao_tao?.tenBac,
        tenHeDaoTao: training.DM_he_dao_tao?.tenHeDaoTao,
        batDau: moment(training.thoiGianBD).format('DD/MM/YYYY'),
        ketThuc: moment(training.thoiGianKT).format('DD/MM/YYYY'),
        tenCanBo: isNameOff(training, training.fkMaCanBo),
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
                    <Typography.Text className={styles.title_item}>Bật đào tạo</Typography.Text>
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
                    className={styles.input_search}
                    style={{ width: 450, marginLeft: 325 }}
                >
                    <Typography.Text className={styles.title_item}>Từ khóa</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nhập từ khóa cần tìm'
                        style={{ borderRadius: '0.3rem', marginTop: 2, width: 450 }}
                    />
                </Form.Item>
                <Form.Item
                    className={styles.addButton}
                >
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
                    className={styles.table}
                    dataSource={
                        trainingsUser.map(training => ({
                            tenBac: training.Bac_dao_tao?.tenBac,
                            tenHeDaoTao: training.DM_he_dao_tao?.tenHeDaoTao,
                            batDau: moment(training.thoiGianBD).format('DD/MM/YYYY'),
                            ketThuc: moment(training.thoiGianKT).format('DD/MM/YYYY'),
                            ...training
                        }))
                    }
                    columns={columns}
                    size='middle'
                    loading={false}
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

export default TrainingUserList