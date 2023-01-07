import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice, Checkbox } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { addRole, roleSelector, getRole, updateRole } from '../roleSlice';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
import { directorySelector } from '../../../../../../slices/directorySlice';
type QuizParams = {
    key: any;
};
type Props = {}

const RoleAction = (props: Props) => {
    let { key } = useParams<QuizParams>()
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(userSelector);
    const { role } = useAppSelector(roleSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(getUsers())
    //     dispatch(getRole(key))
    // }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                ...role
            })
        }
    }, [role])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateRole({
                id: key,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    navigate('../');
                    notice.success(res.payload.errMessage)
                }
                else {
                    notice.error(res.payload.errMessage)
                }

            })

        } else {
            dispatch(addRole(value)).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
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
                {key ? 'Cập nhật ' : 'Thêm '} Vai Trò
            </Typography.Title>
            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Row className={styles.card_form} style={{ marginTop: '8%' }}>
                    <Col span={4} className={styles.mr}>
                        <Form.Item
                            label={<Typography.Title level={5} className={styles.labelFormInput}>Tên vai trò</Typography.Title>}
                            style={{ marginBottom: 10 }}
                            name='tenVaiTro'
                        >
                            <Input placeholder='Nhập tên vai trò' className={styles.cardFormInput} />
                        </Form.Item>
                        <Col span={6} style={{ position: 'absolute', left: 588, top: 40, width: 504 }}>
                            <Form.Item>
                                <Typography.Title level={4} style={{ position: 'absolute', top: -100, left: -80, width: 500 }}>Phân quyền chức năng</Typography.Title>
                                <Card
                                    style={{
                                        width: 560, height: 420,
                                        position: 'absolute', top: -60,
                                        left: -80,
                                        backgroundColor: '#FFF2E7',
                                        overflowY: 'scroll'
                                    }}
                                >
                                    <Col style={{ top: 35 }}>
                                        <Typography.Title level={4} style={{ position: 'absolute', top: -40, left: 0 }}>Các chức năng</Typography.Title>
                                        <Checkbox >Tất cả</Checkbox>
                                        <Form.Item name='authorityA' style={{ marginTop: 10 }}>
                                            <Checkbox.Group>
                                                <Checkbox value='cnax'>Quản lý cán bộ</Checkbox>
                                                <Checkbox value='cnay' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý hợp đồng</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý khen thưởng</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý kỹ luật</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý công tác trong nước</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý công tác nước ngoài</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý đào tạo</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý bồi dưỡng</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý tài khoản</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý vai trò</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý nhật ký</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Gia hạn hợp đồng</Checkbox>
                                                <Checkbox value='cnbz' style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Thông tin người dùng</Checkbox>
                                            </Checkbox.Group>

                                        </Form.Item>
                                    </Col>
                                </Card>

                            </Form.Item>


                        </Col>

                    </Col>
                    <Row className={styles.buttonContainer} style={{ marginTop: '-2%' }}>

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

export default RoleAction