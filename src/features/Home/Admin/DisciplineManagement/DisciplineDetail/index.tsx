import { Button, Col, Row, Typography, Form, Card } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getDiscipline, disciplineSelector } from '../disciplineSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const DisciplineDetail = (props: Props) => {
    let { key } = useParams<QuizParams>();
    console.log(key)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { discipline } = useAppSelector(disciplineSelector);
    const { users } = useAppSelector(userSelector)
    useEffect(() => {
        dispatch(getDiscipline(key));
        getUsers();
    }, [key])
    const onBack = () => {
        navigate('../')
    }
    return (
        <Card className={styles.card_container} style={{ width: '50%', height: '40%', margin: '7% 15%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                Thông tin kỹ luật
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
                            <Typography.Text>{discipline?.id}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ho'
                        >
                            <Typography.Text>{discipline?.DM_ky_luat?.tenKyLuat}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Năm kỷ luật</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ten'
                        >
                            <Typography.Text>{discipline?.namBiKyLuat}</Typography.Text>
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Năm xóa</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='hinhThucKyLuatKhac'
                        >
                            <Typography.Text>{discipline?.namXoaHieuLucKyLuat}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên Cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='email'
                        >
                            <Typography.Text>{isNameOff(users, discipline?.fkMaCanBo)}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số công văn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dien_thoai'
                        >
                            <Typography.Text>{discipline?.soCongVan}</Typography.Text>
                        </Form.Item>
                    </Col>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='dia_chi'
                        >
                            <Typography.Text>{discipline?.coQuan}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan khác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_bo_mon'
                        >
                            <Typography.Text>{discipline?.coQuanKhac}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>ghi chú</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ma_hoc_vi'
                        >
                            <Typography.Text>{discipline?.ghiChu}</Typography.Text>
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

export default DisciplineDetail