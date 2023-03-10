import { Button, Col, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { businessSelector, getBusiness, updateBusiness } from '../../../../Admin/BusinessManagement/domestic/businessSlice';
import { addDaily } from '../../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../../Modal.module.scss'
import { getAll } from '../domesticUserSlice';
import Swal from 'sweetalert2';

type Props = {
    id: string,
    data: any,
    cbId: string | null
}

const DomesticUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { business } = useAppSelector(businessSelector);
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getBusiness(id))
    }, [id])
    useEffect(() => {
        if (id) {
            form.setFieldsValue({
                ...data
            })
        }
    }, [data])
    const userOption = users.map((user: any, index: number) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateBusiness({
                id: id,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật công tác trong nước',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Cập nhật thông tin mục công tác trong nước ${value.id}`
                    }))
                    Swal.fire({
                        title: 'Cập nhật Thành công',
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                    dispatch(getAll({ keyword: '', cbId }))
                    setIsVisiableModal(!isVisiableModal)
                }
                else {
                    Swal.fire({
                        title: 'Đã xảy ra lỗi',
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }

            })
            console.log(value)
        }
    }
    return (
        <div>
            <Button type="text" icon={<FileSearchOutlined style={{ marginLeft: -6 }} />} onClick={() => setIsVisiableModal(true)} />
            <Modal
                title={false}
                footer={false}
                visible={isVisiableModal}
                closable={true}
                closeIcon={<p onClick={() => setIsVisiableModal(false)}>x</p>}
                className={styles.modalContainer}
                bodyStyle={{ width: 634, height: 554, backgroundColor: '#fff', borderRadius: 16 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onUpdate}
                >
                    <Typography.Title level={3} className={styles.title}>Chi tiết khen thưởng</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'Tên cán bộ'} name='fkMaCanBo'>
                                <Select placeholder='Chọn cán bộ' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Thời gian công tác'} name='thoiGianCT'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Chức danh'} name='chucDanh'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'Chức vụ'} name='chucVu'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Đơn vị công tác' name='donViCT'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Chuyên môn'} name='chuyenMon'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Row className={styles.btn}>
                            <Col flex={4} style={{ marginRight: 200 }}>
                                <Button className={styles.btnSort} onClick={() => setDisableButton(!disableButton)}>
                                    <Typography.Text className={styles.btnSortText} >Sửa</Typography.Text>
                                </Button>
                            </Col>
                            <Col flex={4} >
                                <Button htmlType='submit' className={styles.btnUpdate}>
                                    <Typography.Text className={styles.btnUpdateText}>Cập nhật</Typography.Text>
                                </Button>
                            </Col>
                        </Row>

                    </Row>
                </Form>
            </Modal>
        </div>

    )
}

export default DomesticUserDetail