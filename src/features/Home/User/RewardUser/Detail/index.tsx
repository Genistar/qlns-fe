import { Button, Col, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react';
import { directorySelector, getRewardD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { getReward, rewardSelector, updateReward } from '../../../Admin/RewardManagement/rewardSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../Modal.module.scss'
import { getAll, updateRewardOfUser } from '../rewardUserSlice';
import Swal from 'sweetalert2';

type Props = {
    id: string,
    data: any,
    cbId: string | null
}

const RewardUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { rewardD } = useAppSelector(directorySelector);
    const { reward } = useAppSelector(rewardSelector);
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getRewardD())
        dispatch(getReward(id))
    }, [id])
    useEffect(() => {
        if (id) {
            form.setFieldsValue({
                ...data
            })
        }
    }, [data])
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const rewardDOptions = rewardD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKhenThuong}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (data.id) {
            dispatch(updateRewardOfUser({
                id: data.id,
                ...value
            }))
            dispatch(updateReward({
                id: data.id,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `C???p nh???t th??ng tin m???c khen th?????ng ${value.id}`
                    }))
                    Swal.fire({
                        title: 'C???p nh???t Th??nh c??ng',
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                    setIsVisiableModal(!isVisiableModal)
                    dispatch(getAll({ keyword: '', cbId }));
                }
                else {
                    Swal.fire({
                        title: '???? x???y ra l???i',
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }
            })
        }
    }
    return (
        <div>
            <Button type="text" icon={<FileSearchOutlined />} onClick={() => setIsVisiableModal(true)} />
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
                    <Typography.Title level={3} className={styles.title}>Chi ti???t khen th?????ng</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'T??n c??n b???'} name='fkMaCanBo'>
                                <Select placeholder='Ch???n c??n b???' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Lo???i khen th?????ng'} name='fkMaKhenThuong'>
                                <Select placeholder='Ch???n khen th?????ng' className={styles.input} disabled={disableButton}>
                                    {rewardDOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'N??m khen th?????ng'} name='namKhenThuong'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'H??nh th???c kh??c'} name='hinhThucKhenThuongKhac'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'C?? quan'} name='coQuan'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='C?? quan kh??c' name='coQuanKhac'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Ghi Ch??'} name='ghiChu'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='S??? c??ng v??n' name='soCongVan'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Row className={styles.btn}>
                            <Col flex={4} style={{ marginRight: 200 }}>
                                <Button className={styles.btnSort} onClick={() => setDisableButton(!disableButton)}>
                                    <Typography.Text className={styles.btnSortText} >S???a</Typography.Text>
                                </Button>
                            </Col>
                            <Col flex={4} >
                                <Button htmlType='submit' className={styles.btnUpdate}>
                                    <Typography.Text className={styles.btnUpdateText}>C???p nh???t</Typography.Text>
                                </Button>
                            </Col>
                        </Row>

                    </Row>
                </Form>
            </Modal>
        </div>

    )
}

export default RewardUserDetail