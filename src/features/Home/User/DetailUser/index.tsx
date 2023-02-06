import { Button, Card, Col, Form, Image, Input, Row, Typography, message as notice } from 'antd'
import moment from 'moment';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getUser, getUsers, updatePersonal, userSelector } from '../../../Auth/userSlice';
import styles from '../Style.module.scss'
import { getAll, trainingUserSelector } from '../TrainingUser/trainingUserSlice';
import { addDaily } from '../../Admin/Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../Admin/TrainingManagement/TrainingList';
import ModalPrintPDF from './Modal';
import { getBase64 } from '../../../../utils/getBase64';
import TabUser from './Tabs';
import { getAllCities, locationUserSelector } from '../../../../slices/locationSlice';
import Swal from 'sweetalert2';

type Props = {}

const DetailUser: React.FC = (props: Props) => {
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true);
    const [avatar, setAvatar] = useState<any>();
    const [previewAvatar, setPreviewAvatar] = useState<any>();
    const id = localStorage.getItem('cbId');
    const dispatch = useAppDispatch();
    const { user, users } = useAppSelector(userSelector);
    const { trainingsUser } = useAppSelector(trainingUserSelector)
    const { wards, cities, districts } = useAppSelector(locationUserSelector);
    const [form] = Form.useForm()
    useEffect(() => {
        dispatch(getUser(id))
        dispatch(getAll({ keyword: '', cbId: id }))
        dispatch(getUsers())
    }, [id])
    useEffect(() => {
        form.setFieldsValue({
            ...user,
            tinh_tp_dia_chi: user?.tinh_tp,
            xa_phuong_dia_chi: user?.xa_phuong,
            quan_huyen_dia_chi: user?.quan_huyen,
            ngay_sinh: moment(user?.ngay_sinh),
            ngay_cap: moment(user?.ngay_cap),
            ngay_vao_truong: moment(user?.ngay_vao_truong),
            ngay_vao_dang_chinh_thuc: moment(user?.ngay_vao_dang_chinh_thuc, 'DD/MM/YYYY'),
            ngay_nhap_ngu: moment(user?.ngay_nhap_ngu, 'DD/MM/YYYY'),
            ngay_xuat_ngu: moment(user?.ngay_xuat_ngu, 'DD/MM/YYYY'),
            ngay_vao_dang: moment(user?.ngay_vao_dang, 'DD/MM/YYYY'),
            ngay_vao_doan: moment(user?.ngay_vao_doan, 'DD/MM/YYYY'),
            phai: user?.phai === 1 ? 'Nam' : 'Nữ',
            noi_cap: user?.noi_cap
        })
    }, [user])
    const formData = new FormData()
    formData.append('hinh_anh', avatar)
    const onFinish = (value: any) => {
        if (id) {
            dispatch(updatePersonal({
                ...value,
                id: id,
                ho: user?.ho,
                ten: user?.ten,
                hinh_anh: avatar,
                dia_chi: value.dia_chi,
                tinh_tp: cities.find((data: any) => data.id === value.tinh_tp_dia_chi)?.name,
                xa_phuong: wards.find((data: any) => data.id === value.xa_phuong_dia_chi)?.name,
                quan_huyen: districts.find((data: any) => data.id === value.quan_huyen_dia_chi)?.name,
                ngay_nhap_ngu: moment(value.ngay_nhap_ngu).format('DD/MM/YYYY'),
                ngay_xuat_ngu: moment(value.ngay_xuat_ngu).format('DD/MM/YYYY'),
                ngay_vao_dang_chinh_thuc: moment(value.ngay_vao_dang_chinh_thuc).format('DD/MM/YYYY'),
                ngay_vao_dang: moment(value.ngay_vao_dang).format('DD/MM/YYYY'),
                ngay_vao_doan: moment(value.ngay_vao_doan).format('DD/MM/YYYY'),
                noi_sinh: value.noi_sinh,
                hvpt_lop: value.hvpt_lop,
                hvpt_he: value.hvpt_he,
                fk_ma_dan_toc: value.fk_ma_dan_toc,
                fk_ma_ton_giao: value.fk_ma_ton_giao,

            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: id,
                        noiDung: `Cập nhật thông tin cán bộ ${isNameOff(users, value.id)}`
                    }))
                    Swal.fire({
                        title: 'Thêm Thành công',
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: 'Đã xảy ra lỗi',
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
        }
    }
    //'http://localhost:4444/' + user?.hinh_anh.slice(4, 200)
    return (
        <Card className={styles.container}>
            <Typography.Title level={3}>Thông tin người dùng</Typography.Title>
            <Form
                layout='vertical'
                className={styles.form}
                form={form}
                onFinish={onFinish}
                encType='multipart/form-data'
            >
                <Row>
                    <Col flex={3}>
                        <Form.Item
                        // name={'hinh_anh'}
                        >
                            <img
                                width={'65%'}
                                src={previewAvatar ? previewAvatar : user?.hinh_anh !== null ? 'http://localhost:4444/' + user?.hinh_anh.slice(4, 200) : ''}
                                style={{ width: 250, height: 250, borderRadius: '100%', border: '0.8px solid #000000' }}
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
                                style={{ marginTop: -230, marginLeft: -20 }}
                            />
                        </Form.Item>
                    </Col>
                    <TabUser user={user} cities={cities} districts={districts} wards={wards} disableButton={disableButton} />
                    {/* <Col flex={5} style={{ left: -50 }}>
                        <Form.Item
                            label={<Typography.Text>Họ và tên</Typography.Text>}
                            className={styles.items}
                        // name='fullname'
                        >
                            <Input className={styles.input} value={`${user?.ho} ${user?.ten}`} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày sinh</Typography.Text>}
                            className={styles.items}
                            name='ngay_sinh'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Địa chỉ</Typography.Text>}
                            className={styles.items}
                            name='dia_chi'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Email</Typography.Text>}
                            className={styles.items}
                            name='email'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Số điện thoại</Typography.Text>}
                            className={styles.items}
                            name='dien_thoai'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Quê quán</Typography.Text>}
                            className={styles.items}
                            name='que_quan'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col>
                    <Col flex={5} style={{ left: -50 }}>
                        <Form.Item
                            label={<Typography.Text>Giới tính</Typography.Text>}
                            className={styles.items}
                            name='phai'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Học hàm</Typography.Text>}
                            className={styles.items}
                            name='ma_hoc_ham'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Học vị</Typography.Text>}
                            className={styles.items}
                            name='ma_hoc_vi'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Chuyên môn</Typography.Text>}
                            className={styles.items}
                            name='chuyen_mon'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Nơi sinh</Typography.Text>}
                            className={styles.items}
                            name='noi_sinh'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Chức vụ</Typography.Text>}
                            className={styles.items}
                            name='fk_chuc_vu'
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col> */}
                </Row>
                <Row className={styles.button} style={{ marginTop: 0, marginLeft: 120 }}>
                    <Button className={styles.btn} onClick={() => setDisableButton(!disableButton)}>
                        Sửa
                    </Button>
                    <Button htmlType='submit' className={`${styles.btn} ${styles.btnAc}`} type={'primary'}>
                        Xác nhận
                    </Button>
                    <ModalPrintPDF />
                </Row>
            </Form>
        </Card>
    )
}

export default DetailUser