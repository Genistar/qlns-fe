
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice, Badge, Tag, Modal } from 'antd'
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined, ExclamationCircleFilled, CheckOutlined, SendOutlined } from '@ant-design/icons'
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getAll, contractSelector, removeContract, deleteContract, updateDateContract } from '../contractSlice';
import moment from 'moment';
import Swal from 'sweetalert2'
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { CSVLink } from 'react-csv';
import { directorySelector, getContractType } from '../../../../../slices/directorySlice';
import Update from '../../../../../components/button/Update';
import Delete from '../../../../../components/button/Delete';
import { daysdifference } from '../../../../../utils/getDate';
type Props = {}



const ContractList = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [contractDi, setcontractDi] = useState(null);
    const [officer, setOfficer] = useState(null);
    const dispatch = useAppDispatch();
    const { contracts, authLoading } = useAppSelector(contractSelector)
    const { users } = useAppSelector(userSelector);
    const { contractType } = useAppSelector(directorySelector)
    let cbId = localStorage.getItem('cbId');
    useEffect(() => {
        dispatch(getAll({ keyword, contractDi, userOption: officer }));
        dispatch(getUsers());
        dispatch(getContractType())
    }, [contractDi, officer, keyword])
    const onUpdateDate = (hdDenNgay: any, hdTuNgay: any, id: any, ngayKy: any, loaiHopDong: any) => {
        dispatch(updateDateContract({
            id: id,
            hdDenNgay: moment(hdDenNgay).add(loaiHopDong.soThang, 'months').toISOString(),
            hdTuNgay: moment(hdTuNgay).add(loaiHopDong.soThang, 'months').toISOString(),
            ngayKy: moment(ngayKy).add(loaiHopDong.soThang, 'months').toISOString(),
            giaHan: 0
        })).then((res: any) => {
            if (res.payload.errCode === 0) {
                dispatch(addDaily({
                    ten_hoat_dong: 'Duy???t gia h???n h???p ?????ng ' + id,
                    fkMaCanBo: cbId,
                    noiDung: `${moment(hdDenNgay).format('DD/MM/YYYY')} -> ${moment(hdDenNgay).add(loaiHopDong.soThang, 'months').format('DD/MM/YYYY')}`
                }));
                dispatch(getAll({ keyword: '', contractDi: null, userOption: null }))
                Swal.fire({
                    title: `Gia h???n th??nh c??ng`,
                    text: `Gia h???n t??? ${moment(hdDenNgay).format('DD/MM/YYYY')} -> ${moment(hdDenNgay).add(loaiHopDong.soThang, 'months').format('DD/MM/YYYY')}`,
                    icon: 'success'
                })
            }
            else {
                Swal.fire({
                    title: `D?? x???y ra l???i`,
                    icon: 'error',
                    text: res.payload.errMessage
                })
            }
        })
    }
    const showConfirm = (hdDenNgay: any, hdTuNgay: any, id: any, ngayKy: any, loaiHopDong: any) => {
        Swal.fire({
            title: `B???n c?? ch???c ch???n mu???n gia h???n h???p ?????ng kh??ng?`,
            text: 'B???n c?? mu???n x??a m???c n??y hay kh??ng?',
            icon: 'question',
            showDenyButton: true,
            denyButtonText: 'Quay l???i',
            confirmButtonText: 'X??c nh???n'
        }).then(response => {
            if (response.isConfirmed) {
                onUpdateDate(hdDenNgay, hdTuNgay, id, ngayKy, loaiHopDong)
            }
        })
    };
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const contractOption = contractType.map((con: any, index) => (
        <Select.Option key={index} value={con.id}>{con.tenLoaiHopDong}</Select.Option>
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
            title: 'Lo???i H???p ?????ng',
            dataIndex: 'loaiHopDong',
            key: 'loaiHopDong',
        },
        {
            title: 'Ngh??? Nghi???p',
            dataIndex: 'ngheNghiep',
            key: 'ngheNghiep',
        },
        {
            title: 'B??? M??n',
            dataIndex: 'boMon',
            key: 'boMon',
        },
        {
            title: 'Tr???ng th??i',
            key: 'status',
            render: (data: any, record: any) => (
                <Space size="middle">
                    <Tag
                        style={{ width: '6rem', textAlign: 'center' }}
                        color={data.status < 30 && data.status > 7 ? 'yellow' : (data.status < 7 && data.status > 0 ? 'orange' : (data.status < 0 ? 'red' : 'green'))}
                    >
                        <Badge
                            style={{ marginRight: 10 }}
                            color={data.status < 30 && data.status > 7 ? 'yellow' : (data.status < 7 && data.status > 0 ? 'orange' : (data.status < 0 ? 'red' : 'green'))}
                        />
                        {data.status < 30 && data.status > 7 ? 'G???n h???t h???n' : (data.status < 7 && data.status > 0 ? 'S???p h???t h???n' : (data.status < 0 ? 'H???t h???n' : 'C??n h???n'))}
                    </Tag>

                </Space>
            ),
        },
        {
            title: 'B???t ?????u',
            dataIndex: 'thoiGianBD',
            key: 'thoiGianBD',
        },
        {
            title: 'K???t th??c',
            dataIndex: 'thoiGianKT',
            key: 'thoiGianKT',
        },

        {
            key: 'action',
            render: (data: any, record: any) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<CheckOutlined style={{ color: data?.giaHan === 0 ? 'red' : 'green' }} />}
                        onClick={() => showConfirm(data?.hdDenNgay, data?.hdTuNgay, data?.id, data?.ngayKy, data.Loai_hop_dong)}
                        disabled={data?.giaHan === 0 ? true : false}
                    />
                    <Update link={`/admin/contractmanagement/update/${record.id}`} id={record.id} />
                    <Delete
                        id={record.id}
                        title='H???p ?????ng'
                        removeAction={removeContract}
                        deleteAction={deleteContract}
                        dailyName='Th??ng tin h???p ?????ng'
                    />
                    <Button
                        type='text'
                        icon={<SendOutlined />}
                        disabled={data.status > 30 ? true : false}
                    />
                </Space>
            ),
        },
    ];
    const headers = [
        {
            label: 'STT',
            key: 'id',
        },
        {
            label: 'T??n C??n B???',
            key: 'tenCanBo',
        },
        {
            label: 'T??? ng??y',
            key: 'thoiGianBD',
        },
        {
            label: 'Lo???i h???p ?????ng',
            key: 'loaiHopDong',
        },
        {
            label: 'Ngh??? nghi???p',
            key: 'ngheNghiep',
        },
        {
            label: 'B??? M??n',
            key: 'boMon'
        },
        {
            label: '?????n ng??y',
            key: 'thoiGianKT',
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


    const data2 = contracts.map((contract, index) => {
        let now = new Date()
        const to = new Date(moment(contract.hdDenNgay).format('DD/MM/YYYY'))
        return {
            stt: index + 1,
            tenCanBo: isNameOff(users, contract.BenB),
            loaiHopDong: contract.Loai_hop_dong?.tenLoaiHopDong,
            thoiGianBD: moment(contract.hdTuNgay).format('DD/MM/YYYY'),
            thoiGianKT: moment(contract.hdDenNgay).format('DD/MM/YYYY'),
            status: to.getTime() - now.getTime(),
            boMon: contract.Bo_mon?.ten_bo_mon,
            ...contract
        }
    })
    return (
        <Row
            className={styles.container}
        >
            <Typography.Title level={2} className={styles.tile}>
                Danh s??ch h???p ?????ng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Ch???n lo???i h???p ?????ng</Typography.Text>
                    <Select
                        placeholder='Ch???n lo???i h???p ?????ng'
                        className={styles.cardFormInput}
                        onChange={(e) => { setcontractDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'T???t c???'}</Select.Option>
                        {contractOption}
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
                        <Link to={'/admin/contractmanagement/add'}>Th??m</Link>
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
                        contracts.map((contract: any, index) => {
                            let now = new Date()
                            return {
                                stt: index + 1,
                                tenCanBo: isNameOff(users, contract.BenB),
                                loaiHopDong: contract.Loai_hop_dong?.tenLoaiHopDong,
                                thoiGianBD: moment(contract.hdTuNgay).format('DD/MM/YYYY'),
                                thoiGianKT: moment(contract.hdDenNgay).format('DD/MM/YYYY'),
                                status: daysdifference(moment(contract.hdDenNgay).toDate().getTime(), now.getTime()),
                                boMon: contract.Bo_mon?.ten_bo_mon,
                                ...contract
                            }
                        })
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
export default ContractList