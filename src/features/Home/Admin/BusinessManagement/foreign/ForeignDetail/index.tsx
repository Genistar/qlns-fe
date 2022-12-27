import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getForeign, foreignSelector } from '../foreignSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import moment from 'moment';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const ForeignDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { foreign } = useAppSelector(foreignSelector);
    const { users } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getForeign(key));
        dispatch(getUsers())
    }, [key])
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container} style={{ width: '50%', height: '50%', margin: '7% 15%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin công tác nước ngoài
            </Typography.Title>
            <Form
                layout='inline'
            >
                <Row className={styles.card_form} style={{ marginTop: '5%' }}>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>ID</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='id'
                        >
                            <Typography.Text>{foreign?.id}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{isNameOff(users, foreign?.fkMaCanBo)}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngày đi</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{moment(foreign?.ngayDi).format('DD/MM/YYYY')}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngày về</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='hinhThucKyLuatKhac'
                        >
                            <Typography.Text>{moment(foreign?.ngayVe).format('DD/MM/YYYY')}</Typography.Text>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={styles.mr}>

                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Quốc gia</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='email'
                        >
                            <Typography.Text>{foreign?.quocGia}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi đến</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{foreign?.noiden}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Passport</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{foreign?.soPassport}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngành</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{foreign?.nganhHoc}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chi phí</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{foreign?.chiPhiCT}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Phần trăm hưởng lương</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{foreign?.phanTramHuongLuong}% </Typography.Text>
                        </Form.Item>
                    </Col>

                    <Row className={styles.buttonContainer} style={{ marginLeft: '-10%' }}>
                        <Col span={6}>
                            <Button className={styles.btn} onClick={onBack}>Quay lại</Button>
                        </Col>
                    </Row>
                </Row>
            </Form>

        </Card >
    )
}

export default ForeignDetail