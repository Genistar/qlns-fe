
import { Button, Form, Input, Row, Select, Space, Table, Typography, message as notice, Badge, Tag } from 'antd'
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import styles from '../../PersonalManagement/Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getAll, contractSelector, removeContract, deleteContract, updateDateContract } from '../contractSlice';
import moment from 'moment';
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
    const onDelete = (id: string) => {

        if (confirm("Bạn có muốn xóa mục bồi dưỡng này không ?")) { //eslint-disable-line
            dispatch(removeContract({ id }))
            dispatch(deleteContract(id)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Xóa',
                        fkMaCanBo: cbId,
                        noiDung: `Thông tin hợp đồng ${id}`
                    }))
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        }
    }
    const onUpdateDate = (hdDenNgay: any, hdTuNgay: any, id: any, ngayKy: any) => {
        dispatch(updateDateContract({
            id: id,
            hdDenNgay: moment(hdDenNgay).add(3, 'years').toISOString(),
            hdTuNgay: moment(hdTuNgay).add(3, 'years').toISOString(),
            ngayKy: moment(ngayKy).add(3, 'years').toISOString(),
            giaHan: 0
        })).then((res: any) => {
            if (res.payload.errCode === 0) {
                dispatch(addDaily({
                    ten_hoat_dong: 'Duyệt gia hạn hợp đồng ' + id,
                    fkMaCanBo: cbId,
                    noiDung: `${moment(hdDenNgay).format('DD/MM/YYYY')} -> ${moment(hdDenNgay).add(3, 'years').format('DD/MM/YYYY')}`
                }));
                dispatch(getAll({ keyword: '', contractDi: null, userOption: null }))
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
            title: 'Tên Cán bộ',
            dataIndex: 'tenCanBo',
            key: 'tenCanBo',
        },
        {
            title: 'Loại Hợp đồng',
            dataIndex: 'loaiHopDong',
            key: 'loaiHopDong',
        },
        {
            title: 'Nghề Nghiệp',
            dataIndex: 'ngheNghiep',
            key: 'ngheNghiep',
        },
        {
            title: 'Bộ Môn',
            dataIndex: 'boMon',
            key: 'boMon',
        },
        {
            title: 'Trạng thái',
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
                        {data.status < 30 && data.status > 7 ? 'Gần hết hạn' : (data.status < 7 && data.status > 0 ? 'Sắp hết hạn' : (data.status < 0 ? 'Hết hạn' : 'Còn hạn'))}
                    </Tag>

                </Space>
            ),
        },
        {
            title: 'Bắt đầu',
            dataIndex: 'thoiGianBD',
            key: 'thoiGianBD',
        },
        {
            title: 'Kết thúc',
            dataIndex: 'thoiGianKT',
            key: 'thoiGianKT',
        },

        {
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Update link={`/admin/contractmanagement/update/${record.id}`} id={record.id} />
                    <Delete id={record.id} onDelete={onDelete} />
                </Space>
            ),
        },
        {
            key: 'action',
            render: (data: any, record: any) => {
                return (
                    <Space size="middle">
                        {data?.giaHan === 0 ? ''
                            : <a className="btn btn-lg btn-danger" onClick={() => onUpdateDate(data?.hdDenNgay, data?.hdTuNgay, data?.id, data?.ngayKy)}>Gia Hạn</a>}

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
            label: 'Tên Cán Bộ',
            key: 'tenCanBo',
        },
        {
            label: 'Từ ngày',
            key: 'thoiGianBD',
        },
        {
            label: 'Loại hợp đồng',
            key: 'loaiHopDong',
        },
        {
            label: 'Nghề nghiệp',
            key: 'ngheNghiep',
        },
        {
            label: 'Bộ Môn',
            key: 'boMon'
        },
        {
            label: 'Đến ngày',
            key: 'thoiGianKT',
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
                Danh sách hợp đồng
            </Typography.Title>
            <Form
                layout='inline'
                className={styles.warp}
            >
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn loại hợp đồng</Typography.Text>
                    <Select
                        placeholder='Chọn loại hợp đồng'
                        className={styles.cardFormInput}
                        onChange={(e) => { setcontractDi(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {contractOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.items}
                >
                    <Typography.Text className={styles.title_item}>Chọn cán bộ</Typography.Text>
                    <Select
                        placeholder='Chọn tên cán bộ'
                        className={styles.cardFormInput}
                        onChange={(e) => { setOfficer(e) }}
                    >
                        <Select.Option key={9} value={null}>{'Tất cả'}</Select.Option>
                        {userOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    className={styles.input_search}
                    style={{ width: 350 }}
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
                >
                    <Button className={styles.button} style={{ height: 44, width: 120 }}>
                        <Link to={'/admin/contractmanagement/add'}>Thêm</Link>
                    </Button>
                    <CSVLink headers={headers} data={data2} className={styles.btnEx} style={{ marginLeft: 130 }}>
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