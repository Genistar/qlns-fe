import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUser, userSelector } from '../../../../Auth/userSlice';
import styles from '../Style.module.scss'
type QuizParams = {
    key: any;
};
type Props = {}

const PersonalDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(userSelector);
    useEffect(() => {
        dispatch(getUser(key));
        console.log(user);
    }, [key])
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin nhân sự
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
                            <Typography.Text>{user?.id}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Họ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{user?.ho}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{user?.ten}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ngày sinh</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ngay_sinh'
                        >
                            <Typography.Text>{'15/06/2000'}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Email</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='email'
                        >
                            <Typography.Text>{user?.email}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số điện thoại</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{user?.dien_thoai}</Typography.Text>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Địa chỉ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dia_chi'
                        >
                            <Typography.Text>{user?.dia_chi}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Bộ môn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_bo_mon'
                        >
                            <Typography.Text>{user?.ma_bo_mon}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Học vị</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_hoc_vi'
                        >
                            <Typography.Text>{user?.ma_hoc_vi}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Học hàm</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_hoc_ham'
                        >
                            <Typography.Text>{user?.ma_hoc_ham}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Loại cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fk_loai_can_bo'
                        >
                            <Typography.Text>{user?.fk_loai_can_bo}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Giới tính</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='phai'
                        >
                            <Typography.Text>{user?.phai}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Nơi sinh</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='noi_sinh'
                        >
                            <Typography.Text></Typography.Text>{user?.noi_sinh}
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Quê quán</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='que_quan'
                        >
                            <Typography.Text>{user?.que_quan}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Dân tộc</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fk_ma_dan_toc'
                        >
                            <Typography.Text>{user?.fk_ma_dan_toc}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chuyên ngành</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fk_nganh'
                        >
                            <Typography.Text>{user?.fk_nganh}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tôn giáo</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fk_ma_ton_giao'
                        >
                            <Typography.Text>{user?.fk_ma_ton_giao}</Typography.Text>
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer}>
                        <Col span={6}>
                            <Button className={styles.btn} onClick={onBack}>Quay lại</Button>
                        </Col>
                    </Row>
                </Row>
            </Form>

        </Card >
    )
}

export default PersonalDetail