import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getTraining, trainingSelector } from '../trainingSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import moment from 'moment';
type QuizParams = {
    key: any;
};
type Props = {}

const TrainingDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    console.log(key)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { training } = useAppSelector(trainingSelector);
    useEffect(() => {
        dispatch(getTraining(key));
        console.log(training);
    }, [key])
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container} style={{ width: '50%', height: '50%', margin: '7% 15%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin đào tạo
            </Typography.Title>
            <Form
                layout='inline'
            >
                <Row className={styles.card_form} style={{ marginTop: '5%', width: '100%' }}>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>ID</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='id'
                        >
                            <Typography.Text>{training?.id}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Hệ đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{training?.DM_he_dao_tao?.tenHeDaoTao}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bậc đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{training?.Bac_dao_tao?.tenBac}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngành đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='hinhThucKyLuatKhac'
                        >
                            <Typography.Text>{training?.nganhDaoTao}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi đào tạo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='email'
                        >
                            <Typography.Text>{training?.noiDaoTao}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Quốc gia</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{training?.quocGia}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên luận án</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dia_chi'
                        >
                            <Typography.Text>{training?.tenLuanAn}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bát đầu</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_bo_mon'
                        >
                            <Typography.Text>{moment(training?.thoiGianBD).format('DD/MM/YYYY')}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Kết thúc</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_hoc_vi'
                        >
                            <Typography.Text>{moment(training?.thoiGianKT).format('DD/MM/YYYY')}</Typography.Text>
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

export default TrainingDetail