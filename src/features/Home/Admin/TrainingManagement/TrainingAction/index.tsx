import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { addTraining, getTraining, trainingSelector, updateTraining } from '../trainingSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { directorySelector, getMajorsD, getTrainingLevel, gettypeOfTrainingD } from '../../../../../slices/directorySlice';
import moment from 'moment';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const TrainingAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { typeOfTraining, trainingLevel, majors } = useAppSelector(directorySelector);
    const { training } = useAppSelector(trainingSelector)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getTrainingLevel())
        dispatch(gettypeOfTrainingD());
        dispatch(getMajorsD());
        dispatch(getTraining(key));
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                thoiGianBD: moment(training?.thoiGianBD),
                thoiGianKT: moment(training?.thoiGianKT),
                fkMaCanBo: training?.fkMaCanBo,
                fkMaBac: training?.fkMaBac,
                fkMaHeDaoTao: training?.fkMaHeDaoTao,
                nganhDaoTao: training?.nganhDaoTao,
                noiDaoTao: training?.noiDaoTao,
                quocGia: training?.quocGia,
                tenLuanAn: training?.tenLuanAn
            })
        }

    }, [training])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateTraining({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Mục Đào tạo ${key}`
                    }))
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        } else {
            dispatch(addTraining(value)).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thông tin đào tạo cho ${isNameOff(users, value.id)}`
                    })).then((res: any) => {
                        console.log(res.payload.errCode)
                    })
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
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
    const levelTOption = trainingLevel.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenBac}</Select.Option>
    ))
    const typeTOption = typeOfTraining.map((type, index) => (
        <Select.Option key={index} value={type.id}>{type.tenHeDaoTao}</Select.Option>
    ))
    const majorOption = majors.map((major, index) => (
        <Select.Option key={index} value={major.ten_nganh}>{major.ten_nganh}</Select.Option>
    ))
    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật quá trình đào tạo' : 'Thêm quá trình đạo tạo'}
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '2%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bậc đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaBac'
                        >
                            <Select placeholder='Chọn bậc đào tạo' className={styles.cardFormInput}>
                                {levelTOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Hệ Đào Tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaHeDaoTao'
                        >
                            <Select placeholder='Chọn hệ đào tạo' className={styles.cardFormInput}>
                                {typeTOption}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngành đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='nganhDaoTao'
                        >
                            <Select placeholder='Chọn ngành đào tạo' className={styles.cardFormInput}>
                                {majorOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiDaoTao'
                        >
                            <Input placeholder='Nhập nơi đào tạo' className={styles.cardFormInput} />
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên luận án</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='tenLuanAn'
                        >
                            <Input placeholder='Nhập tên luận án' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Thời gian bắt đầu</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='thoiGianBD'
                        >
                            <DatePicker className={styles.cardFormInput} format={'DD/MM/YYYY'} value={moment(training?.thoiGianBD, 'DD/MM/YYYY')} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Thời gian kết thúc</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='thoiGianKT'
                        >
                            <DatePicker className={styles.cardFormInput} format={'DD/MM/YYYY'} />
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginTop: '-2%' }}>

                        <Col span={6}>
                            <Button
                                className={styles.btn}
                                style={{ backgroundColor: '#ff1506', color: 'white' }}
                                htmlType='submit'
                            >
                                {key ? 'Cập nhật' : 'Thêm'}
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

export default TrainingAction