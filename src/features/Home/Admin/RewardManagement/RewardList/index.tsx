
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import SelectItem from '../../../../../components/Select/index'
// import { useAppDispatch, useAppSelector } from '../../../../store/store';
// import { getAll, userSelector } from '../../../Auth/Login/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { deleteReward, getAll, removeReward, rewardSelector } from '../rewardSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { directorySelector, getRewardD } from '../../../../../slices/directorySlice';
import Delete from '../../../../../components/button/Delete';
import Update from '../../../../../components/button/Update';
import Detail from '../../../../../components/button/Detail';

type Props = {}



const RewardList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [rewardValue, setRewardValue] = useState(null)
    const [userValue, setUserValue] = useState(null)
    const dispatch = useAppDispatch();
    const { rewards, authLoading } = useAppSelector(rewardSelector);
    const { users } = useAppSelector(userSelector);
    const { rewardD } = useAppSelector(directorySelector)
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, userOption: userValue, rewardOption: rewardValue }));
        dispatch(getUsers())
        dispatch(getRewardD());
    }, [keyword, userValue, rewardD])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'T??n Khen Th?????ng',
            dataIndex: 'tenKhenThuong',
            key: 'tenKhenThuong',
        },
        {
            title: 'T??n C??n B???',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'N??m Khen Th?????ng',
            dataIndex: 'namKhenThuong',
            key: 'namKhenThuong',
        },
        {
            title: 'C?? Quan',
            dataIndex: 'coQuan',
            key: 'coQuan',
        },
        {
            title: 'S??? C??ng V??n',
            dataIndex: 'soCongVan',
            key: 'soCongVan',
        },
        {
            title: 'Ghi Ch??',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            key: 'action',
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Detail link={`/admin/rewardmanagement/${record.id}`} id={record.id} />
                        <Update link={`/admin/rewardmanagement/update/${record.id}`} id={record.id} />
                        <Delete
                            title='Khen th?????ng'
                            id={record.id}
                            deleteAction={deleteReward}
                            removeAction={removeReward}
                            dailyName='Th??ng tin khen th?????ng'
                        />
                    </Space>
                )
            }
        },
    ];
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const rewardOptions = rewardD.map((r, index) => (
        <Select.Option key={index} value={r.id}>{r.tenKhenThuong}</Select.Option>
    ))
    const headers = [
        {
            label: 'STT',
            key: 'stt',
        },
        {
            label: 'T??n Khen Th?????ng',
            key: 'tenKhenThuong',
        },
        {
            label: 'T??n C??n B???',
            key: 'tenCanBo',
        },
        {
            label: 'N??m Khen Th?????ng',
            key: 'namKhenThuong',
        },
        {
            label: 'C?? Quan',
            key: 'coQuan',
        },
        {
            label: 'S??? C??ng V??n',
            key: 'soCongVan',
        },
        {
            label: 'Ghi Ch??',
            key: 'ghiChu',
        },
    ];
    const data2 = rewards.map(reward => ({
        id: reward.id,
        tenKhenThuong: reward.DM_khen_thuong?.tenKhenThuong,
        tenCanBo: isNameOff(users, reward.fkMaCanBo),
        ...reward
    }))
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh s??ch khen th?????ng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>M???c khen th?????ng</Typography.Text>
                    <Select
                        placeholder='Ch???n m???c khen th?????ng'
                        className={styles.cardFormInput}
                        onChange={(e) => { console.log(e); setRewardValue(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {rewardOptions}
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
                    style={{ width: 450, marginLeft: 80 }}
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
                    style={{ marginLeft: 30 }}
                >
                    <Button className={styles.button} style={{ height: 44, width: 100 }}>
                        <Link to={'/admin/RewardManagement/add'} >Th??m</Link>
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
                        rewards.map((reward, index) => ({
                            stt: index + 1,
                            tenKhenThuong: reward.DM_khen_thuong?.tenKhenThuong,
                            tenCanBo: isNameOff(users, reward.fkMaCanBo),
                            ...reward
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
export default RewardList