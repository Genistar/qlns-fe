import { Button, Card, Form, Input, Typography, message as notice } from 'antd'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { login, userSelector } from '../userSlice';
import styles from './Style.module.scss'
import { useNavigate } from 'react-router-dom';

type formValue = {
    username: string,
    password: string
}
type Props = {

}
const Login: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const { userLogin } = useAppSelector(userSelector);
    const [form] = Form.useForm();
    let navigate = useNavigate();
    const onFinish = (value: formValue) => {
        const username = value.username;
        const password = value.password;
        if (value) {
            dispatch(login({ username, password })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    notice.success('Đăng nhập thành công', 3);
                    localStorage.getItem('role') === '5' ? navigate('/user/detail') : navigate('/admin');
                    console.log(localStorage.getItem('role'))
                } else {
                    notice.error('Sai tài khoản hoặc mật khẩu');
                    console.log(res.payload.errCode)
                }

            })

        }
    }



    return (
        <div className={styles.containerWarp}>
            <Card className={styles.container}>
                <Card className={styles.label}>
                    <Typography.Title level={3} style={{ color: 'rgb(255, 255, 255)' }}>ĐĂNG NHẬP</Typography.Title>
                </Card>
                <Form
                    form={form}
                    onFinish={onFinish}
                    className={styles.container_warp}
                    layout='vertical'
                >
                    <Form.Item
                        name='username'
                        label={
                            <Typography.Text>Tài khoản</Typography.Text>
                        }
                        className={styles.input}
                    >
                        <Input placeholder='Nhập tài khoản' className={styles.inputStyle} />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label={
                            <Typography.Text>Mật khẩu</Typography.Text>
                        }
                        className={styles.input}
                    >
                        <Input.Password placeholder='Nhập mật khẩu' className={styles.inputStyle} />
                    </Form.Item>
                    <Button
                        htmlType='submit'
                        className={styles.btnLogin}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </Card>
        </div>

    )
}

export default Login