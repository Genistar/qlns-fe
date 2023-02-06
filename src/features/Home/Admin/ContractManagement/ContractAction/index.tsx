import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { directorySelector, getCivilServant, getContractType, getDegreeD, getPosition, getSalaryScale, getSubjectsD } from '../../../../../slices/directorySlice';
import moment from 'moment';
import Swal from 'sweetalert2'
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import { addContract, contractSelector, getContract, updateContract } from '../contractSlice';
import { can_bo_giang_day } from '../../../../../interface';
import { degreeD } from '../../../../../interface/directory';
type QuizParams = {
    key: any;
};
type Props = {}

const ContractAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const [officerId, setOfficerId] = useState();
    const [contractT, setContractT] = useState<number | undefined>(undefined);
    const [start, setStart] = useState<any>();
    const [end, setEnd] = useState<any>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { contractType, subject, civilServant, salaryScale, position, degreeD } = useAppSelector(directorySelector);
    const { contract } = useAppSelector(contractSelector)
    const [form] = Form.useForm();
    let cbId = localStorage.getItem('cbId');
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getContractType())
        dispatch(getSubjectsD())
        dispatch(getCivilServant())
        dispatch(getSalaryScale())
        dispatch(getPosition())
        dispatch(getContract(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                hdTuNgay: moment(contract?.hdTuNgay),
                hdDenNgay: moment(contract?.hdDenNgay),
                ngayKy: moment(contract?.ngayKy),
                thuViecTuNgay: moment(contract?.thuViecTuNgay),
                thuViecDenNgay: moment(contract?.thuViecDenNgay),
                benA: contract?.benA,
                benAQuocTich: contract?.benAQuocTich,
                benAChucVu: contract?.benAChucVu,
                benADienThoai: contract?.benADienThoai,
                benADaiDienCho: contract?.benADaiDienCho,
                BenB: contract?.BenB,
                ngheNghiep: contract?.ngheNghiep,
                fkMaLoaiHD: contract?.fkMaLoaiHD,
                hdFkMaBoMon: contract?.hdFkMaBoMon,
                chucDanhChuyenMon: contract?.chucDanhChuyenMon,
                fkMaChucVu: contract?.fkMaChucVu,
                cvPhaiLam: contract?.cvPhaiLam,
                thoiGianLamViec: contract?.thoiGianLamViec,
                dCuLamViecCapPhat: contract?.dCuLamViecCapPhat,
                phuongTienDiLai: contract?.phuongTienDiLai,
                fkIdNgach: contract?.fkIdNgach,
                fkIdBac: contract?.fkIdBac,
                heSoLuong: contract?.heSoLuong,
                hinhThucTraLuong: contract?.hinhThucTraLuong,
                phuCapGom: contract?.phuCapGom,
                thoiGianTraLuong: contract?.thoiGianTraLuong,
                tienThuong: contract?.tienThuong,
                cheDoNangLuong: contract?.cheDoNangLuong,
                baoHoLDong: contract?.baoHoLDong,
                cheDoNghiNgoio: contract?.cheDoNghiNgoio,
                bhxhbhyt: contract?.bhxhbhyt,
                cheDoDaoTao: contract?.cheDoDaoTao,
                quyenLoiDuocHuong: contract?.quyenLoiDuocHuong,
                nhungThoaThuanKhac: contract?.nhungThoaThuanKhac,
                boiThuong: contract?.boiThuong,
                hDLDLamTai: contract?.hDLDLamTai,
                ghiChu: contract?.ghiChu,
                c85PhanTram: contract?.c85PhanTram,
                soHopDong: contract?.soHopDong,
                noiDangKyBHYT: contract?.noiDangKyBHYT,
                heSoLuongIn: contract?.heSoLuongIn,
                canCu1: contract?.canCu1,
                canCu2: contract?.canCu2,
                huongKhoanThuong: contract?.huongKhoanThuong,
                bhytHDLV: contract?.bhytHDLV,
                donViLamViecIn: contract?.donViLamViecIn
            })
        }
    }, [contract]);
    useEffect(() => {
        if (start) {
            form.setFieldValue('hdDenNgay', start.add(contractT, 'months'));
        }
    }, [start])
    useEffect(() => {
        if (officerId && !key) {
            const user = users.find((data: can_bo_giang_day) => data.id === officerId);
            dispatch(getDegreeD());
            form.setFieldsValue({
                ngheNghiep: user?.nghe_nghiep_tuyen_dung,
                hdFkMaBoMon: user?.ma_bo_mon,
                chucDanhChuyenMon: degreeD.find((data: degreeD) => data.id === user?.ma_hoc_vi)?.ten,
                fkMaChucVu: user?.fk_chuc_vu
            })
        }
    }, [officerId])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateContract({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Thông tin hợp đồng ${key}`
                    }))
                    navigate('../');
                    Swal.fire({
                        title: `Cập nhật thành công`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `Có lỗi xảy ra`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
        } else {
            const user = users.find((data: can_bo_giang_day) => data.id === value.benA);
            dispatch(addContract({
                ...value,
                benAQuocTich: user?.quoc_tich,
                benAChucVu: user?.fk_chuc_vu,
                benADienThoai: user?.dien_thoai,
                benADaiDienCho: user?.dien_thoai,
                giaHan: 0
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: cbId,
                        noiDung: `Thông tin hợp đồng ${isNameOff(users, value.fkMaCanBo)}`
                    }))
                    navigate('../');
                    Swal.fire({
                        title: `Thêm thành công`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `Có lỗi xảy ra`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
        }
    }
    const onBack = () => {
        navigate('../')
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const cultivates = contractType.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenLoaiHopDong}</Select.Option>
    ))
    const subjectOption = subject.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.ten_bo_mon}</Select.Option>
    ))
    const civilRankOption = civilServant.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenNgach}</Select.Option>
    ))
    const salaryScaleOption = salaryScale.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.heSoLuong}</Select.Option>
    ))
    const positionOption = position.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.ten_chuc_vu}</Select.Option>
    ))
    const positionAOption = position.map((l, index) => (
        <Select.Option key={index} value={l.ten_chuc_vu}>{l.ten_chuc_vu}</Select.Option>
    ))
    console.log(contractT === 0 ? 'true' : 'false')
    return (
        <Card className={styles.card_container}>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ height: 500, overflowY: 'scroll', overflowX: 'hidden', left: 16, top: 16 }}>
                    <Col span={24} className={styles.mr} style={{ height: 300 }}>
                        <Typography.Title level={3}>Thông tin hợp đồng</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Loại hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaLoaiHD'
                                    key='fkMaLoaiHD'
                                >
                                    <Select placeholder='Chọn loại hợp đồng' className={styles.cardFormInput}
                                        onChange={(e) => {
                                            const months: number = Number(contractType.find((data: any) => data.id === e)?.soThang);
                                            setContractT(months)
                                        }
                                        }>
                                        {cultivates}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Số hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='soHopDong'
                                >
                                    <Input placeholder='Nhập số hợp đồng' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hợp đồng từ ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdTuNgay'
                                    key='hdTuNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày' className={styles.cardFormInput} onChange={(e) => { setStart(e) }} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} style={{ display: contractT === 0 ? 'none' : 'block' }} className={styles.labelcardFormInput}>Hợp đồng đến ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdDenNgay'
                                    key='hdDenNgay'
                                >
                                    <DatePicker
                                        placeholder='Chọn ngày'
                                        style={{ display: contractT === 0 ? 'none' : 'block' }}
                                        className={styles.cardFormInput}
                                    />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi làm hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hDLDLamTai'
                                    key='hDLDLamTai'
                                >
                                    <Input placeholder='Nhập nơi làm' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày Ký</Typography.Title>}
                                    style={{ marginBottom: 10, marginLeft: contractT === 0 ? -338 : 0 }}
                                    name='ngayKy'
                                >
                                    <DatePicker placeholder='Chọn ngày ký' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    {key ?
                        (<Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                            <Typography.Title level={3}>Người đại diện</Typography.Title>
                            <Row>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bên A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benA'
                                        key='benA'
                                    >
                                        <Select placeholder='Chọn bên A' className={styles.cardFormInput}>
                                            {userOption}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>bên A chức vụ</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benAChucVu'
                                        key='benAChucVu'
                                    >
                                        <Select placeholder='Chọn chức vụ' className={styles.cardFormInput}>
                                            {positionAOption}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>bên A quốc tịch</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benAQuocTich'
                                        key='benAQuocTich'
                                    >
                                        <Input placeholder='Bên A quốc tịch' className={styles.cardFormInput} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>Điện thoại bên A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benADienThoai'
                                        key='benADienThoai'
                                    >
                                        <Input placeholder='Số điện thoại bên A' className={styles.cardFormInput} />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bên A đại diện cho</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benADaiDienCho'
                                        key='benADaiDienCho'
                                    >
                                        <Input placeholder='Số điện thoại bên A' className={styles.cardFormInput} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>) : (<Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                            <Typography.Title level={3}>Người đại diện</Typography.Title>
                            <Row>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bên A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benA'
                                        key='benA'
                                    >
                                        <Select placeholder='Chọn bên A' className={styles.cardFormInput}>
                                            {userOption}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>)}

                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Thông tin cán bộ</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tên cán bộ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='BenB'
                                    key='BenB'
                                >
                                    <Select placeholder='Chọn cán bộ' className={styles.cardFormInput} onChange={(e) => setOfficerId(e)}>
                                        {userOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nghề nghiệp</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngheNghiep'
                                    key='ngheNghiep'
                                >
                                    <Input placeholder='Nhập nghề nghiệp' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bộ Môn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdFkMaBoMon'
                                    key='hdFkMaBoMon'
                                >
                                    <Select placeholder='Chọn Bộ môn' className={styles.cardFormInput}>
                                        {subjectOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chức danh chuyên môn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chucDanhChuyenMon'
                                    key='chucDanhChuyenMon'
                                >
                                    <Input placeholder='Chức danh chuyên môn' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chức vụ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaChucVu'
                                    key='fkMaChucVu'
                                >
                                    <Select placeholder='Chọn chức vụ' className={styles.cardFormInput}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Phương tiện đi lại</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuongTienDiLai'
                                    key='phuongTienDiLai'
                                >
                                    <Input placeholder='Phương tiện đi lại' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Thông tin lương/ phụ cấp</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bậc lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdBac'
                                    key='fkIdBac'
                                >
                                    <Select placeholder='Chọn bậc lương' className={styles.cardFormInput}>
                                        {salaryScaleOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hệ số lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuong'
                                    key='heSoLuong'
                                >
                                    <Input placeholder='Nhập hệ số lương' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hình thức trả lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hinhThucTraLuong'
                                    key='hinhThucTraLuong'
                                >
                                    <Input placeholder='Hình thức trả lương' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Phụ Cấp Gồm</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuCapGom'
                                    key='phuCapGom'
                                >
                                    <Input placeholder='Phụ cấp ' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thời gian trả lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianTraLuong'
                                    key='thoiGianTraLuong'
                                >
                                    <Input placeholder='Nhập thời gian trả lương' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tiền Thưởng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tienThuong'
                                    key='tienThuong'
                                >
                                    <Input placeholder='Nhập tiền thưởng' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ nâng lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNangLuong'
                                    key='cheDoNangLuong'
                                >
                                    <Input placeholder='Chế độ nâng lương' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bảo hộ lao động</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='baoHoLDong'
                                    key='baoHoLDong'
                                >
                                    <Input placeholder='Nhập Bảo Hộ Lao Động' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ nghĩ ngơi</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNghiNgoio'
                                    key='cheDoNghiNgoio'
                                >
                                    <Input placeholder='Chế độ nghĩ ngơi' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>85 %</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='c85PhanTram'
                                >
                                    <Input placeholder='Nhập lương 85%' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hệ số lương In</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuongIn'
                                >
                                    <Input placeholder='Nhập hệ số lương' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngạch Công Chức</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdNgach'
                                    key='fkIdNgach'
                                >
                                    <Select placeholder='Chọn ngạch công chức' className={styles.cardFormInput}>
                                        {civilRankOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Thông tin công việc</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Công việc phải làm</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cvPhaiLam'
                                    key='cvPhaiLam'
                                >
                                    <Input placeholder='Công việc phải làm' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thời gian làm việc</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianLamViec'
                                    key='thoiGianLamViec'
                                >
                                    <Input placeholder='Thời gian làm việc' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Đề cử làm việc cấp phát</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dCuLamViecCapPhat'
                                    key='dcuLamViecCapPhat'
                                >
                                    <Input placeholder='Nhập đề cử làm việc cấp phát' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ đào tạo</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoDaoTao'
                                    key='cheDoDaoTao'
                                >
                                    <Input placeholder='Chọn chế độ đào tạo' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thử việc từ ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecTuNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày thử việc' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thử việc đến ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecDenNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày kết thúc' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Đơn vị làm việc</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='donViLamViecIn'
                                >
                                    <Input placeholder='Nhập đơn vị làm việc' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Thông tin quyền lợi</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quyền lợi được hưởng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quyenLoiDuocHuong'
                                    key='quyenLoiDuocHuong'
                                >
                                    <Input placeholder='Nhập quyền lợi' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bhyt / Bhxh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhxhbhyt'
                                    key='bhxhbhyt'
                                >
                                    <Input placeholder='Nhập Bảo hiểm y tế bảo hiểm xã hội' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi đăng ký bảo hiểm y tế</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noiDangKyBHYT'
                                >
                                    <Input placeholder='Nhập nơi đăng ký' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bảo hiểm y tế hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhytHDLV'
                                >
                                    <Input placeholder='Nhập bảo hiểm y tế hợp đồng' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Khác</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Những thỏa thuận khác</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nhungThoaThuanKhac'
                                    key='nhungThoaThuanKhac'
                                >
                                    <Input placeholder='Nhập những thỏa thuận khác' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bồi thường</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='boiThuong'
                                    key='boiThuong'
                                >
                                    <Input placeholder='Nhập bồi thường' className={styles.cardFormInput} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>


                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Căn cứ 1</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu1'
                                >
                                    <Input placeholder='Nhập căn cứ 1' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Căn cứ 2</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu2'
                                >
                                    <Input placeholder='Nhập căn cứ 2' className={styles.cardFormInput} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>huongKhoanThuong</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='huongKhoanThuong'
                                >
                                    <Input placeholder='Chọn ngày' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ghi Chú</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ghiChu'
                                >
                                    <Input placeholder='Nhập ghi chú' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.button}>

                    <Col span={6} style={{ marginRight: '5%' }}>
                        <Button
                            className={styles.btn}
                            style={{ backgroundColor: '#ff1506', color: 'white' }}
                            htmlType='submit'
                        >
                            {key ? 'Cập nhật ' : 'Thêm '}
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button className={styles.btn} onClick={onBack}>Quay lại</Button>
                    </Col>
                </Row>
            </Form>

        </Card >
    )
}

export default ContractAction