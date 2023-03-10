import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { addDaily, dailySelector, getDaily, updateDaily } from '../dailySlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { directorySelector } from '../../../../../../slices/directorySlice';
type QuizParams = {
    key: any;
};
type Props = {}

const DailyAction = (props: Props) => {
    let { key } = useParams<QuizParams>()
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { daily } = useAppSelector(dailySelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDaily(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...daily
            })
        }
    }, [daily])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateDaily({
                id: key,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }

            })

        } else {
            dispatch(addDaily(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
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
                {key ? 'C???p nh???t ' : 'Th??m '} Nh???t K??
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '8%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>N??m b??? k??? lu???t</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='namBiKyLuat'
                        >
                            <Input placeholder='Nh???p n??m b??? k??? lu???t' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>N??m x??a k??? lu???t</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='namXoaHieuLucKyLuat'
                        >
                            <Input placeholder='N??m b??? k??? lu???t' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginTop: '-2%' }}>

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

export default DailyAction