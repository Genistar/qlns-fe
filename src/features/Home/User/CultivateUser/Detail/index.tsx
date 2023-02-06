import { Button, Col, Form, Input, Row, Select, Typography, message as notice, DatePicker } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { directorySelector, cultivationFormD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { getCultivate, cultivateSelector, updateCultivate } from '../../../Admin/CultivateManagement/cultivateSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../Modal.module.scss'
import { getAll } from '../cultivateUserSlice';
import Swal from 'sweetalert2';

type Props = {
    id: string,
    data: any,
    cbId: string | null
}

const CultivateUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { cultivationForm } = useAppSelector(directorySelector);
    const { cultivate } = useAppSelector(cultivateSelector);
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(cultivationFormD())
        dispatch(getCultivate(id))
    }, [id])
    useEffect(() => {
        if (id) {
            form.setFieldsValue({
                fkMaCanBo: data?.fkMaCanBo,
                fkMaHinhThucBD: data?.fkMaHinhThucBD,
                noiBoiDuong: data?.noiBoiDuong,
                chungChiBoiDuong: data?.chungChiBoiDuong,
                ghiChu: data?.ghiChu,
                boiDuongTuNgay: moment(data?.boiDuongTuNgay),
                boiDuongDenNgay: moment(data?.boiDuongDenNgay),
                noiDungBoiDuong: data?.noiDungBoiDuong
            })
        }
    }, [data]);
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const cultivateDOptions = cultivationForm.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenHinhThuc}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateCultivate({
                id: id,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật bồi dưỡng',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Cập nhật thông tin mục bồi dưỡng ${value.id}`
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
        } console.log(value)
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
                    <Typography.Title level={3} className={styles.title}>Chi tiết bồi dưỡng</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'Tên cán bộ'} name='fkMaCanBo'>
                                <Select placeholder='Chọn cán bộ' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Hình thức bồi dưỡng'} name='fkMaHinhThucBD'>
                                <Select placeholder='Chọn bồi dưỡng' className={styles.input} disabled={disableButton}>
                                    {cultivateDOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Nơi bồi dưỡng'} name='noiBoiDuong'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Chứng chỉ bồi dưỡng'} name='chungChiBoiDuong'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'Ghi chú'} name='ghiChu'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Từ ngày' name='boiDuongTuNgay'>
                                <DatePicker placeholder='Chọn ngày' className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Đến ngày'} name='boiDuongDenNgay'>
                                <DatePicker placeholder='Chọn ngày' className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Nội dung bồi dưỡng' name='noiDungBoiDuong'>
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

export default CultivateUserDetail