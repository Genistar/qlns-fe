import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { addBusiness, businessSelector, getBusiness, updateBusiness } from '../businessSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../../TrainingManagement/TrainingList';
type QuizParams = {
    key: any;
};
type Props = {}

const DomesticAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { business } = useAppSelector(businessSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getBusiness(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...business
            })
        }
    }, [business])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateBusiness({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Cập nhật Thêm thông tin mục công tác trong nước ${key}`
                    }))
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }

            })
        } else {
            dispatch(addBusiness(value)).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thêm thông tin mục công tác trong nước cho cán bộ ${isNameOff(users, value.fkMaCanBo)}`
                    }))
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
                {key ? 'Cập nhật ' : 'Thêm '} quá trình công tác trong nước
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}

            >
                <Row className={styles.card_form} style={{ marginTop: '5%', paddingLeft: '10%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Thời gian công tác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='thoiGianCT'
                        >
                            <Input placeholder='Thời gian công tác' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chức danh</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chucDanh'
                        >
                            <Input placeholder='Nhập chức danh' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '4%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chức vụ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chucVu'
                        >
                            <Input placeholder='Nhập chức vụ' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Đơn vị công tác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='donViCT'
                        >
                            <Input placeholder='Nhập đơn vị công tác' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Chuyên môn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='chuyenMon'
                        >
                            <Input placeholder='Nhập chuyên môn' className={styles.cardFormInput} />
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%', marginTop: '-2%' }}>

                        <Col span={6}>
                            <Button
                                className={styles.btn}
                                style={{ backgroundColor: '#ff1506', color: 'white' }}
                                htmlType='submit'
                            >
                                {key ? 'Cập nhật ' : 'Thêm '}
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

export default DomesticAction