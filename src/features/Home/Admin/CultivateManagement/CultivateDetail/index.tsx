import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getCultivate, cultivateSelector } from '../cultivateSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import moment from 'moment';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const CultivateDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    console.log(key)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { cultivate } = useAppSelector(cultivateSelector);
    const { users } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getCultivate(key));
        dispatch(getUsers())
    }, [key])
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container} style={{ width: '50%', height: '40%', margin: '7% 15%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin quá trình bồi dưỡng
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
                            <Typography.Text>{cultivate?.id}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{cultivate?.DM_Hinh_Thuc_BD?.tenHinhThuc}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên Cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{isNameOff(users, cultivate?.fkMaCanBo)}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bát đầu</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_bo_mon'
                        >
                            <Typography.Text>{moment(cultivate?.boiDuongTuNgay).format('DD/MM/YYYY')}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Kết thúc</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_hoc_vi'
                        >
                            <Typography.Text>{moment(cultivate?.boiDuongDenNgay).format('DD/MM/YYYY')}</Typography.Text>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nội dung bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dia_chi'
                        >
                            <Typography.Text>{cultivate?.noiDungBoiDuong}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi bồi dưỡng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_bo_mon'
                        >
                            <Typography.Text>{cultivate?.noiBoiDuong}</Typography.Text>
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

export default CultivateDetail