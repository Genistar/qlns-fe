import { Button, Col, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react';
import { directorySelector, getRewardD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { getReward, rewardSelector, updateReward } from '../../../Admin/RewardManagement/rewardSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../Modal.module.scss'
import { getAll, updateRewardOfUser } from '../rewardUserSlice';

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
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Cập nhật thông tin mục khen thưởng ${value.id}`
                    }))
                    notice.success(res.payload.errMessage)
                    setIsVisiableModal(!isVisiableModal)
                    dispatch(getAll({ keyword: '', cbId }));
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        }
    }
    return (
        <div>
            <Button type="primary" onClick={() => setIsVisiableModal(true)}>
                Chi Tiết
            </Button>
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
                            <Form.Item label={'Loại khen thưởng'} name='fkMaKhenThuong'>
                                <Select placeholder='Chọn khen thưởng' className={styles.input} disabled={disableButton}>
                                    {rewardDOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Năm khen thưởng'} name='namKhenThuong'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Hình thức khác'} name='hinhThucKhenThuongKhac'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'Cơ quan'} name='coQuan'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Cơ quan khác' name='coQuanKhac'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Ghi Chú'} name='ghiChu'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Số công văn' name='soCongVan'>
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

export default RewardUserDetail