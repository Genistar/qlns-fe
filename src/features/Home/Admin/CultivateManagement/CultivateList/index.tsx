
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice, Modal } from 'antd'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined, ExclamationCircleFilled } from '@ant-design/icons'
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
import Detail from '../../../../../components/button/Detail';
const { confirm } = Modal;
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
            title: 'T??n b???i d?????ng',
            dataIndex: 'tenHinhThucBD',
            key: 'tenHinhThucBD',
        },
        {
            title: 'T??n C??n B???',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'T??? ng??y',
            dataIndex: 'tuNgay',
            key: 'tuNgay',
        },
        {
            title: '?????n ng??y',
            dataIndex: 'denNgay',
            key: 'denNgay',
        },
        {
            title: 'N???i dung',
            dataIndex: 'noiDungBoiDuong',
            key: 'noiDungBoiDuong',
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
                        <Detail link={`/admin/cultivatemanagement/${record.id}`} id={record.id} />
                        <Update link={`/admin/cultivatemanagement/update/${record.id}`} id={record.id} />
                        <Delete
                            id={record.id}
                            title='B???i d?????ng'
                            removeAction={removeCultivate}
                            deleteAction={deleteCultivate}
                            dailyName='Th??ng tin b???i d?????ng'
                        />
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
            label: 'T??n b???i d?????ng',
            key: 'tenHinhThucBD',
        },
        {
            label: 'T??n C??n B???',
            key: 'tenCanBo',
        },
        {
            label: 'T??? ng??y',
            key: 'tuNgay',
        },
        {
            label: '?????n ng??y',
            key: 'denNgay',
        },
        {
            label: 'N???i dung',
            key: 'noiDungBoiDuong',
        },
        {
            label: 'Ghi Ch??',
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
                Danh s??ch b???i d?????ng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n m???c b???i d?????ng</Typography.Text>
                    <Select
                        placeholder='Ch???n m???c b???i d?????ng'
                        className={styles.cardFormInput}
                        onChange={(e) => { setCultivateDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {cultivateOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n c??n b???</Typography.Text>
                    <Select
                        placeholder='Ch???n t??n c??n b???'
                        className={styles.cardFormInput}
                        onChange={(e) => { setOfficer(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350 }}
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
                    <Button className={styles.button} style={{ height: 44, width: 120 }}>
                        <Link to={'/admin/cultivatemanagement/add'}>Th??m</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 130 }}>
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