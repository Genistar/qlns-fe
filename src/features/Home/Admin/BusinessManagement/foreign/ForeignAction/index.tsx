import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { addForeign, foreignSelector, getForeign, updateForeign } from '../foreignSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss';
import moment from 'moment';
import Swal from 'sweetalert2';
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';

type QuizParams = {
    key: any;
};
type Props = {}

const ForeignAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { foreign } = useAppSelector(foreignSelector)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getForeign(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                fkMaCanBo: foreign?.fkMaCanBo,
                soPassport: foreign?.soPassport,
                quocGia: foreign?.quocGia,
                noiden: foreign?.noiden,
                phanTramHuongLuong: foreign?.phanTramHuongLuong,
                nganhHoc: foreign?.nganhHoc,
                chiPhiCT: foreign?.chiPhiCT,
                ngayDi: moment(foreign?.ngayDi),
                ngayVe: moment(foreign?.ngayVe)
            })
        }
    }, [foreign])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateForeign({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Thông tin mục công tác ngoài nước ${key}`
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
            dispatch(addForeign(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Thông tin mục công tác ngoài nước cho ${isNameOff(users, value.fkMaCanBo)}`
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
    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật ' : 'Thêm '} quá trình công tác nước ngoài
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '5%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số Passport</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='soPassport'
                        >
                            <Input placeholder='Nhập passport' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Quốc gia</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='quocGia'
                        >
                            <Input placeholder='Nhập quốc gia' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi đến</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiden'
                        >
                            <Input placeholder='Nhập nơi đến' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Phần trăm hưởng lương</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='phanTramHuongLuong'
                        >
                            <Input placeholder='Nhập phần trăm hưởng lương' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngành học</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='nganhHoc'
                        >
                            <Input placeholder='Ngành học' className={styles.cardFormInput} />
                        </Form.Item>


                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chi phí công tác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chiPhiCT'
                        >
                            <Input placeholder='Nhập chi phí công tác' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngày đi</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ngayDi'
                        >
                            <DatePicker className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngày về</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ngayVe'
                        >
                            <DatePicker className={styles.cardFormInput} />
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginTop: '-1.5%' }}>

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

export default ForeignAction