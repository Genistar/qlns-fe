import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { getAll, cultivateUserSelector } from '../cultivateUserSlice';
import styles from '../../../Admin/PersonalManagement/Style.module.scss'
import moment from 'moment';
import CultivateUserDetail from '../Detail';
import { CSVLink } from 'react-csv';
import { isNameOff } from '../../../Admin/TrainingManagement/TrainingList';
import { cultivationFormD, directorySelector } from '../../../../../slices/directorySlice';

type Props = {}

const CultivateUserList: React.FC = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [cultivateDi, setCultivateDi] = useState(null);
    const dispatch = useAppDispatch();
    const { cultivatesUser } = useAppSelector(cultivateUserSelector);
    const { cultivationForm } = useAppSelector(directorySelector);
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role');
    useEffect(() => {
        dispatch(getAll({ keyword: keyword, cbId, cultivateOption: cultivateDi }))
        dispatch(cultivationFormD())
    }, [cbId, keyword, cultivateDi]);
    const cultivateOption = cultivationForm.map((cul: any, index) => (
        <Select.Option key={index} value={cul.id}>{cul.tenHinhThuc}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên bồi dưỡng',
            dataIndex: 'tenHinhThucBD',
            key: 'tenHinhThucBD',
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
            render: (data: any, record: any) => (
                <Space size="middle">
                    <CultivateUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
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
    const data2 = cultivatesUser.map(cultivate => ({
        tenHinhThucBD: cultivate.DM_Hinh_Thuc_BD?.tenHinhThuc,
        tuNgay: moment(cultivate.boiDuongTuNgay).format('DD/MM/YYYY'),
        denNgay: moment(cultivate.boiDuongDenNgay).format('DD/MM/YYYY'),
        tenCanBo: isNameOff(cultivate, cultivate.fkMaCanBo),
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
                <Form.Item className={styles.addButton}>
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
                        cultivatesUser.map(cultivate => ({
                            tenHinhThucBD: cultivate.DM_Hinh_Thuc_BD?.tenHinhThuc,
                            tuNgay: moment(cultivate.boiDuongTuNgay).format('DD/MM/YYYY'),
                            denNgay: moment(cultivate.boiDuongDenNgay).format('DD/MM/YYYY'),
                            ...cultivate
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

export default CultivateUserList