import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { addDiscipline, disciplineSelector, getDiscipline, updateDiscipline } from '../disciplineSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { directorySelector, getDisciplineD } from '../../../../../slices/directorySlice';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
import Swal from 'sweetalert2';
type QuizParams = {
    key: any;
};
type Props = {}

const DisciplineAction = (props: Props) => {
    let { key } = useParams<QuizParams>()
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { disciplineD } = useAppSelector(directorySelector);
    const { discipline } = useAppSelector(disciplineSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDisciplineD())
        dispatch(getDiscipline(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...discipline
            })
        }
    }, [discipline])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateDiscipline({
                id: key,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Thông tin mục kỹ luật ${key}`
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
            dispatch(addDiscipline(value)).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Mục kỹ luật cho cán bộ ${isNameOff(users, value.fkMaCanBo)}`
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
            console.log(value)
        }

    }
    const onBack = () => {
        navigate('../')
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const disciplineDOptions = disciplineD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKyLuat}</Select.Option>
    ))

    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật ' : 'Thêm '}quá trình bồi dưỡng kỷ luật
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '8%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Loại kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaKyLuat'
                        >
                            <Select placeholder='Chọn hình thức kỷ luật' className={styles.cardFormInput}>
                                {disciplineDOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Năm bị kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='namBiKyLuat'
                        >
                            <Input placeholder='Nhập năm bị kỷ luật' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Năm xóa kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='namXoaHieuLucKyLuat'
                        >
                            <Input placeholder='Năm bị kỹ luật' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='coQuan'
                        >
                            <Input placeholder='Nhập cơ quan' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan khác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='coQuanKhac'
                        >
                            <Input placeholder='Nhập cơ quan khác' className={styles.cardFormInput} />
                        </Form.Item>


                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ghi chú</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ghiChu'
                        >
                            <Input placeholder='Nhập ghi chú' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số tháng bị kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='soThangBiKyLuat'
                        >
                            <Input placeholder='Số tháng bị kỷ luật' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số công văn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='soCongVan'
                        >
                            <Input placeholder='Nhập số công văn' className={styles.cardFormInput} />
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginTop: '-2%' }}>

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

export default DisciplineAction