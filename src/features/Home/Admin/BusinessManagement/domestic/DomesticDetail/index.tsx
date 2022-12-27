import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getBusiness, businessSelector } from '../businessSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const DomesticDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    console.log(key)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { business } = useAppSelector(businessSelector);
    const { users } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getBusiness(key));
        dispatch(getUsers())
    }, [key])
    console.log(business);
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container} style={{ width: '40%', height: '35%', margin: '8% 17%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin công tác trong nước
            </Typography.Title>
            <Form
                layout='inline'
            >
                <Row className={styles.card_form} style={{ marginTop: '5%' }}>
                    <Col span={6} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>ID</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='id'
                        >
                            {business?.id}
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{isNameOff(users, business?.fkMaCanBo)}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Thời gian</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{business?.thoiGianCT}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chức vụ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='hinhThucKyLuatKhac'
                        >
                            <Typography.Text>{business?.chucVu}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={6} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chức danh</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='email'
                        >
                            <Typography.Text>{business?.chucDanh}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Đơn vị</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{business?.donViCT}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chuyên môn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{business?.chuyenMon}</Typography.Text>
                        </Form.Item>
                    </Col>

                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%' }}>
                        <Col span={6}>
                            <Button className={styles.btn} onClick={onBack}>Quay lại</Button>
                        </Col>
                    </Row>
                </Row>
            </Form>

        </Card >
    )
}

export default DomesticDetail