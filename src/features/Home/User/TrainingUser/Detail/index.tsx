import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { directorySelector, getMajorsD, getTrainingLevel, gettypeOfTrainingD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import { getTraining, trainingSelector, updateTraining } from '../../../Admin/TrainingManagement/trainingSlice';
import styles from '../../Modal.module.scss'
import { getAll } from '../trainingUserSlice';
import Swal from 'sweetalert2';

type Props = {
    id: string,
    data: any,
    cbId: string | null
}

const TrainingUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { typeOfTraining, trainingLevel, majors } = useAppSelector(directorySelector);
    const { training } = useAppSelector(trainingSelector);
    const [disableButton2, setdisableButton2] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getTrainingLevel())
        dispatch(gettypeOfTrainingD());
        dispatch(getMajorsD())
        dispatch(getTraining(id))
    }, [id])
    useEffect(() => {
        if (id) {
            form.setFieldsValue({
                thoiGianBD: moment(data?.thoiGianBD),
                thoiGianKT: moment(data?.thoiGianKT),
                fkMaCanBo: data?.fkMaCanBo,
                fkMaBac: data?.fkMaBac,
                fkMaHeDaoTao: data?.fkMaHeDaoTao,
                nganhDaoTao: data?.nganhDaoTao,
                noiDaoTao: data?.noiDaoTao,
                quocGia: data?.quocGia,
                tenLuanAn: data?.tenLuanAn
            })
        }

    }, [data])
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const levelTOption = trainingLevel.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenBac}</Select.Option>
    ))
    const typeTOption = typeOfTraining.map((type, index) => (
        <Select.Option key={index} value={type.id}>{type.tenHeDaoTao}</Select.Option>
    ))
    const majorOption = majors.map((major, index) => (
        <Select.Option key={index} value={major.ten_nganh}>{major.ten_nganh}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateTraining({
                id: data.id,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `Cập nhật thông tin mục đào tạo ${value.id}`
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
                        title: 'Đã xay ra lỗi',
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
                bodyStyle={{ width: 634, height: 634, backgroundColor: '#fff', borderRadius: 16 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onUpdate}
                >
                    <Typography.Title level={3} className={styles.title}>Chi tiết quá trình đào tạo</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'Tên cán bộ'} name='fkMaCanBo'>
                                <Select placeholder='Chọn cán bộ' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Loại khen thưởng'} name='fkMaBac'>
                                <Select placeholder='Chọn bậc đào tạo' className={styles.input} disabled={disableButton2}>
                                    {levelTOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Năm khen thưởng'} name='fkMaHeDaoTao'>
                                <Select placeholder='Chọn hệ đào tạo' className={styles.input} disabled={disableButton2}>
                                    {typeTOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Cơ quan'} name='nganhDaoTao'>
                                <Select placeholder='Chọn hệ ngành đào tạo' className={styles.input} disabled={disableButton2}>
                                    {majorOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label='Nơi đào tạo' name='noiDaoTao'>
                                <Input className={styles.input} disabled={disableButton2} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'Tên luận án'} name='nganhDaoTao'>
                                <Input placeholder='Nhập tên luận án' className={styles.input} disabled={disableButton2} />
                            </Form.Item>
                            <Form.Item label={'Quốc gia'} name='quocGia'>
                                <Input placeholder='Nhập quốc gia' className={styles.input} disabled={disableButton2} />
                            </Form.Item>
                            <Form.Item label='Thời gian bắt đầu' name='thoiGianBD'>
                                <DatePicker className={styles.input} format={'DD/MM/YYYY'} value={moment(training?.thoiGianBD, 'DD/MM/YYYY')} disabled={disableButton2} />
                            </Form.Item>
                            <Form.Item label='Thời gian bắt đầu' name='thoiGianKT'>
                                <DatePicker className={styles.input} format={'DD/MM/YYYY'} value={moment(training?.thoiGianKT, 'DD/MM/YYYY')} disabled={disableButton2} />
                            </Form.Item>
                        </Col>
                        <Row className={styles.btn} style={{ marginTop: 90 }}>
                            <Col flex={4} style={{ marginRight: 200 }}>
                                <Button className={styles.btnSort} onClick={() => setdisableButton2(!disableButton2)}>
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

export default TrainingUserDetail