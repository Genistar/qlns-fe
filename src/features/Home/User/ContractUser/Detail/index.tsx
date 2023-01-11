import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice, Modal } from 'antd';
import { ExclamationCircleFilled, QuestionOutlined } from '@ant-design/icons'
import React, { useEffect, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../../Admin/PersonalManagement/Style.module.scss'
import { directorySelector, getCivilServant, getContractType, getPosition, getSalaryScale, getSubjectsD } from '../../../../../slices/directorySlice';
import moment from 'moment';
import { contractUserSelector, getAll, updateContractUser } from '../contractUserSlice';
import ModalPrintContract from '../ContractForm';
import { daysdifference } from '../../../../../utils/getDate';
import WarningButton from '../../../../../components/button/Warning';
import Swal from 'sweetalert2';
var { confirm } = Modal;
type QuizParams = {
    key: any;
};
type Props = {}

const ContractDetail = (props: Props) => {
    let { key } = useParams<QuizParams>()
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { contractType, subject, civilServant, salaryScale, position } = useAppSelector(directorySelector);
    const { contractUser } = useAppSelector(contractUserSelector)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    let cbId = localStorage.getItem('cbId')
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getContractType())
        dispatch(getSubjectsD())
        dispatch(getCivilServant())
        dispatch(getSalaryScale())
        dispatch(getPosition())
        dispatch(getAll({ cbId: cbId }))
    }, [cbId])
    const date: any = new Date();
    let giaHan = daysdifference(moment(contractUser?.hdDenNgay).toDate().getTime(), date.getTime());
    const onGiaHan = () => {
        dispatch(updateContractUser({
            BenB: cbId,
            giaHan: 1
        })).then((res) => {
            if (res.payload.errCode !== 0) {
                Swal.fire({
                    title: `Đã xảy ra lỗi`,
                    text: res.payload.errMessage,
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: `Gửi yêu cầu cho admin thành công`,
                    text: res.payload.errMessage,
                    icon: 'success'
                })
            }
        })
    }
    const showConfirm = () => {
        Swal.fire({
            title: `Bạn có chắc muốn gửi yêu cầu gia hạn cho admin không?`,
            text: 'Gia hạn thêm ....',
            icon: 'question',
            showDenyButton: true,
            denyButtonText: 'Quay lại',
            confirmButtonText: 'Xác nhận'
        }).then(response => {
            if (response.isConfirmed) {
                onGiaHan()
            }
        })
    };
    useEffect(() => {
        if (cbId) {
            form.setFieldsValue({
                hdTuNgay: moment(contractUser?.hdTuNgay),
                hdDenNgay: moment(contractUser?.hdDenNgay),
                ngayKy: moment(contractUser?.ngayKy),
                thuViecTuNgay: moment(contractUser?.thuViecTuNgay),
                thuViecDenNgay: moment(contractUser?.thuViecDenNgay),
                benA: contractUser?.benAQuocTich,
                benAChucVu: contractUser?.benAChucVu,
                benADienThoai: contractUser?.benADienThoai,
                benADaiDienCho: contractUser?.benADaiDienCho,
                BenB: contractUser?.BenB,
                ngheNghiep: contractUser?.ngheNghiep,
                fkMaLoaiHD: contractUser?.fkMaLoaiHD,
                hdFkMaBoMon: contractUser?.hdFkMaBoMon,
                chucDanhChuyenMon: contractUser?.chucDanhChuyenMon,
                fkMaChucVu: contractUser?.fkMaChucVu,
                cvPhaiLam: contractUser?.cvPhaiLam,
                thoiGianLamViec: contractUser?.thoiGianLamViec,
                dCuLamViecCapPhat: contractUser?.dCuLamViecCapPhat,
                phuongTienDiLai: contractUser?.phuongTienDiLai,
                fkIdNgach: contractUser?.fkIdNgach,
                fkIdBac: contractUser?.fkIdBac,
                heSoLuong: contractUser?.heSoLuong,
                hinhThucTraLuong: contractUser?.hinhThucTraLuong,
                phuCapGom: contractUser?.phuCapGom,
                thoiGianTraLuong: contractUser?.thoiGianTraLuong,
                tienThuong: contractUser?.tienThuong,
                cheDoNangLuong: contractUser?.cheDoNangLuong,
                baoHoLDong: contractUser?.baoHoLDong,
                cheDoNghiNgoio: contractUser?.cheDoNghiNgoio,
                bhxhbhyt: contractUser?.bhxhbhyt,
                cheDoDaoTao: contractUser?.cheDoDaoTao,
                quyenLoiDuocHuong: contractUser?.quyenLoiDuocHuong,
                nhungThoaThuanKhac: contractUser?.nhungThoaThuanKhac,
                boiThuong: contractUser?.boiThuong,
                hDLDLamTai: contractUser?.hDLDLamTai,
                ghiChu: contractUser?.ghiChu,
                c85PhanTram: contractUser?.c85PhanTram,
                soHopDong: contractUser?.soHopDong,
                noiDangKyBHYT: contractUser?.noiDangKyBHYT,
                heSoLuongIn: contractUser?.heSoLuongIn,
                canCu1: contractUser?.canCu1,
                canCu2: contractUser?.canCu2,
                huongKhoanThuong: contractUser?.huongKhoanThuong,
                bhytHDLV: contractUser?.bhytHDLV,
                donViLamViecIn: contractUser?.donViLamViecIn
            })
        }
    }, [contractUser]);
    const onFinish = (value: any) => {
        console.log(value)
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


    return (
        <Card className={styles.card_container}>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ height: 550, overflowY: 'scroll', overflowX: 'hidden', left: 16, top: 16 }}>
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
                                    <Select placeholder='Chọn loại hợp đồng' className={styles.cardFormInput} disabled={true}>
                                        {cultivates}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Số hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='soHopDong'
                                >
                                    <Input placeholder='Nhập số hợp đồng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hợp đồng từ ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdTuNgay'
                                    key='hdTuNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hợp đồng đến ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdDenNgay'
                                    key='hdDenNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi làm hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hDLDLamTai'
                                    key='hDLDLamTai'
                                >
                                    <Input placeholder='Nhập nơi làm' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày Ký</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngayKy'
                                >
                                    <DatePicker placeholder='Chọn ngày ký' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                        <Typography.Title level={3}>Người đại diện</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bên A</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benA'
                                    key='benA'
                                >
                                    <Input placeholder='Nhập bên A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>bên A chức vụ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benAChucVu'
                                    key='benAChucVu'
                                >
                                    <Select placeholder='Chọn chức vụ' className={styles.cardFormInput} disabled={true}>
                                        {positionAOption}
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Điện thoại bên A</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benADienThoai'
                                    key='benADienThoai'
                                >
                                    <Input placeholder='Số điện thoại bên A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bên A đại diện cho</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benADaiDienCho'
                                    key='benADaiDienCho'
                                >
                                    <Input placeholder='Số điện thoại bên A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
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
                                    <Select placeholder='Chọn cán bộ' className={styles.cardFormInput} disabled={true}>
                                        {userOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nghề nghiệp</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngheNghiep'
                                    key='ngheNghiep'
                                >
                                    <Input placeholder='Nhập nghề nghiệp' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bộ Môn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdFkMaBoMon'
                                    key='hdFkMaBoMon'
                                >
                                    <Select placeholder='Chọn Bộ môn' className={styles.cardFormInput} disabled={true}>
                                        {subjectOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chức danh chuyên môn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chucDanhChuyenMon'
                                    key='chucDanhChuyenMon'
                                >
                                    <Input placeholder='Chức danh chuyên môn' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chức vụ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaChucVu'
                                    key='fkMaChucVu'
                                >
                                    <Select placeholder='Chọn chức vụ' className={styles.cardFormInput} disabled={true}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Phương tiện đi lại</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuongTienDiLai'
                                    key='phuongTienDiLai'
                                >
                                    <Input placeholder='Phương tiện đi lại' className={styles.cardFormInput} disabled={true} />
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
                                    <Select placeholder='Chọn bậc lương' className={styles.cardFormInput} disabled={true}>
                                        {salaryScaleOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hệ số lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuong'
                                    key='heSoLuong'
                                >
                                    <Input placeholder='Nhập hệ số lương' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hình thức trả lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hinhThucTraLuong'
                                    key='hinhThucTraLuong'
                                >
                                    <Input placeholder='Hình thức trả lương' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Phụ Cấp Gồm</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuCapGom'
                                    key='phuCapGom'
                                >
                                    <Input placeholder='Phụ cấp ' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thời gian trả lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianTraLuong'
                                    key='thoiGianTraLuong'
                                >
                                    <Input placeholder='Nhập thời gian trả lương' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tiền Thưởng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tienThuong'
                                    key='tienThuong'
                                >
                                    <Input placeholder='Nhập tiền thưởng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ nâng lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNangLuong'
                                    key='cheDoNangLuong'
                                >
                                    <Input placeholder='Chế độ nâng lương' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bảo hộ lao động</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='baoHoLDong'
                                    key='baoHoLDong'
                                >
                                    <Input placeholder='Nhập Bảo Hộ Lao Động' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ nghĩ ngơi</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNghiNgoio'
                                    key='cheDoNghiNgoio'
                                >
                                    <Input placeholder='Chế độ nghĩ ngơi' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>85 %</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='c85PhanTram'
                                >
                                    <Input placeholder='Nhập lương 85%' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hệ số lương In</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuongIn'
                                >
                                    <Input placeholder='Nhập hệ số lương' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngạch Công Chức</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdNgach'
                                    key='fkIdNgach'
                                >
                                    <Select placeholder='Chọn ngạch công chức' className={styles.cardFormInput} disabled={true}>
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
                                    <Input placeholder='Công việc phải làm' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thời gian làm việc</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianLamViec'
                                    key='thoiGianLamViec'
                                >
                                    <Input placeholder='Thời gian làm việc' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Đề cử làm việc cấp phát</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dCuLamViecCapPhat'
                                    key='dcuLamViecCapPhat'
                                >
                                    <Input placeholder='Nhập đề cử làm việc cấp phát' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chế độ đào tạo</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoDaoTao'
                                    key='cheDoDaoTao'
                                >
                                    <Input placeholder='Chọn chế độ đào tạo' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thử việc từ ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecTuNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày thử việc' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Thử việc đến ngày</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecDenNgay'
                                >
                                    <DatePicker placeholder='Chọn ngày kết thúc' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Đơn vị làm việc</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='donViLamViecIn'
                                >
                                    <Input placeholder='Nhập đơn vị làm việc' className={styles.cardFormInput} disabled={true} />
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
                                    <Input placeholder='Nhập quyền lợi' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bhyt / Bhxh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhxhbhyt'
                                    key='bhxhbhyt'
                                >
                                    <Input placeholder='Nhập Bảo hiểm y tế bảo hiểm xã hội' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi đăng ký bảo hiểm y tế</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noiDangKyBHYT'
                                >
                                    <Input placeholder='Nhập nơi đăng ký' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bảo hiểm y tế hợp đồng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhytHDLV'
                                >
                                    <Input placeholder='Nhập bảo hiểm y tế hợp đồng' className={styles.cardFormInput} disabled={true} />
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
                                    <Input placeholder='Nhập những thỏa thuận khác' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bồi thường</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='boiThuong'
                                    key='boiThuong'
                                >
                                    <Input placeholder='Nhập bồi thường' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>


                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Căn cứ 1</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu1'
                                >
                                    <Input placeholder='Nhập căn cứ 1' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Căn cứ 2</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu2'
                                >
                                    <Input placeholder='Nhập căn cứ 2' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>huongKhoanThuong</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='huongKhoanThuong'
                                >
                                    <Input placeholder='Chọn ngày' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ghi Chú</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ghiChu'
                                >
                                    <Input placeholder='Nhập ghi chú' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.button} style={{ marginTop: '-40%', marginLeft: '25%' }}>
                    <Col span={6} style={{ marginRight: '5%' }}>
                        <Typography.Title level={5}>Trạng Thái</Typography.Title>
                        {giaHan < 30 && giaHan > 7 ? 'Gần hết hạn' : (giaHan < 7 && giaHan > 0 ? 'Sắp hết hạn' : (giaHan < 0 ? 'Hết hạn' : 'Còn hạn'))}
                    </Col>

                    <Col span={6} style={{ marginRight: '15%' }}>
                        <ModalPrintContract />
                    </Col>
                    <Col span={6}>
                        <WarningButton title='Gia hạn' giaHan={giaHan} showConfirm={showConfirm} />
                    </Col>
                </Row>
            </Form>

        </Card >
    )
}

export default ContractDetail