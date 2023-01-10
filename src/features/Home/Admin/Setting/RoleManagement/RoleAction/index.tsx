import { Button, Card, Col, Form, Input, Row, Select, Typography, message as notice, Checkbox } from 'antd'
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { addRole, getRole, roleSelector, updateRole } from '../roleSlice';
import styles from '../../../PersonalManagement/Style.module.scss'
type QuizParams = {
    key: any;
};
type Props = {}

const RoleAction = (props: Props) => {
    let { key } = useParams<QuizParams>();
    const dispatch = useAppDispatch();
    const { role } = useAppSelector(roleSelector);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getRole(key))
    }, [key])
    useEffect(() => {
        if (key) {
            form.setFieldsValue({
                tenVaiTro: role?.tenVaiTro
            })
        }
    }, [role])
    const onFinish = (value: any) => {
        if (key) {
            dispatch(updateRole({
                ...value,
                id: key,
                chucNang: JSON.stringify(value.authorityA),

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
            dispatch(addRole({
                ...value,
                chucNang: JSON.stringify(value.authorityA)
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
        }
    }
    const onBack = () => {
        navigate('../')
    }
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
                                                <Checkbox value={{
                                                    label: 'Quản lý cán bộ',
                                                    link: '/admin/personalmanagement',
                                                    icon: 'UserOutlined'
                                                }}>Quản lý cán bộ</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý hợp đồng',
                                                        link: '/admin/contractmanagement',
                                                        icon: 'HighlightOutlined'
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý hợp đồng</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý khen thưởng',
                                                        link: '/admin/rewardmanagement',
                                                        icon: 'SmileOutlined'
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý khen thưởng</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý kỹ luật',
                                                        link: '/admin/disciplinemanagement',
                                                        icon: 'FrownOutlined'
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý kỹ luật</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý công tác',
                                                        icon: 'RocketOutlined',
                                                        children: [
                                                            {
                                                                label: 'Quản lý công tác trong nước',
                                                                link: '/admin/businessmanagement/domestic'
                                                            },
                                                            {
                                                                label: 'Quản lý công tác nước ngoài',
                                                                link: '/admin/businessmanagement/foreign'
                                                            }
                                                        ]
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý công tác</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý đào tạo',
                                                        link: '/admin/trainingmanagement',
                                                        icon: 'HighlightOutlined'
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý đào tạo</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Quản lý bồi dưỡng',
                                                        link: '/admin/cultivatemanagement',
                                                        icon: 'ReadOutlined'
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Quản lý bồi dưỡng</Checkbox>
                                                <Checkbox value={
                                                    {
                                                        label: 'Cài đặt hệt thống',
                                                        icon: 'SettingOutlined',
                                                        children: [
                                                            {
                                                                label: 'Quản lý tài khoản',
                                                                link: '/admin/setting/account'
                                                            },
                                                            {
                                                                label: 'Quản lý vai trò',
                                                                link: '/admin/setting/role'
                                                            },
                                                            {
                                                                label: 'Quản lý nhật ký người dùng',
                                                                link: '/admin/setting/daily'
                                                            }
                                                        ]
                                                    }
                                                } style={{ display: 'flex', marginLeft: 0, marginTop: 10 }}>Cài đặt hệ thống</Checkbox>
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