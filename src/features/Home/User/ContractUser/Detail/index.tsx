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
                    title: `???? x???y ra l???i`,
                    text: res.payload.errMessage,
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: `G???i y??u c???u cho admin th??nh c??ng`,
                    text: res.payload.errMessage,
                    icon: 'success'
                })
            }
        })
    }
    const showConfirm = () => {
        Swal.fire({
            title: `B???n c?? ch???c mu???n g???i y??u c???u gia h???n cho admin kh??ng?`,
            text: 'Gia h???n th??m ....',
            icon: 'question',
            showDenyButton: true,
            denyButtonText: 'Quay l???i',
            confirmButtonText: 'X??c nh???n'
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
                        <Typography.Title level={3}>Th??ng tin h???p ?????ng</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Lo???i h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaLoaiHD'
                                    key='fkMaLoaiHD'
                                >
                                    <Select placeholder='Ch???n lo???i h???p ?????ng' className={styles.cardFormInput} disabled={true}>
                                        {cultivates}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>S??? h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='soHopDong'
                                >
                                    <Input placeholder='Nh???p s??? h???p ?????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???p ?????ng t??? ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdTuNgay'
                                    key='hdTuNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???p ?????ng ?????n ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdDenNgay'
                                    key='hdDenNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i l??m h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hDLDLamTai'
                                    key='hDLDLamTai'
                                >
                                    <Input placeholder='Nh???p n??i l??m' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y K??</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngayKy'
                                >
                                    <DatePicker placeholder='Ch???n ng??y k??' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                        <Typography.Title level={3}>Ng?????i ?????i di???n</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??n A</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benA'
                                    key='benA'
                                >
                                    <Input placeholder='Nh???p b??n A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>b??n A ch???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benAChucVu'
                                    key='benAChucVu'
                                >
                                    <Select placeholder='Ch???n ch???c v???' className={styles.cardFormInput} disabled={true}>
                                        {positionAOption}
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>??i???n tho???i b??n A</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benADienThoai'
                                    key='benADienThoai'
                                >
                                    <Input placeholder='S??? ??i???n tho???i b??n A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??n A ?????i di???n cho</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='benADaiDienCho'
                                    key='benADaiDienCho'
                                >
                                    <Input placeholder='S??? ??i???n tho???i b??n A' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Th??ng tin c??n b???</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>T??n c??n b???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='BenB'
                                    key='BenB'
                                >
                                    <Select placeholder='Ch???n c??n b???' className={styles.cardFormInput} disabled={true}>
                                        {userOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngh??? nghi???p</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngheNghiep'
                                    key='ngheNghiep'
                                >
                                    <Input placeholder='Nh???p ngh??? nghi???p' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??? M??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdFkMaBoMon'
                                    key='hdFkMaBoMon'
                                >
                                    <Select placeholder='Ch???n B??? m??n' className={styles.cardFormInput} disabled={true}>
                                        {subjectOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch???c danh chuy??n m??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chucDanhChuyenMon'
                                    key='chucDanhChuyenMon'
                                >
                                    <Input placeholder='Ch???c danh chuy??n m??n' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaChucVu'
                                    key='fkMaChucVu'
                                >
                                    <Select placeholder='Ch???n ch???c v???' className={styles.cardFormInput} disabled={true}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ph????ng ti???n ??i l???i</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuongTienDiLai'
                                    key='phuongTienDiLai'
                                >
                                    <Input placeholder='Ph????ng ti???n ??i l???i' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Th??ng tin l????ng/ ph??? c???p</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???c l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdBac'
                                    key='fkIdBac'
                                >
                                    <Select placeholder='Ch???n b???c l????ng' className={styles.cardFormInput} disabled={true}>
                                        {salaryScaleOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??? s??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuong'
                                    key='heSoLuong'
                                >
                                    <Input placeholder='Nh???p h??? s??? l????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??nh th???c tr??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hinhThucTraLuong'
                                    key='hinhThucTraLuong'
                                >
                                    <Input placeholder='H??nh th???c tr??? l????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ph??? C???p G???m</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuCapGom'
                                    key='phuCapGom'
                                >
                                    <Input placeholder='Ph??? c???p ' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th???i gian tr??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianTraLuong'
                                    key='thoiGianTraLuong'
                                >
                                    <Input placeholder='Nh???p th???i gian tr??? l????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ti???n Th?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tienThuong'
                                    key='tienThuong'
                                >
                                    <Input placeholder='Nh???p ti???n th?????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? n??ng l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNangLuong'
                                    key='cheDoNangLuong'
                                >
                                    <Input placeholder='Ch??? ????? n??ng l????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???o h??? lao ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='baoHoLDong'
                                    key='baoHoLDong'
                                >
                                    <Input placeholder='Nh???p B???o H??? Lao ?????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? ngh?? ng??i</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNghiNgoio'
                                    key='cheDoNghiNgoio'
                                >
                                    <Input placeholder='Ch??? ????? ngh?? ng??i' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>85 %</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='c85PhanTram'
                                >
                                    <Input placeholder='Nh???p l????ng 85%' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??? s??? l????ng In</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuongIn'
                                >
                                    <Input placeholder='Nh???p h??? s??? l????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng???ch C??ng Ch???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdNgach'
                                    key='fkIdNgach'
                                >
                                    <Select placeholder='Ch???n ng???ch c??ng ch???c' className={styles.cardFormInput} disabled={true}>
                                        {civilRankOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Th??ng tin c??ng vi???c</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??ng vi???c ph???i l??m</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cvPhaiLam'
                                    key='cvPhaiLam'
                                >
                                    <Input placeholder='C??ng vi???c ph???i l??m' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th???i gian l??m vi???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianLamViec'
                                    key='thoiGianLamViec'
                                >
                                    <Input placeholder='Th???i gian l??m vi???c' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>????? c??? l??m vi???c c???p ph??t</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dCuLamViecCapPhat'
                                    key='dcuLamViecCapPhat'
                                >
                                    <Input placeholder='Nh???p ????? c??? l??m vi???c c???p ph??t' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? ????o t???o</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoDaoTao'
                                    key='cheDoDaoTao'
                                >
                                    <Input placeholder='Ch???n ch??? ????? ????o t???o' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th??? vi???c t??? ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecTuNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y th??? vi???c' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th??? vi???c ?????n ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecDenNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y k???t th??c' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>????n v??? l??m vi???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='donViLamViecIn'
                                >
                                    <Input placeholder='Nh???p ????n v??? l??m vi???c' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Th??ng tin quy???n l???i</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quy???n l???i ???????c h?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quyenLoiDuocHuong'
                                    key='quyenLoiDuocHuong'
                                >
                                    <Input placeholder='Nh???p quy???n l???i' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bhyt / Bhxh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhxhbhyt'
                                    key='bhxhbhyt'
                                >
                                    <Input placeholder='Nh???p B???o hi???m y t??? b???o hi???m x?? h???i' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i ????ng k?? b???o hi???m y t???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noiDangKyBHYT'
                                >
                                    <Input placeholder='Nh???p n??i ????ng k??' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???o hi???m y t??? h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhytHDLV'
                                >
                                    <Input placeholder='Nh???p b???o hi???m y t??? h???p ?????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Kh??c</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nh???ng th???a thu???n kh??c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nhungThoaThuanKhac'
                                    key='nhungThoaThuanKhac'
                                >
                                    <Input placeholder='Nh???p nh???ng th???a thu???n kh??c' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???i th?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='boiThuong'
                                    key='boiThuong'
                                >
                                    <Input placeholder='Nh???p b???i th?????ng' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>


                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??n c??? 1</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu1'
                                >
                                    <Input placeholder='Nh???p c??n c??? 1' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??n c??? 2</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu2'
                                >
                                    <Input placeholder='Nh???p c??n c??? 2' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>huongKhoanThuong</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='huongKhoanThuong'
                                >
                                    <Input placeholder='Ch???n ng??y' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ghi Ch??</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ghiChu'
                                >
                                    <Input placeholder='Nh???p ghi ch??' className={styles.cardFormInput} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.button} style={{ marginTop: '-40%', marginLeft: '25%' }}>
                    <Col span={6} style={{ marginRight: '5%' }}>
                        <Typography.Title level={5}>Tr???ng Th??i</Typography.Title>
                        {giaHan < 30 && giaHan > 7 ? 'G???n h???t h???n' : (giaHan < 7 && giaHan > 0 ? 'S???p h???t h???n' : (giaHan < 0 ? 'H???t h???n' : 'C??n h???n'))}
                    </Col>

                    <Col span={6} style={{ marginRight: '15%' }}>
                        <ModalPrintContract />
                    </Col>
                    <Col span={6}>
                        <WarningButton title='Gia h???n' giaHan={giaHan} showConfirm={showConfirm} />
                    </Col>
                </Row>
            </Form>

        </Card >
    )
}

export default ContractDetail