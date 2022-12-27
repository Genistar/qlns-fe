import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { getAll, disciplineUserSelector } from '../disciplineUserSlice';
import styles from '../../../Admin/PersonalManagement/Style.module.scss'
import DisciplineUserDetail from '../Detail';
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../Admin/TrainingManagement/TrainingList';
import { directorySelector, getDisciplineD } from '../../../../../slices/directorySlice';

type Props = {}

const DisciplineUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [disciplineDi, setDisciplineDi] = useState(null);
    const dispatch = useAppDispatch();
    const { disciplinesUser } = useAppSelector(disciplineUserSelector);
    const { disciplineD } = useAppSelector(directorySelector)
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role')
    useEffect(() => {
        dispatch(getAll({ keyword: '', cbId, disciplineOption: disciplineDi }))
        dispatch(getDisciplineD());
    }, [cbId, disciplineDi])
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
            render: (data: any, record: any) => (
                <Space size="middle">
                    <DisciplineUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
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
    const data2 = disciplinesUser.map(discipline => ({
        tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
        tenCanBo: isNameOff(discipline, discipline.fkMaCanBo),
        ...discipline
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách Kỷ luật
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Mục kỹ luật</Typography.Text>
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
                    className={styles.input_search}
                    style={{ width: 450, marginLeft: 540 }}
                >
                    <Typography.Text className={styles.title_item}>Từ khóa</Typography.Text>
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Nhập từ khóa cần tìm'
                        style={{ borderRadius: '0.3rem', marginTop: 2 }}
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
                    className={styles.table + ' header-table'}
                    dataSource={
                        disciplinesUser.map(discipline => ({
                            tenKyLuat: discipline.DM_ky_luat?.tenKyLuat,
                            ...discipline
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

export default DisciplineUserList