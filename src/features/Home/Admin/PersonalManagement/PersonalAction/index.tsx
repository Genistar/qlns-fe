import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
                id: key,
                hinh_anh: avatar,
                tinh_tp: tinh_tp?.name,
                quan_huyen: quan_huyen?.name,
                xa_phuong: xa_phuong?.name,
                ...value,
                ngay_nhap_ngu: moment(value.ngay_nhap_ngu).format('DD/MM/YYYY'),
                ngay_xuat_ngu: moment(value.ngay_xuat_ngu).format('DD/MM/YYYY'),
                ngay_vao_dang_chinh_thuc: moment(value.ngay_vao_dang_chinh_thuc).format('DD/MM/YYYY'),

            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thêm thông tin cán bộ ${value.ho + ' ' + value.ten}`
                    }))
                    navigate('../')
                    notice.success(res.payload.errMessage);
                } else {
                    notice.error(res.payload.errMessage);
                }

            }
            )
        } else {
            dispatch(addAccount({
                cbId: value.cbId,
                username: value.email,
                password: '12345',
                role: 'user'
            }))
            dispatch(addPersonal({
                hinh_anh: avatar,
                tinh_tp: tinh_tp?.name,
                quan_huyen: quan_huyen?.name,
                xa_phuong: xa_phuong?.name,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm cán bộ',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thông tin cán bộ ${value.ho + ' ' + value.ten}`
                    }))
                    navigate('../')
                    notice.success(res.payload.errMessage)
                } else {
                    notice.error(res.payload.errMessage)
                }

            }
            )
        }
        console.log(tinh_tp?.name)
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
                        <Typography.Title level={3}>Thông tin cơ bản</Typography.Title>
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
                                        style={{ marginTop: -230, marginLeft: 0 }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Mã cán bộ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='id'
                                    key='id'
                                >
                                    <Input placeholder='Nhập mã cán bộ' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Họ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ho'
                                >
                                    <Input placeholder='Nhập họ' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Dân tộc</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_dan_toc'
                                    key='fk_ma_dan_toc'
                                >
                                    <Select placeholder='Chọn dân tộc' className={styles.cardFormInput}>
                                        {dantocOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tên</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ten'
                                    key='ten'
                                >
                                    <Input placeholder='Nhập tên' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Số điện thoại</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='dien_thoai'
                                    key='dien_thoai'
                                >
                                    <Input placeholder='Nhập điện thoại' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tôn giáo</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_ton_giao'
                                >
                                    <Select placeholder='Chọn tôn giáo' className={styles.cardFormInput}>
                                        {tongiaoOption}
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Email</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='email'
                                    key='email'
                                >
                                    <Input placeholder='Nhập email' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Giới tính</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='phai'
                                >
                                    <Select placeholder='Chọn giới tính' options={sexOptions} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Số hiệu công chức</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='shcc'
                                >
                                    <Input placeholder='Chọn shcc' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Địa chỉ:</Typography.Title>}
                                    className={styles.items}
                                    name='dia_chi'
                                    style={{ width: 200 }}
                                >
                                    <Input placeholder='Nhập số nhà/ đường' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày sinh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_sinh'
                                >
                                    <DatePicker placeholder='Chọn ngày sinh' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>CMND/CCCD</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='so_cmnd'
                                >
                                    <Input placeholder='Nhập số cmnd/cccd' className={styles.cardFormInput} />
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
                                        placeholder='Chọn tỉnh'
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
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi sinh</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_sinh'
                                >
                                    <Input placeholder='Chọn nơi sinh' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày cấp</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_cap'
                                >
                                    <DatePicker placeholder='Chọn ngày cấp' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quận/Huyện</Typography.Title>}
                                    className={styles.items}
                                    name='quan_huyen'
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder='Chọn Quận/Huyện'
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
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quê quán</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='que_quan'
                                >
                                    <Input placeholder='Chọn quê quán' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi cấp</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_cap'
                                >
                                    <Input placeholder='Chọn nơi cấp' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Xã/Phường</Typography.Title>}
                                    className={styles.items}
                                    name='xa_phuong'
                                    style={{ width: 200 }}
                                >
                                    <Select
                                        placeholder='Chọn Xã/Phường'
                                        className={styles.cardFormInput}
                                        options={wardsOption}
                                        loading={authLoading}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quốc tịch</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quoc_tich'
                                >
                                    <Select placeholder='Chọn quốc tịch' options={nationOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngạch lương</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_id_ngach'
                                >
                                    <Select placeholder='Chọn ngach' className={styles.cardFormInput}>
                                        {civilRankOption}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 240 }}>
                        <Typography.Title level={3}>Thông tin cá nhân</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chiều cao</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chieu_cao'
                                    key='chieu_cao'
                                >
                                    <Input placeholder='Nhập chiều cao' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Loại cán bộ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_maloai_can_bo'
                                    key='fk_maloai_can_bo'
                                >
                                    <Select placeholder='Chọn loại cán bộ' className={styles.cardFormInput}>
                                        {typeOfOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày vào trường</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_vao_truong'
                                    key='ngay_vao_truong'
                                >
                                    <DatePicker placeholder='Chọn ngày vào trường' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày vào đảng chỉnh thức</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_vao_dang_chinh_thuc'
                                    key='ngay_vao_dang_chinh_thuc'
                                >
                                    <DatePicker placeholder='Chọn ngày vào đảng chính thức' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Cân nặng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='can_nang'
                                    key='can_nang'
                                >
                                    <Input placeholder='Nhập cân nặng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chuyên ngành</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_nganh'
                                    key='fk_nganh'
                                >
                                    <Select placeholder='Chọn ngành' className={styles.cardFormInput}>
                                        {nganhOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nghề nghiệp tuyển dụng</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nghe_nghiep_tuyen_dung'
                                    key='nghe_nghiep_tuyen_dung'
                                >
                                    <Input placeholder='Phương tiện đi lại' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày nhập ngũ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_nhap_ngu'
                                    key='ngay_nhap_ngu'
                                >
                                    <DatePicker placeholder='Chọn ngày nhập ngũ' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nhóm máu</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nhom_mau'
                                    key='nhom_mau'
                                >
                                    <Select placeholder='Chọn nhóm máu' className={styles.cardFormInput}>
                                        <Select.Option key='A' value='A'>A</Select.Option>
                                        <Select.Option key='B' value='B'>B</Select.Option>
                                        <Select.Option key='AB' value='AB'>AB</Select.Option>
                                        <Select.Option key='O' value='O'>O</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Bộ môn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_bo_mon'
                                    key='ma_bo_mon'
                                >
                                    <Select placeholder='Chọn bộ môn' className={styles.cardFormInput}>
                                        {bomonOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Công việc chính</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='cong_viec_chinh'
                                    key='cong_viec_chinh'
                                >
                                    <Input placeholder='Nhập công việc chính' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Ngày xuất ngũ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ngay_xuat_ngu'
                                    key='ngay_xuat_ngu'
                                >
                                    <DatePicker placeholder='Chọn ngày xuất ngũ' className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Tình trạng sức khỏe</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='tinh_trang_suc_khoe'
                                    key='tinh_trang_suc_khoe'
                                >
                                    <Input placeholder='Chọn tình trạng' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Chức vụ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_chuc_vu'
                                    key='fk_chuc_vu'
                                >
                                    <Select placeholder='Chọn chức vụ' className={styles.cardFormInput}>
                                        {positionOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Năng lực sở trường</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nang_luc_so_truong_nk'
                                    key='nang_luc_so_truong_nk'
                                >
                                    <Input placeholder='Nhập năng lực sở trường' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quân hàm cao nhất</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='quan_ham_cao_nhat'
                                    key='quan_ham_cao_nhat'
                                >
                                    <Input placeholder='Nhập quân hầm' className={styles.cardFormInput} />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className={styles.mr} style={{ marginTop: 0 }}>
                        <Typography.Title level={3}>Trình độ chuyên môn</Typography.Title>
                        <Row>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Học vị</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_hoc_vi'
                                    key='ma_hoc_vi'
                                >
                                    <Select placeholder='Chọn học vị' className={styles.cardFormInput}>
                                        {hocViOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Học hàm</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='ma_hoc_ham'
                                    key='ma_hoc_ham'
                                >
                                    <Select placeholder='Chọn học hàm' className={styles.cardFormInput}>
                                        {hocHamOption}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Trình độ học vấn</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_td_pho_thong'
                                    key='fk_td_pho_thong'
                                >
                                    <Select placeholder='Chọn trình độ học vấn' className={styles.cardFormInput} options={tdptOption} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Trình độ tin học</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_tdo_tin_hoc'
                                    key='fk_ma_tdo_tin_hoc'
                                >
                                    <Select placeholder='Chọn trình độ tin học' options={tdthOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Năm đạt học vị</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nam_dat_hoc_vi'
                                    key='nam_dat_hoc_vi'
                                >
                                    <Input placeholder='Năm đạt học vị' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Năm phong học hàm</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='nam_phong_hoc_ham'
                                    key='nam_phong_hoc_ham'
                                >
                                    <Input placeholder='Nhập năm phong học hàm' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Trình độ lý luận chính trị</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_llct'
                                    key='fk_ma_trinh_do_llct'
                                >
                                    <Select placeholder='Chọn trình độ lý luận chính trị' options={llctOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Trình độ ngoại ngữ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='chung_chi_tieng_dan_toc'
                                    key='chung_chi_tieng_dan_toc'
                                >
                                    <Select placeholder='Chọn trình độ tiếng anh' options={tdnnOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Nơi đạt học vị</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='noi_dat_hoc_vi'
                                    key='noi_dat_hoc_vi'
                                >
                                    <Input placeholder='Nơi đạt học vị' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quản lý nhà nước</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_qlnn'
                                    key='fk_ma_trinh_do_qlnn'
                                >
                                    <Select placeholder='Quản lý nhà nước' options={qlnnOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Lớp</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hvpt_lop'
                                    key='hvpt_lop'
                                >
                                    <Select placeholder='Chọn lớp' options={hvptLopOption} className={styles.cardFormInput} />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quốc gia đạt học vị </Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='qg_dat_hoc_vi'
                                    key='qg_dat_hoc_vi'
                                >
                                    <Input placeholder='Quốc gia đạt học vị' className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Quản lý giáo dục</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='fk_ma_trinh_do_qlgd'
                                    key='fk_ma_trinh_do_qlgd'
                                >
                                    <Select placeholder='Chọn quản lý giáo dục' options={qlgdOption} className={styles.cardFormInput} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Title level={5} className={styles.labelcardFormInput}>Hệ</Typography.Title>}
                                    style={{ marginBottom: 10 }}
                                    name='hvpt_he'
                                    key='hvpt_he'
                                >
                                    <Select placeholder='Chọn hệ' options={hvptHeOption} className={styles.cardFormInput} />
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

export default PersonalAction