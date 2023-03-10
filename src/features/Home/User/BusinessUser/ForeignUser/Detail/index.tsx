import { Button, Col, Form, Input, Row, Select, Typography, message as notice, DatePicker } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../store/store';
import { getUsers, userSelector } from '../../../../../Auth/userSlice';
import { foreignSelector, getForeign, updateForeign } from '../../../../Admin/BusinessManagement/foreign/foreignSlice';
import { addDaily } from '../../../../Admin/Setting/DailyManagement/dailySlice';
import styles from '../../../Modal.module.scss'
import { getAll } from '../foreignUserSlice';
import Swal from 'sweetalert2';

type Props = {
    data: any,
    cbId: string | null;
}

const ForeignUserDetail = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const dispatch = useAppDispatch()
    const { users } = useAppSelector(userSelector);
    const { foreign } = useAppSelector(foreignSelector);
    const [disableButton, setDisableButton] = useState<boolean | undefined>(true)
    const [form] = Form.useForm();
    let { data, cbId } = props;
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getForeign(data.id))
    }, [data.id])
    console.log(data)
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                fkMaCanBo: data?.fkMaCanBo,
                soPassport: data?.soPassport,
                quocGia: data?.quocGia,
                noiden: data?.noiden,
                phanTramHuongLuong: data?.phanTramHuongLuong,
                nganhHoc: data?.nganhHoc,
                chiPhiCT: data?.chiPhiCT,
                ngayDi: moment(data?.ngayDi),
                ngayVe: moment(data?.ngayVe)
            })
        }
    }, [data])
    const userOption = users.map((user: any, index) => (
        <Select.Option key={index} value={user.id}>{user.ho + ' ' + user.ten}</Select.Option>
    ))
    const onUpdate = (value: any) => {
        if (data.id) {
            dispatch(updateForeign({
                id: data.id,
                ...value
            })).then((res: any) => {
                if (res.payload.errCode === 0) {
                    dispatch(addDaily({
                        ten_hoat_dong: 'C???p nh???t c??ng t??c ngo??i n?????c',
                        fkMaCanBo: localStorage.getItem('cbId'),
                        noiDung: `C???p nh???t th??ng tin m???c c??ng t??c ngo??i n?????c ${value.id}`
                    }))
                    Swal.fire({
                        title: 'C???p nh???t Th??nh c??ng',
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
                bodyStyle={{ width: 634, height: 634, backgroundColor: '#fff', borderRadius: 16 }}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={onUpdate}
                >
                    <Typography.Title level={3} className={styles.title}>Chi ti???t c??ng t??c ngo??i n?????c</Typography.Title>
                    <Row className={styles.warpContainer}>
                        <Col flex={4} style={{ marginRight: 50 }}>
                            <Form.Item label={'T??n c??n b???'} name='fkMaCanBo'>
                                <Select placeholder='Ch???n c??n b???' className={styles.input} disabled={true}>
                                    {userOption}
                                </Select>
                            </Form.Item>
                            <Form.Item label={'Passport'} name='soPassport'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Qu???c gia'} name='quocGia'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'N??i ?????n'} name='noiden'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Ng??nh h???c'} name='nganhHoc'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>
                        </Col>
                        <Col flex={4}>
                            <Form.Item label={'Ng??y ??i'} name='ngayDi'>
                                <DatePicker className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label={'Ng??y v???'} name='ngayVe'>
                                <DatePicker className={styles.input} disabled={disableButton} />
                            </Form.Item>
                            <Form.Item label='Nh???p ph???n tr??m h?????ng l????ng' name='phanTramHuongLuong'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>

                            <Form.Item label={'Chi Ph??'} name='chiPhiCT'>
                                <Input className={styles.input} disabled={disableButton} />
                            </Form.Item>

                        </Col>
                        <Row className={styles.btn} style={{ marginTop: 80 }}>
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

export default ForeignUserDetail