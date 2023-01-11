import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { addCultivate, cultivateSelector, getCultivate, updateCultivate } from '../cultivateSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { directorySelector, cultivationFormD } from '../../../../../slices/directorySlice';
import moment from 'moment';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import Swal from 'sweetalert2';
type QuizParams = {
    key: any;
};
type Props = {}

const CultivateAction = (props: Props) => {
    let { key } = useParams<QuizParams>()
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { cultivationForm } = useAppSelector(directorySelector);
    const { cultivate } = useAppSelector(cultivateSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(cultivationFormD())
        dispatch(getCultivate(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                fkMaCanBo: cultivate?.fkMaCanBo,
                fkMaHinhThucBD: cultivate?.fkMaHinhThucBD,
                noiBoiDuong: cultivate?.noiBoiDuong,
                chungChiBoiDuong: cultivate?.chungChiBoiDuong,
                ghiChu: cultivate?.ghiChu,
                boiDuongTuNgay: moment(cultivate?.boiDuongTuNgay),
                boiDuongDenNgay: moment(cultivate?.boiDuongDenNgay),
                noiDungBoiDuong: cultivate?.noiDungBoiDuong
            })
        }
    }, [cultivate]);
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateCultivate({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thông tin mục bồi dưỡng ${key}`
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
                        title: `Đã xảy ra lỗi`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
        } else {
            dispatch(addCultivate(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thông tin mục bồi dưỡng cho ${isNameOff(users, value.fkMaCanBo)}`
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
                        title: `Đã xảy ra lỗi`,
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
    const cultivates = cultivationForm.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenHinhThuc}</Select.Option>
    ))

    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật ' : 'Thêm '} quá trình bồi dưỡng
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '5%', paddingLeft: '10%' }}>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaCanBo'
                        >
                            <Select placeholder='Chọn cán bộ' className={styles.cardFormInput}>
                                {userOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>HÌnh thức bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaHinhThucBD'
                        >
                            <Select placeholder='Chọn hình thức bồi dưỡng' className={styles.cardFormInput}>
                                {cultivates}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi Bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiBoiDuong'
                        >
                            <Input placeholder='Nhập nơi bồi dưỡng' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chứng chỉ bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chungChiBoiDuong'
                        >
                            <Input placeholder='Nhập chứng chỉ bồi dưỡng' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '5%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ghi Chú</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ghiChu'
                        >
                            <Input placeholder='Nhập ghi chú' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bồi dưỡng từ ngày</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='boiDuongTuNgay'
                        >
                            <DatePicker placeholder='Chọn ngày' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bồi dưỡng đến ngày</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='boiDuongDenNgay'
                        >
                            <DatePicker placeholder='Chọn ngày' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nội dung bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiDungBoiDuong'
                        >
                            <Input placeholder='Nhập nội dung bồi dưỡng' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%' }}>

                        <Col span={6}>
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
                </Row>
            </Form>

        </Card >
    )
}

export default CultivateAction