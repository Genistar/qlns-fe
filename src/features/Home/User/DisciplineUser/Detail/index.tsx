import { Button, Col, Form, Input, Row, Select, Typography, message as notice } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react';
import { directorySelector, getDisciplineD } from '../../../../../slices/directorySlice';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUsers, userSelector } from '../../../../Auth/userSlice';
import { disciplineSelector, updateDiscipline } from '../../../Admin/DisciplineManagement/disciplineSlice';
import { getDiscipline } from '../../../Admin/DisciplineManagement/disciplineSlice';
import { addDaily } from '../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../Modal.module.scss'
import { getAll } from '../disciplineUserSlice';
import Swal from 'sweetalert2';

type Props = {
    id: string,
    data: any,
    cbId: string | null
}

const DisciplineUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { disciplineD } = useAppSelector(directorySelector);
    const { discipline } = useAppSelector(disciplineSelector);
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { id, data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDisciplineD())
        dispatch(getDiscipline(id))
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
    const disciplineDOptions = disciplineD.map((l, index) => (
        <Select.Option key={index} value={l.id}>{l.tenKyLuat}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (id) {
            dispatch(updateDiscipline({
                id: id,
                ...value
            })).then((res: any) => {
                console.log(res)
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'C???p nh???t',
                        fkMaCanBo: value.fkMaCanBo,
                        noiDung: `C???p nh???t th??ng tin m???c k??? lu???t ${value.id}`
                    }))
                    Swal.fire({
                        title: 'Th??m Th??nh c??ng',
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
                bodyStyle={{ width: 634, height: 634, backgroundColor: '#fff', borderRadius: 16 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onUpdate}
                >
                    <Typography.Title level={3} className={styles.title}>Chi ti???t k??? lu???t</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'T??n c??n b???'} name='fkMaCanBo'>
                                <Select placeholder='Ch???n c??n b???' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Lo???i K??? lu???t'} name='fkMaKyLuat'>
                                <Select placeholder='Ch???n K??? lu???t' className={styles.input} disabled={disableButton}>
                                    {disciplineDOptions}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'N??m k??? lu???t'} name='namBiKyLuat'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'N??m x??a hi???u l???c k??? lu???t'} name='namXoaHieuLucKyLuat'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='S??? th??ng b??? k??? lu???t' name='soThangBiKyLuat'>
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
                        <Row className={styles.btn} style={{ marginTop: 90 }}>
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

export default DisciplineUserDetail