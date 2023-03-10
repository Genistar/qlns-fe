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
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??ng tin h???p ?????ng ${key}`
                    }))
                    navigate('../');
                    Swal.fire({
                        title: `C???p nh???t th??nh c??ng`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `C?? l???i x???y ra`,
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
                        ten_hoat_dong: 'Th??m',
                        fkMaCanBo: cbId,
                        noiDung: `Th??ng tin h???p ?????ng ${isNameOff(users, value.fkMaCanBo)}`
                    }))
                    navigate('../');
                    Swal.fire({
                        title: `Th??m th??nh c??ng`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `C?? l???i x???y ra`,
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
                        <Typography.Title level={3}>Th??ng tin h???p ?????ng</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Lo???i h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaLoaiHD'
                                    key='fkMaLoaiHD'
                                >
                                    <Select placeholder='Ch???n lo???i h???p ?????ng' className={styles.cardFormInput}
                                        onChange={(e) => {
                                            const months: number = Number(contractType.find((data: any) => data.id === e)?.soThang);
                                            setContractT(months)
                                        }
                                        }>
                                        {cultivates}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>S??? h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='soHopDong'
                                >
                                    <Input placeholder='Nh???p s??? h???p ?????ng' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???p ?????ng t??? ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdTuNgay'
                                    key='hdTuNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y' className={styles.cardFormInput} onChange={(e) => { setStart(e) }} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} style={{ display: contractT === 0 ? 'none' : 'block' }} className={styles.labelcardFormInput}>H???p ?????ng ?????n ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdDenNgay'
                                    key='hdDenNgay'
                                >
                                    <DatePicker
                                        placeholder='Ch???n ng??y'
                                        style={{ display: contractT === 0 ? 'none' : 'block' }}
                                        className={styles.cardFormInput}
                                    />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i l??m h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hDLDLamTai'
                                    key='hDLDLamTai'
                                >
                                    <Input placeholder='Nh???p n??i l??m' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y K??</Typography.Title>}
                                    style={{ marginBottom: 10, marginLeft: contractT === 0 ? -338 : 0 }}
                                    name='ngayKy'
                                >
                                    <DatePicker placeholder='Ch???n ng??y k??' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    {key ?
                        (<Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                            <Typography.Title level={3}>Ng?????i ?????i di???n</Typography.Title>
                            <Row>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??n A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benA'
                                        key='benA'
                                    >
                                        <Select placeholder='Ch???n b??n A' className={styles.cardFormInput}>
                                            {userOption}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>b??n A ch???c v???</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benAChucVu'
                                        key='benAChucVu'
                                    >
                                        <Select placeholder='Ch???n ch???c v???' className={styles.cardFormInput}>
                                            {positionAOption}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>b??n A qu???c t???ch</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benAQuocTich'
                                        key='benAQuocTich'
                                    >
                                        <Input placeholder='B??n A qu???c t???ch' className={styles.cardFormInput} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>??i???n tho???i b??n A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benADienThoai'
                                        key='benADienThoai'
                                    >
                                        <Input placeholder='S??? ??i???n tho???i b??n A' className={styles.cardFormInput} />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??n A ?????i di???n cho</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benADaiDienCho'
                                        key='benADaiDienCho'
                                    >
                                        <Input placeholder='S??? ??i???n tho???i b??n A' className={styles.cardFormInput} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>) : (<Col span={24} className={styles.mr} style={{ marginTop: -90 }}>
                            <Typography.Title level={3}>Ng?????i ?????i di???n</Typography.Title>
                            <Row>
                                <Col span={6}>
                                    <Form.Item
                                        label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??n A</Typography.Title>}
                                        style={{ marginBottom: 10 }}
                                        name='benA'
                                        key='benA'
                                    >
                                        <Select placeholder='Ch???n b??n A' className={styles.cardFormInput}>
                                            {userOption}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>)}

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
                                    <Select placeholder='Ch???n c??n b???' className={styles.cardFormInput} onChange={(e) => setOfficerId(e)}>
                                        {userOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngh??? nghi???p</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngheNghiep'
                                    key='ngheNghiep'
                                >
                                    <Input placeholder='Nh???p ngh??? nghi???p' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??? M??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hdFkMaBoMon'
                                    key='hdFkMaBoMon'
                                >
                                    <Select placeholder='Ch???n B??? m??n' className={styles.cardFormInput}>
                                        {subjectOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch???c danh chuy??n m??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chucDanhChuyenMon'
                                    key='chucDanhChuyenMon'
                                >
                                    <Input placeholder='Ch???c danh chuy??n m??n' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkMaChucVu'
                                    key='fkMaChucVu'
                                >
                                    <Select placeholder='Ch???n ch???c v???' className={styles.cardFormInput}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ph????ng ti???n ??i l???i</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuongTienDiLai'
                                    key='phuongTienDiLai'
                                >
                                    <Input placeholder='Ph????ng ti???n ??i l???i' className={styles.cardFormInput} />
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
                                    <Select placeholder='Ch???n b???c l????ng' className={styles.cardFormInput}>
                                        {salaryScaleOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??? s??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuong'
                                    key='heSoLuong'
                                >
                                    <Input placeholder='Nh???p h??? s??? l????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??nh th???c tr??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hinhThucTraLuong'
                                    key='hinhThucTraLuong'
                                >
                                    <Input placeholder='H??nh th???c tr??? l????ng' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ph??? C???p G???m</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phuCapGom'
                                    key='phuCapGom'
                                >
                                    <Input placeholder='Ph??? c???p ' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th???i gian tr??? l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianTraLuong'
                                    key='thoiGianTraLuong'
                                >
                                    <Input placeholder='Nh???p th???i gian tr??? l????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ti???n Th?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tienThuong'
                                    key='tienThuong'
                                >
                                    <Input placeholder='Nh???p ti???n th?????ng' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? n??ng l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNangLuong'
                                    key='cheDoNangLuong'
                                >
                                    <Input placeholder='Ch??? ????? n??ng l????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???o h??? lao ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='baoHoLDong'
                                    key='baoHoLDong'
                                >
                                    <Input placeholder='Nh???p B???o H??? Lao ?????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? ngh?? ng??i</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoNghiNgoio'
                                    key='cheDoNghiNgoio'
                                >
                                    <Input placeholder='Ch??? ????? ngh?? ng??i' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>85 %</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='c85PhanTram'
                                >
                                    <Input placeholder='Nh???p l????ng 85%' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H??? s??? l????ng In</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='heSoLuongIn'
                                >
                                    <Input placeholder='Nh???p h??? s??? l????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng???ch C??ng Ch???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fkIdNgach'
                                    key='fkIdNgach'
                                >
                                    <Select placeholder='Ch???n ng???ch c??ng ch???c' className={styles.cardFormInput}>
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
                                    <Input placeholder='C??ng vi???c ph???i l??m' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th???i gian l??m vi???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thoiGianLamViec'
                                    key='thoiGianLamViec'
                                >
                                    <Input placeholder='Th???i gian l??m vi???c' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>????? c??? l??m vi???c c???p ph??t</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dCuLamViecCapPhat'
                                    key='dcuLamViecCapPhat'
                                >
                                    <Input placeholder='Nh???p ????? c??? l??m vi???c c???p ph??t' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch??? ????? ????o t???o</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cheDoDaoTao'
                                    key='cheDoDaoTao'
                                >
                                    <Input placeholder='Ch???n ch??? ????? ????o t???o' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th??? vi???c t??? ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecTuNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y th??? vi???c' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Th??? vi???c ?????n ng??y</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='thuViecDenNgay'
                                >
                                    <DatePicker placeholder='Ch???n ng??y k???t th??c' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>????n v??? l??m vi???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='donViLamViecIn'
                                >
                                    <Input placeholder='Nh???p ????n v??? l??m vi???c' className={styles.cardFormInput} />
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
                                    <Input placeholder='Nh???p quy???n l???i' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bhyt / Bhxh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhxhbhyt'
                                    key='bhxhbhyt'
                                >
                                    <Input placeholder='Nh???p B???o hi???m y t??? b???o hi???m x?? h???i' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i ????ng k?? b???o hi???m y t???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noiDangKyBHYT'
                                >
                                    <Input placeholder='Nh???p n??i ????ng k??' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???o hi???m y t??? h???p ?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='bhytHDLV'
                                >
                                    <Input placeholder='Nh???p b???o hi???m y t??? h???p ?????ng' className={styles.cardFormInput} />
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
                                    <Input placeholder='Nh???p nh???ng th???a thu???n kh??c' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B???i th?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='boiThuong'
                                    key='boiThuong'
                                >
                                    <Input placeholder='Nh???p b???i th?????ng' className={styles.cardFormInput} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>


                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??n c??? 1</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu1'
                                >
                                    <Input placeholder='Nh???p c??n c??? 1' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??n c??? 2</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='canCu2'
                                >
                                    <Input placeholder='Nh???p c??n c??? 2' className={styles.cardFormInput} />
                                </Form.Item>


                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>huongKhoanThuong</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='huongKhoanThuong'
                                >
                                    <Input placeholder='Ch???n ng??y' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ghi Ch??</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ghiChu'
                                >
                                    <Input placeholder='Nh???p ghi ch??' className={styles.cardFormInput} />
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
                            {key ? 'C???p nh???t ' : 'Th??m '}
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button className={styles.btn} onClick={onBack}>Quay l???i</Button>
                    </Col>
                </Row>
            </Form>

        </Card >
    )
}

export default ContractAction