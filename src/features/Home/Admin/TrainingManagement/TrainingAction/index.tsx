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
import Swal from 'sweetalert2';
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
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `M???c ????o t???o ${key}`
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
                        title: `???? x???y ra l???i`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }
            })
        } else {
            dispatch(addTraining(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Th??m',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??ng tin ????o t???o cho ${isNameOff(users, value.id)}`
                    })).then((res: any) => {
                        console.log(res.payload.errCode)
                    })
                    navigate('../');
                    Swal.fire({
                        title: `Th??m th??nh c??ng`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `???? x???y ra l???i`,
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
                {key ? 'C???p nh???t qu?? tr??nh ????o t???o' : 'Th??m qu?? tr??nh ?????o t???o'}
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '2%' }}>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>T??n c??n b???</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaCanBo'
                        >
                            <Select placeholder='Ch???n c??n b???' className={styles.cardFormInput}>
                                {userOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>B???c ????o t???o</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaBac'
                        >
                            <Select placeholder='Ch???n b???c ????o t???o' className={styles.cardFormInput}>
                                {levelTOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>H??? ????o T???o</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaHeDaoTao'
                        >
                            <Select placeholder='Ch???n h??? ????o t???o' className={styles.cardFormInput}>
                                {typeTOption}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ng??nh ????o t???o</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='nganhDaoTao'
                        >
                            <Select placeholder='Ch???n ng??nh ????o t???o' className={styles.cardFormInput}>
                                {majorOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>N??i ????o t???o</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiDaoTao'
                        >
                            <Input placeholder='Nh???p n??i ????o t???o' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Qu???c gia</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='quocGia'
                        >
                            <Input placeholder='Nh???p qu???c gia' className={styles.cardFormInput} />
                        </Form.Item>


                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>T??n lu???n ??n</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='tenLuanAn'
                        >
                            <Input placeholder='Nh???p t??n lu???n ??n' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Th???i gian b???t ?????u</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='thoiGianBD'
                        >
                            <DatePicker className={styles.cardFormInput} format={'DD/MM/YYYY'} value={moment(training?.thoiGianBD, 'DD/MM/YYYY')} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Th???i gian k???t th??c</Typography.Title>}
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
                                {key ? 'C???p nh???t' : 'Th??m'}
                            </Button>
                        </Col>
                        <Col span={6}>
                            <Button className={styles.btn} onClick={onBack}>Quay l???i</Button>
                        </Col>
                    </Row>
                </Row>
            </Form>

        </Card >
    )
}

export default TrainingAction