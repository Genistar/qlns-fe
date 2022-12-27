import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { addReward, getReward, rewardSelector, updateReward } from '../rewardSlice';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import styles from '../../PersonalManagement/Style.module.scss'
import { directorySelector, getRewardD } from '../../../../../slices/directorySlice';
import { addDaily } from '../../Setting/DailyManagement/dailySlice';
import { isNameOff } from '../../TrainingManagement/TrainingList';

type QuizParams = {
    key: any;
};
type Props = {}

const DisciplineAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { rewardD } = useAppSelector(directorySelector);
    const { reward } = useAppSelector(rewardSelector)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getRewardD())
        dispatch(getReward(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...reward
            })
        }
    }, [reward])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateReward({
                id: key,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Mục khen thưởng ${key}`
                    }))
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }

            })
        } else {
            dispatch(addReward(value)).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Thông tin khen thưởng cho ${isNameOff(users, value.id)}`
                    })).then((res: any) => {
                        console.log(res.payload.errCode)
                    })
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }

            })
            console.log(value)
        }

    }
    const onBack = () => {
        navigate('../')
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const rewardDOptions = rewardD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKhenThuong}</Select.Option>
    ))

    return (
        <Card className={styles.card_container}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật ' : 'Thêm '} quá trình khen thưởng
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ paddingLeft: '10%', marginTop: '5%' }}>
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
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Loại khen thưởng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='fkMaKhenThuong'
                        >
                            <Select placeholder='Chọn hình thức khen thưởng' className={styles.cardFormInput}>
                                {rewardDOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Năm khen thưởng</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='namKhenThuong'
                        >
                            <Input placeholder='Nhập năm khen thưởng' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Hình thức khác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='hinhThucKhenThuongKhac'
                        >
                            <Input placeholder='Nhập hình thức khen thưởng khác' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '5%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='coQuan'
                        >
                            <Input placeholder='Nhập cơ quan' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Cơ quan khác</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='coQuanKhac'
                        >
                            <Input placeholder='Nhập cơ quan khác' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Ghi chú</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='ghiChu'
                        >
                            <Input placeholder='Nhập ghi chú' className={styles.cardFormInput} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Số công văn</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='soCongVan'
                        >
                            <Input placeholder='Nhập số công văn' className={styles.cardFormInput} />
                        </Form.Item>

                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%' }}>

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

export default DisciplineAction