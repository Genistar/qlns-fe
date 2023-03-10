
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice, Image } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { deleteUser, getAll, removeUser, userSelector } from '../../../../Auth/userSlice';
import { directorySelector, getAcademicRankD, getDegreeD, getMajorsD, getSubjectsD } from '../../../../../slices/directorySlice';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import Delete from '../../../../../components/button/Delete';
import Update from '../../../../../components/button/Update';

type Props = {}


export const isNameOfD = (arr: any, id: string) => {
    let results = ''
    for (let i = 0; arr.length > i; i++) {
        if (arr[i].id === id) {
            results = `${arr[i].ten}`;
        }
    }
    return results;
    // return num > 1;
}
const PersonalList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [academicRankD, setAcademicRankD] = useState(null)
    const [degree, setDegree] = useState(null);
    const dispatch = useAppDispatch();
    const { users, authLoading } = useAppSelector(userSelector);
    const { academicRank, degreeD, majors, subject } = useAppSelector(directorySelector);
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, academicRank: academicRankD, degree }));
    }, [keyword, academicRankD, degree]);
    useEffect(() => {
        dispatch(getAcademicRankD());
        dispatch(getDegreeD());
        dispatch(getMajorsD());
        dispatch(getSubjectsD())
    }, [])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'H??? v?? t??n',
            dataIndex: 'hovaten',
            key: 'hovaten',
        },
        {
            title: 'N??i sinh',
            dataIndex: 'noi_sinh',
            key: 'noi_sinh',
        },
        {
            title: 'S??? ??i???n tho???i',
            dataIndex: 'dien_thoai',
            key: 'dien_thoai',
        },
        {
            title: 'BM ????o t???o',
            dataIndex: 'boMon',
            key: 'boMon',
        },
        {
            title: 'H???c v???',
            dataIndex: 'hocVi',
            key: 'hocVi',
        },
        {
            title: 'H???c h??m',
            dataIndex: 'hocHam',
            key: 'hocHam',
        },
        {
            title: 'Ng??nh',
            dataIndex: 'nganh',
            key: 'nganh',
        },
        {
            title: 'H??nh ???nh',
            dataIndex: 'hinh_anh',
            key: 'hinh_anh',
            render: (data: any, record: any) => (
                <Space size="middle">
                    <Image src={`http://localhost:4444/${record.hinh_anh.slice(4, 200)}`} style={{ width: 30, height: 34 }} />
                </Space>
            )
        },
        {
            title: 'T??nh tr???ng',
            dataIndex: 'ngay_nghi_huu',
            key: 'ngay_nghi_huu',
            render: (data: any) => (
                data === null ? 'C??n l??m vi???c' : '???? ngh?? h??u'
            )
        },
        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Update link={`/admin/personalmanagement/update/${record.id}`} id={record.id} />
                </Space>
            ),
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Delete
                            title='C??n b???'
                            id={record.id}
                            removeAction={removeUser}
                            deleteAction={deleteUser}
                            dailyName='Th??ng tin c??n b???'
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
            label: 'H???',
            key: 'ho',
        },
        {
            label: 'T??n', key: 'ten',
        },
        {
            label: 'N??i sinh',
            key: 'noi_sinh',
        },
        {
            label: 'S??? ??i???n tho???i',
            key: 'dien_thoai',
        },
        {
            label: 'BM ????o t???o',
            key: 'boMon',
        },
        {
            label: 'H???c v???',
            key: 'hocVi',
        },
        {
            label: 'H???c h??m',
            key: 'hocHam',
        },
        {
            label: 'Ng??nh',
            key: 'nganh',
        },
        {
            label: 'Ng??y v??o tr?????ng',
            key: 'ngay_vao_truong',
        },
        {
            label: 'T??nh tr???ng',
            key: 'ngay_nghi_huu',
            render: (data: any) => (
                data === null ? 'C??n l??m vi???c' : '???? ngh?? h??u'
            )
        },
    ];
    const data2 = users.map(u => ({
        hocVi: degreeD.find(data => (data.id === u.ma_hoc_vi))?.ten,
        hocHam: academicRank.find(data => (data.id === u.ma_hoc_ham))?.ten,
        nganh: majors.find(data => (data.id.toString() === u.fk_nganh))?.ten_nganh,
        boMon: subject.find(data => (data.id.toString() === u.ma_bo_mon))?.ten_bo_mon,
        ...u
    }))
    const hocViOption = degreeD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten}</Select.Option>
    ))
    const hocHamOption = academicRank.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten}</Select.Option>
    ))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh s??ch c??n b???
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item} >Ch???n h???c v???</Typography.Text>
                    <Select
                        placeholder='Ch???n h???c v???'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setDegree(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {hocViOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n h???c h??m</Typography.Text>
                    <Select
                        placeholder='Ch???n h???c h??m'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setAcademicRankD(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {hocHamOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 400 }}
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
                >
                    <Button className={styles.button} style={{ height: 44 }}>
                        <Link to={'/admin/personalmanagement/add'}>Th??m c??n b???</Link>
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
                        users.map((u, index) => ({
                            stt: index + 1,
                            hocVi: degreeD.find(data => (data.id === u.ma_hoc_vi))?.ten,
                            hocHam: academicRank.find(data => (data.id === u.ma_hoc_ham))?.ten,
                            nganh: majors.find(data => (data.id.toString() === u.fk_nganh))?.ten_nganh,
                            boMon: subject.find(data => (data.id.toString() === u.ma_bo_mon))?.ten_bo_mon,
                            hovaten: u.ho + ' ' + u.ten,
                            ...u
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
export default PersonalList