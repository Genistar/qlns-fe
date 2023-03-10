import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { hvptHeOption, hvptLopOption, llctOption, nationOption, qlgdOption, qlnnOption, sexOptions, tdnnOption, tdptOption, tdthOption } from '../../../../../constant/selectOption';
import { directorySelector, getAcademicRankD, getCivilServant, getDegreeD, getMajorsD, getNationD, getPosition, getReligionD, getSubjectsD, getTypeOfOfficer } from '../../../../../slices/directorySlice';
import { getAllCities, getAllDistricts, getAllWards, locationUserSelector } from '../../../../../slices/locationSlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getBase64 } from '../../../../../utils/getBase64';
import { addPersonal, userSelector, getUser, updatePersonal } from '../../../../Auth/userSlice';
import { addAccount } from '../../Setting/Account/accountSlice';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import styles from '../Style.module.scss'
type QuizParams = {
    key: any;
};
type Props = {}

const PersonalAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const [previewAvatar, setPreviewAvatar] = useState<any>();
    const [cityId, setCityId] = useState<any>(null);
    const [districtId, setdistrictId] = useState<any>(null);
    const [avatar, setAvatar] = useState<any>();
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { user } = useAppSelector(userSelector);
    const { academicRank, degreeD, majors, subject, religionD, nationD, typeOfficer, position, civilServant } = useAppSelector(directorySelector);
    const { wards, cities, districts, authLoading } = useAppSelector(locationUserSelector)
    useEffect(() => {
        dispatch(getUser(key))
    }, [key])
    useEffect(() => {
        dispatch(getAcademicRankD());
        dispatch(getDegreeD());
        dispatch(getMajorsD());
        dispatch(getSubjectsD());
        dispatch(getReligionD());
        dispatch(getNationD())
        dispatch(getTypeOfOfficer());
        dispatch(getPosition())
        dispatch(getCivilServant())
    }, [])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...user,
                ngay_sinh: moment(user?.ngay_sinh),
                ngay_vao_truong: moment(user?.ngay_vao_truong),
                ngay_vao_dang_chinh_thuc: moment(user?.ngay_vao_dang_chinh_thuc, 'DD/MM/YYYY'),
                ngay_nhap_ngu: moment(user?.ngay_nhap_ngu, 'DD/MM/YYYY'),
                ngay_xuat_ngu: moment(user?.ngay_xuat_ngu, 'DD/MM/YYYY'),
                ngay_cap: moment(user?.ngay_cap),
                id: user?.id,
                dia_chi: user?.dia_chi,
                ho: user?.ho,
                ten: user?.ten,
                email: user?.email,
                dien_thoai: user?.dien_thoai,
                ma_bo_mon: user?.ma_bo_mon,
                ma_hoc_vi: user?.ma_hoc_vi,
                ma_hoc_ham: user?.ma_hoc_ham,
                fk_loai_can_bo: user?.fk_loai_can_bo,
                phai: user?.phai,
                noi_sinh: user?.noi_sinh,
                que_quan: user?.que_quan,
                fk_ma_dan_toc: user?.fk_ma_dan_toc,
                fk_nganh: user?.fk_nganh,
                fk_ma_ton_giao: user?.fk_ma_ton_giao
            })
        }
    }, [user])

    useEffect(() => {
        dispatch(getAllCities())
    }, [])
    useEffect(() => {
        if (cityId) {
            dispatch(getAllDistricts(cityId))
        } else {
            return
        }
    }, [cityId])
    useEffect(() => {
        if (districtId) {
            dispatch(getAllWards(districtId))
        } else {
            return
        }

    }, [districtId])

    const onFinish = (value: any) => {
        let tinh_tp = cities.find((data: any) => data.id === value.tinh_tp);
        let xa_phuong = wards.find((data: any) => data.id === value.xa_phuong);
        let quan_huyen = districts.find((data: any) => data.id === value.quan_huyen)
        if (key) {
            dispatch(updatePersonal({
                ...value,
                id: key,
                hinh_anh: avatar,
                tinh_tp: tinh_tp?.name,
                quan_huyen: quan_huyen?.name,
                xa_phuong: xa_phuong?.name,
                ngay_nhap_ngu: moment(value.ngay_nhap_ngu).format('DD/MM/YYYY'),
                ngay_xuat_ngu: moment(value.ngay_xuat_ngu).format('DD/MM/YYYY'),
                ngay_vao_dang_chinh_thuc: moment(value.ngay_vao_dang_chinh_thuc).format('DD/MM/YYYY'),

            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??m th??ng tin c??n b??? ${value.ho + ' ' + value.ten}`
                    }))
                    navigate('../')
                    Swal.fire({
                        title: `C???p nh???t th??nh c??ng`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                } else {
                    Swal.fire({
                        title: `???? x???y ra l???i !!`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            }
            )
        } else {

            dispatch(addPersonal({
                hinh_anh: avatar,
                tinh_tp: tinh_tp?.name,
                quan_huyen: quan_huyen?.name,
                xa_phuong: xa_phuong?.name,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addAccount({
                        cbId: value.id,
                        username: value.email,
                        password: '12345',
                        role: 'user'
                    }))
                    dispatch(addDaily({
                        ten_hoat_dong: 'Th??m c??n b???',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??ng tin c??n b??? ${value.ho + ' ' + value.ten}`
                    }))
                    navigate('../')
                    Swal.fire({
                        title: `Th??m th??nh c??ng`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                } else {
                    Swal.fire({
                        title: `???? x???y ra l???i`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }

            }
            )
        }
    }
    let citiesOption = cities.map((c: any, index) => (
        {
            value: c.id,
            label: c.name
        }
    ))
    let districtsOption = districts.map((d: any, index) => (
        {
            value: d.id,
            label: d.name
        }
    ))
    let wardsOption = wards.map((w: any, index) => (
        {
            value: w.id,
            label: w.name
        }
    ))
    const hocViOption = degreeD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten}</Select.Option>
    ))
    const hocHamOption = academicRank.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten}</Select.Option>
    ))
    const nganhOption = majors.map((d: any, index) => (
        <Select.Option key={index} value={d.id.toString()}>{d.ten_nganh}</Select.Option>
    ))
    const tongiaoOption = religionD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten_ton_giao}</Select.Option>
    ))
    const dantocOption = nationD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten_dan_toc}</Select.Option>
    ))
    const bomonOption = subject.map((d: any, index) => (
        <Select.Option key={index} value={d.id.toString()}>{d.ten_bo_mon}</Select.Option>
    ))
    const typeOfOption = typeOfficer.map((d: any, index: number) => (
        <Select.Option key={index} value={d.id.toString()}>{d.ten_loai_can_bo}</Select.Option>
    ))
    const positionOption = position.map((d: any, index: number) => (
        <Select.Option key={index} value={d.id.toString()}>{d.ten_chuc_vu}</Select.Option>
    ))
    const civilRankOption = civilServant.map((d: any, index: number) => (
        <Select.Option key={index} value={d.id.toString()}>{d.tenNgach}</Select.Option>
    ))
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container}>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ height: 500, overflowY: 'scroll', overflowX: 'hidden', left: 16, top: 16 }}>
                    <Col span={24} className={styles.mr} style={{ height: 300 }}>
                        <Typography.Title level={3}>Th??ng tin c?? b???n</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                // name={'hinh_anh'}
                                >
                                    <img
                                        width={'65%'}
                                        src={previewAvatar ? previewAvatar : user?.hinh_anh !== undefined ? 'http://localhost:4444/' + user?.hinh_anh.slice(4, 200) : ''}
                                        style={{ width: 220, height: 220, borderRadius: '100%', border: '0.8px solid #000000', marginLeft: '10%' }}
                                    />
                                    <input
                                        type='file'
                                        className={`${styles.custom_file_input}`}
                                        onChange={async (event: any) => {
                                            const data = event.target.files[0];
                                            const stringBase64 = await getBase64(data);
                                            setPreviewAvatar(stringBase64)
                                            setAvatar(event.target.files[0])
                                        }}
                                        style={{ marginTop: -230, marginLeft: 10 }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>M?? c??n b???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='id'
                                    key='id'
                                >
                                    <Input placeholder='Nh???p m?? c??n b???' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Email</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='email'
                                    key={'email'}
                                >
                                    <Input placeholder='Nh???p Email' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>D??n t???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_dan_toc'
                                    key='fk_ma_dan_toc'
                                >
                                    <Select placeholder='Ch???n d??n t???c' className={styles.cardFormInput}>
                                        {dantocOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ho'
                                    key='ho'
                                >
                                    <Input placeholder='Nh???p h???' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>S??? ??i???n tho???i</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dien_thoai'
                                    key='dien_thoai'
                                >
                                    <Input placeholder='Nh???p ??i???n tho???i' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>T??n gi??o</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_ton_giao'
                                >
                                    <Select placeholder='Ch???n t??n gi??o' className={styles.cardFormInput}>
                                        {tongiaoOption}
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>T??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ten'
                                    key='ten'
                                >
                                    <Input placeholder='Nh???p t??n' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Gi???i t??nh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phai'
                                >
                                    <Select placeholder='Ch???n gi???i t??nh' options={sexOptions} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>S??? hi???u c??ng ch???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='shcc'
                                >
                                    <Input placeholder='Ch???n shcc' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>?????a ch???:</Typography.Title>}
                                    className={styles.items}
                                    name='dia_chi'
                                    style={{ width: 200 }}
                                >
                                    <Input placeholder='Nh???p s??? nh??/ ???????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y sinh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_sinh'
                                >
                                    <DatePicker placeholder='Ch???n ng??y sinh' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>CMND/CCCD</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='so_cmnd'
                                >
                                    <Input placeholder='Nh???p s??? cmnd/cccd' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tinh/TP</Typography.Title>}
                                    className={styles.items}
                                    name='tinh_tp'
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder='Ch???n t???nh'
                                        className={styles.cardFormInput}
                                        options={citiesOption}
                                        onChange={(e) => {
                                            if (e !== cityId) {
                                                setCityId(e)
                                                setdistrictId(null);
                                                districtsOption = []
                                                wardsOption = []
                                            }
                                        }}
                                        loading={authLoading}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i sinh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_sinh'
                                >
                                    <Input placeholder='Ch???n n??i sinh' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y c???p</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_cap'
                                >
                                    <DatePicker placeholder='Ch???n ng??y c???p' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu???n/Huy???n</Typography.Title>}
                                    className={styles.items}
                                    name='quan_huyen'
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder='Ch???n Qu???n/Huy???n'
                                        className={styles.cardFormInput}
                                        onChange={(e) => {
                                            if (e !== cityId) {
                                                setdistrictId(e);
                                                wardsOption = []
                                            }
                                        }}
                                        loading={authLoading}
                                        defaultValue={districtId}
                                        options={districtsOption}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu?? qu??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='que_quan'
                                >
                                    <Input placeholder='Ch???n qu?? qu??n' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i c???p</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_cap'
                                >
                                    <Input placeholder='Ch???n n??i c???p' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>X??/Ph?????ng</Typography.Title>}
                                    className={styles.items}
                                    name='xa_phuong'
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder='Ch???n X??/Ph?????ng'
                                        className={styles.cardFormInput}
                                        options={wardsOption}
                                        loading={authLoading}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu???c t???ch</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quoc_tich'
                                >
                                    <Select placeholder='Ch???n qu???c t???ch' options={nationOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng???ch l????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_id_ngach'
                                >
                                    <Select placeholder='Ch???n ngach' className={styles.cardFormInput}>
                                        {civilRankOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 240 }}>
                        <Typography.Title level={3}>Th??ng tin c?? nh??n</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chi???u cao</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chieu_cao'
                                    key='chieu_cao'
                                >
                                    <Input placeholder='Nh???p chi???u cao' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Lo???i c??n b???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_maloai_can_bo'
                                    key='fk_maloai_can_bo'
                                >
                                    <Select placeholder='Ch???n lo???i c??n b???' className={styles.cardFormInput}>
                                        {typeOfOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y v??o tr?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_vao_truong'
                                    key='ngay_vao_truong'
                                >
                                    <DatePicker placeholder='Ch???n ng??y v??o tr?????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y v??o ?????ng ch???nh th???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_vao_dang_chinh_thuc'
                                    key='ngay_vao_dang_chinh_thuc'
                                >
                                    <DatePicker placeholder='Ch???n ng??y v??o ?????ng ch??nh th???c' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??n n???ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='can_nang'
                                    key='can_nang'
                                >
                                    <Input placeholder='Nh???p c??n n???ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chuy??n ng??nh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_nganh'
                                    key='fk_nganh'
                                >
                                    <Select placeholder='Ch???n ng??nh' className={styles.cardFormInput}>
                                        {nganhOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngh??? nghi???p tuy???n d???ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nghe_nghiep_tuyen_dung'
                                    key='nghe_nghiep_tuyen_dung'
                                >
                                    <Input placeholder='Ph????ng ti???n ??i l???i' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y nh???p ng??</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_nhap_ngu'
                                    key='ngay_nhap_ngu'
                                >
                                    <DatePicker placeholder='Ch???n ng??y nh???p ng??' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nh??m m??u</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nhom_mau'
                                    key='nhom_mau'
                                >
                                    <Select placeholder='Ch???n nh??m m??u' className={styles.cardFormInput}>
                                        <Select.Option key='A' value='A'>A</Select.Option>
                                        <Select.Option key='B' value='B'>B</Select.Option>
                                        <Select.Option key='AB' value='AB'>AB</Select.Option>
                                        <Select.Option key='O' value='O'>O</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>B??? m??n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_bo_mon'
                                    key='ma_bo_mon'
                                >
                                    <Select placeholder='Ch???n b??? m??n' className={styles.cardFormInput}>
                                        {bomonOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>C??ng vi???c ch??nh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cong_viec_chinh'
                                    key='cong_viec_chinh'
                                >
                                    <Input placeholder='Nh???p c??ng vi???c ch??nh' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ng??y xu???t ng??</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_xuat_ngu'
                                    key='ngay_xuat_ngu'
                                >
                                    <DatePicker placeholder='Ch???n ng??y xu???t ng??' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>T??nh tr???ng s???c kh???e</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tinh_trang_suc_khoe'
                                    key='tinh_trang_suc_khoe'
                                >
                                    <Input placeholder='Ch???n t??nh tr???ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ch???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_chuc_vu'
                                    key='fk_chuc_vu'
                                >
                                    <Select placeholder='Ch???n ch???c v???' className={styles.cardFormInput}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??ng l???c s??? tr?????ng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nang_luc_so_truong_nk'
                                    key='nang_luc_so_truong_nk'
                                >
                                    <Input placeholder='Nh???p n??ng l???c s??? tr?????ng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu??n h??m cao nh???t</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quan_ham_cao_nhat'
                                    key='quan_ham_cao_nhat'
                                >
                                    <Input placeholder='Nh???p qu??n h???m' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Tr??nh ????? chuy??n m??n</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_hoc_vi'
                                    key='ma_hoc_vi'
                                >
                                    <Select placeholder='Ch???n h???c v???' className={styles.cardFormInput}>
                                        {hocViOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???c h??m</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_hoc_ham'
                                    key='ma_hoc_ham'
                                >
                                    <Select placeholder='Ch???n h???c h??m' className={styles.cardFormInput}>
                                        {hocHamOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tr??nh ????? h???c v???n</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_td_pho_thong'
                                    key='fk_td_pho_thong'
                                >
                                    <Select placeholder='Ch???n tr??nh ????? h???c v???n' className={styles.cardFormInput} options={tdptOption} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tr??nh ????? tin h???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_tdo_tin_hoc'
                                    key='fk_ma_tdo_tin_hoc'
                                >
                                    <Select placeholder='Ch???n tr??nh ????? tin h???c' options={tdthOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??m ?????t h???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nam_dat_hoc_vi'
                                    key='nam_dat_hoc_vi'
                                >
                                    <Input placeholder='N??m ?????t h???c v???' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??m phong h???c h??m</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nam_phong_hoc_ham'
                                    key='nam_phong_hoc_ham'
                                >
                                    <Input placeholder='Nh???p n??m phong h???c h??m' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tr??nh ????? l?? lu???n ch??nh tr???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_llct'
                                    key='fk_ma_trinh_do_llct'
                                >
                                    <Select placeholder='Ch???n tr??nh ????? l?? lu???n ch??nh tr???' options={llctOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tr??nh ????? ngo???i ng???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chung_chi_tieng_dan_toc'
                                    key='chung_chi_tieng_dan_toc'
                                >
                                    <Select placeholder='Ch???n tr??nh ????? ti???ng anh' options={tdnnOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>N??i ?????t h???c v???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_dat_hoc_vi'
                                    key='noi_dat_hoc_vi'
                                >
                                    <Input placeholder='N??i ?????t h???c v???' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu???n l?? nh?? n?????c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_qlnn'
                                    key='fk_ma_trinh_do_qlnn'
                                >
                                    <Select placeholder='Qu???n l?? nh?? n?????c' options={qlnnOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>L???p</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hvpt_lop'
                                    key='hvpt_lop'
                                >
                                    <Select placeholder='Ch???n l???p' options={hvptLopOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu???c gia ?????t h???c v??? </Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='qg_dat_hoc_vi'
                                    key='qg_dat_hoc_vi'
                                >
                                    <Input placeholder='Qu???c gia ?????t h???c v???' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Qu???n l?? gi??o d???c</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_qlgd'
                                    key='fk_ma_trinh_do_qlgd'
                                >
                                    <Select placeholder='Ch???n qu???n l?? gi??o d???c' options={qlgdOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>H???</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hvpt_he'
                                    key='hvpt_he'
                                >
                                    <Select placeholder='Ch???n h???' options={hvptHeOption} className={styles.cardFormInput} />
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

export default PersonalAction