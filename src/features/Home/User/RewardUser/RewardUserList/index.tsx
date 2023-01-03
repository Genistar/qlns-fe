import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { getAll, rewardUserSelector } from '../rewardUserSlice';
import styles from '../../../Admin/PersonalManagement/Style.module.scss'
import RewardUserDetail from '../Detail';
import { isNameOff } from '../../../Admin/TrainingManagement/TrainingList';
import { CSVLink } from 'react-csv';
import { directorySelector } from '../../../../../slices/directorySlice';

type Props = {}

const RewardUserList = (props: Props) => {
    const [keyword, setKeyword] = useState('')
    const [rewardValue, setRewardValue] = useState(null)
    const dispatch = useAppDispatch();
    const { rewardsUser, authLoading } = useAppSelector(rewardUserSelector);
    const { rewardD } = useAppSelector(directorySelector)
    let cbId = localStorage.getItem('cbId');
    let role = localStorage.getItem('role');
    useEffect(() => {
        dispatch(getAll({ keyword: '', cbId }))
    }, [cbId])
    const rewardOptions = rewardD.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenKhenThuong}</Select.Option>
    ))
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên Khen Thưởng',
            dataIndex: 'tenKhenThuong',
            key: 'tenKhenThuong',
        },
        {
            title: 'Năm Khen Thưởng',
            dataIndex: 'namKhenThuong',
            key: 'namKhenThuong',
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
                    <RewardUserDetail key={record.id} id={record.id} data={data} cbId={cbId} />
                </Space>
            ),
        }
    ];
    const headers = [
        {
            label: 'STT',
            key: 'stt',
        },
        {
            label: 'Tên Khen Thưởng',
            key: 'tenKhenThuong',
        },
        {
            label: 'Tên Cán Bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Năm Khen Thưởng',
            key: 'namKhenThuong',
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
    const data2 = rewardsUser.map((reward, index) => ({
        stt: index + 1,
        tenKhenThuong: reward.DM_khen_thuong?.tenKhenThuong,
        tenCanBo: isNameOff(reward, reward.fkMaCanBo),
        ...reward
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh sách khen thưởng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Mục khen thưởng</Typography.Text>
                    <Select
                        placeholder='Chọn mục khen thưởng'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setRewardValue(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {rewardOptions}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ marginLeft: 540, width: 450 }}
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
                        rewardsUser.map((reward, index) => ({
                            stt: index + 1,
                            tenKhenThuong: reward.DM_khen_thuong?.tenKhenThuong,
                            ...reward
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

export default RewardUserList