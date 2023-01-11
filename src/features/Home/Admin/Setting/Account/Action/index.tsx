import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { accountSelector, getAccount, updateAccount } from '../accountSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { addDaily } from '../../../Setting/DailyManagement/dailySlice';
import { getAll, roleSelector } from '../../RoleManagement/roleSlice';
import Swal from 'sweetalert2';
type QuizParams = {
    key: any;
};
type Props = {}

const AccountAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { roles } = useAppSelector(roleSelector);
    const { account } = useAppSelector(accountSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAccount(key))
        dispatch(getAll())
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...account
            })
        }
    }, [account])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateAccount({
                id: key,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Sửa account ${key}`
                    }))
                    navigate('../');
                    Swal.fire({
                        title: `Cập nhật thành công`,
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                }
                else {
                    Swal.fire({
                        title: `Đã xảy ra lỗi`,
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
        } else {

        }

    }
    const onBack = () => {
        navigate('../')
    }
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const roleOption = roles.map((role: any, index) => (
        <Select.Option key={index} value={role.id}>{role.tenVaiTro}</Select.Option>
    ))
    return (
        <Card className={styles.card_container} style={{ width: '45%', height: '40%', margin: '7% 15%' }}>
            <Typography.Title className={styles.card_title} level={3}>
                {key ? 'Cập nhật ' : 'Thêm '} Tài khoản
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}

            >
                <Row className={styles.card_form} style={{ marginTop: '5%', paddingLeft: '10%' }}>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '-5%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên cán bộ</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='cbId'
                        >
                            <Select placeholder='Chọn cán bộ' className={styles.cardFormInput} style={{ width: 200 }}>
                                {userOption}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tài khoản</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='username'
                        >
                            <Input placeholder='Tài khoản' className={styles.cardFormInput} style={{ width: 200, height: 44 }} />
                        </Form.Item>


                    </Col>
                    <Col span={4} className={styles.mr} style={{ marginLeft: '5%' }}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Mật khẩu</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='password'
                        >
                            <Input placeholder='Mật khẩu' className={styles.cardFormInput} style={{ width: 200, height: 44 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Vai trò</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='role'
                        >
                            <Select placeholder='Chọn vai trò' className={styles.cardFormInput} style={{ width: 200 }} >
                                {roleOption}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginLeft: '-15%', marginTop: '-5%' }}>

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

export default AccountAction