import { Button, Col, DatePicker, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import { EditOutlined } from '@ant-design/icons'
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
import Swal from 'sweetalert2';

type Props = {
    id?: string,
    data?: any,
    cbId: string | null,
    label?: string;
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
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateFamily({
                id: data.id,
                fkMaCanBo: cbId,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: cbId,
                        noiDung: `Th??ng tin m???i quan h???: ${data.Quan_he.tenQuanHe}, ${data.hovaten}, ${data.donViCongTacHocTap}, ${data.namSinh}, ${data.queQuan}, ${data.ngheNghiep}`
                    })).then((res: any) => {
                        console.log(res.payload)
                    })
                    Swal.fire({
                        title: 'C???p nh???t th??nh c??ng',
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                    dispatch(getAll({ keyword: '', cbId }))
                    setIsVisiableModal(!isVisiableModal)
                }
                else {
                    Swal.fire({
                        title: '???? x???y ra l???i',
                        text: res.payload.errMessage,
                        icon: 'error'
                    })
                }
            })
        } else {
            dispatch(addFamily({
                fkMaCanBo: cbId,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'Th??m',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `Th??m m???i quan h??? T??n: ${value.hovaten}, M???i quan h???: ${value.fkMaQuanHe}`
                    }))
                    Swal.fire({
                        title: 'c???p nh???t th??nh c??ng',
                        text: res.payload.errMessage,
                        icon: 'success'
                    })
                    dispatch(getAll({ cbId }))
                    setIsVisiableModal(!isVisiableModal)
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
            <Button type="text" icon={<EditOutlined style={{ marginLeft: -6 }} />} size='large' onClick={() => setIsVisiableModal(true)} className={style !== undefined ? style : ''}>
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
                    <Typography.Title level={3} className={styles.title}>{id ? 'C???p nh???t' : 'Th??m'} m???i quan h??? gia ????nh</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 30 }}>
                            <Form.Item label={'Ch???n m???i quan h???'} name='fkMaQuanHe'>
                                <Select placeholder='Ch???n m???i quan h???' className={styles.input} disabled={id === undefined ? false : disableButton2}>
                                    {relationshipOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label='H??? v?? t??n' name='hovaten'>
                                <Input placeholder='Nh???p h??? t??n' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label={'N??m sinh'} name='namSinh'>
                                <Input placeholder='Nh???p n??m sinh' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label={'????n v??? c??ng t??c'} name='donViCongTacHocTap'>
                                <Input placeholder='Nh???p ????n v??? c??ng t??c' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>

                            <Form.Item label={'Qu?? qu??n'} name='queQuan'>
                                <Input placeholder='Nh???p qu?? qu??n' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label='Ngh??? nghi???p' name='ngheNghiep'>
                                <Input placeholder='Nh???p ngh??? nghi???p' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                            <Form.Item label='N??i ???' name='noiO'>
                                <Input placeholder='Nh???p n??i ???' className={styles.input} disabled={id === undefined ? false : disableButton2} />
                            </Form.Item>
                        </Col>
                        <Row className={styles.btn} style={{ marginTop: 0 }}>
                            <Col flex={4} style={{ marginRight: id ? 210 : 110 }}>
                                {id ? <Button className={styles.btnSort} onClick={() => setdisableButton2(!disableButton2)}>
                                    <Typography.Text className={styles.btnSortText} >S???a</Typography.Text>
                                </Button> : ''}

                            </Col>
                            <Col flex={4} >
                                <Button htmlType='submit' className={styles.btnUpdate}>
                                    <Typography.Text className={styles.btnUpdateText}>{id ? 'C???p nh???t' : 'Th??m m???i'}</Typography.Text>
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