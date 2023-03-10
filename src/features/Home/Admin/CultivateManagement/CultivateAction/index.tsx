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
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??ng tin m???c b???i d?????ng ${key}`
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
            dispatch(addCultivate(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Th??m',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??ng tin m???c b???i d?????ng cho ${isNameOff(users, value.fkMaCanBo)}`
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
    const cultivates = cultivationForm.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenHinhThuc}</Select.Option>
    ))

    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'C???p nh???t ' : 'Th??m '} qu?? tr??nh b???i d?????ng
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '5%', paddingLeft: '10%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>H??nh th???c b???i d?????ng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaHinhThucBD'
                        >
                            <Select placeholder='Ch???n h??nh th???c b???i d?????ng' className={styles.cardFormInput}>
                                {cultivates}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>N??i B???i d?????ng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiBoiDuong'
                        >
                            <Input placeholder='Nh???p n??i b???i d?????ng' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ch???ng ch??? b???i d?????ng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chungChiBoiDuong'
                        >
                            <Input placeholder='Nh???p ch???ng ch??? b???i d?????ng' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '5%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ghi Ch??</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ghiChu'
                        >
                            <Input placeholder='Nh???p ghi ch??' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>B???i d?????ng t??? ng??y</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='boiDuongTuNgay'
                        >
                            <DatePicker placeholder='Ch???n ng??y' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>B???i d?????ng ?????n ng??y</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='boiDuongDenNgay'
                        >
                            <DatePicker placeholder='Ch???n ng??y' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>N???i dung b???i d?????ng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noiDungBoiDuong'
                        >
                            <Input placeholder='Nh???p n???i dung b???i d?????ng' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%' }}>

                        <Col span={6}>
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
                </Row>
            </Form>

        </Card >
    )
}

export default CultivateAction