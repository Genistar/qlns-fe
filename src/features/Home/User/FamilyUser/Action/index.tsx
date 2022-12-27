import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { directorySelector, getMajorsD, getRelationship, getTrainingLevel, gettypeOfTrainingD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import { getTraining, trainingSelector, updateTraining } from '../../../Admin/TrainingManagement/trainingSlice';
import styles from '../../Modal.module.scss'
import { addFamily, getAll, updateFamily } from '../familyUserSlice';

type Props = {
    id?: string,
    data?: any,
    cbId: string | null,
    label: string;
    style?: any
}

const FamilyUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { relationship } = useAppSelector(directorySelector);
    const [disableButton2, setdisableButton2] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId, label, style } = props;
    useEffect(() => {
        dispatch(getRelationship())
    }, [])
    useEffect(() => {
        if (id) {
            form.setFieldsValue({
                ...data
            })
        }

    }, [data])
    const relationshipOption = relationship.map((data: any, index: number) => (
        <Select.Option key={index} value={data.id}>{data.tenQuanHe}</Select.Option>
    ))
    console.log(id)
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateFamily({
                id: data.id,
                fkMaCanBo: cbId,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Cập nhật',
                        fkMaCanBo: value.cbId,
                        noiDung: `Cập nhật thông tin mục đào tạo ${value.id}`
                    }))
                    notice.success(res.payload.errMessage);
                    dispatch(getAll({ keyword: '', cbId }))
                    setIsVisiableModal(!isVisiableModal)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        } else {
            dispatch(addFamily({
                fkMaCanBo: cbId,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Thêm',
                        fkMaCanBo: value.cbId,
                        noiDung: `Thêm mối quan hệ ${value.id}`
                    }))
                    notice.success(res.payload.errMessage);
                    dispatch(getAll({ cbId }))
                    setIsVisiableModal(!isVisiableModal)
                }
                else {
                    notice.error(res.payload.errMessage)
                }
            })
        }
    }
    return (
        <div>
            <Button type="primary" size='small' onClick={() => setIsVisiableModal(true)} className={style !== undefined ? style : ''}>
                {label}
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
                    <Typography.Title level={3} className={styles.title}>Thêm mối quan hệ gia đình</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 30 }}>
                            <Form.Item label={'Chọn mối quan hệ'} name='fkMaQuanHe'>
                                <Select placeholder='Chọn mối quan hệ' className={styles.input} disabled={id === undefined ? false : disableButton2}>
                                    {relationshipOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label='Họ và tên' name='hovaten'>
                                <Input placeholder='Nhập họ tên' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label={'Năm sinh'} name='namSinh'>
                                <Input placeholder='Nhập năm sinh' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label={'Đơn vị công tác'} name='donViCongTacHocTap'>
                                <Input placeholder='Nhập đơn vị công tác' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>

                            <Form.Item label={'Quê quán'} name='queQuan'>
                                <Input placeholder='Nhập quê quán' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label='Nghề nghiệp' name='ngheNghiep'>
                                <Input placeholder='Nhập nghề nghiệp' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label='Nơi Ở' name='noiO'>
                                <Input placeholder='Nhập nơi ở' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                        </Col>
                        <Row className={styles.btn} style={{ marginTop: 0 }}>
                            <Col flex={4} style={{ marginRight: 210 }}>
                                <Button className={styles.btnSort} onClick={() => setdisableButton2(!disableButton2)}>
                                    <Typography.Text className={styles.btnSortText} >Sửa</Typography.Text>
                                </Button>
                            </Col>
                            <Col flex={4} >
                                <Button htmlType='submit' className={styles.btnUpdate}>
                                    <Typography.Text className={styles.btnUpdateText}>{id ? 'Cập nhật' : 'Thêm mới'}</Typography.Text>
                                </Button>
                            </Col>
                        </Row>

                    </Row>
                </Form>
            </Modal>
        </div>

    )
}

export default FamilyUserDetail