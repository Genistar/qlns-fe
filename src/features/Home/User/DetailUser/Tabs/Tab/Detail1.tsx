import { Col, Form, Input, Row, Typography, Select, DatePicker } from 'antd'
import React, { useEffect, useState, memo } from 'react'
import { can_bo_giang_day } from '../../../../../../interface'
import styles from '../../../Style.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../../../store/store'
import { getAllCities, getAllDistricts, getAllWards, locationUserSelector } from '../../../../../../slices/locationSlice'
import { directorySelector, getNationD, getReligionD } from '../../../../../../slices/directorySlice';
import { sexOptions } from '../../../../../../constant/selectOption'


type Props = {
    user: can_bo_giang_day | null,
    disableButton: any,
    cities: any,
    districts: any,
    wards: any
}

const Detail1 = (props: Props) => {
    const [cityId, setCityId] = useState<any>(null);
    const [districtId, setdistrictId] = useState<any>(null);
    const { user, disableButton, cities, districts, wards } = props;
    const dispatch = useAppDispatch();
    const { religionD, nationD } = useAppSelector(directorySelector);
    useEffect(() => {
        dispatch(getAllCities());
        dispatch(getReligionD());
        dispatch(getNationD())
    }, [])
    useEffect(() => {
        if (cityId) {
            dispatch(getAllDistricts(cityId))
        } else {
            return
        }
    }, [cityId])
    useEffect(() => {
        if (districtId) {
            dispatch(getAllWards(districtId))
        } else {
            return
        }

    }, [districtId])
    let citiesOption = cities.map((c: any, index: number) => (
        {
            value: c.id,
            label: c.name
        }
    ))
    let districtsOption = districts.map((d: any, index: number) => (
        {
            value: d.id,
            label: d.name
        }
    ))
    let wardsOption = wards.map((w: any, index: number) => (
        {
            value: w.id,
            label: w.name
        }
    ))
    const tongiaoOption = religionD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten_ton_giao}</Select.Option>
    ))
    const dantocOption = nationD.map((d: any, index) => (
        <Select.Option key={index} value={d.id}>{d.ten_dan_toc}</Select.Option>
    ))
    return (
        <Row>
            <Col flex={5} style={{ left: -50, width: 200 }}>
                <Form.Item
                    label={<Typography.Text>H??? v?? t??n</Typography.Text>}
                    className={styles.items}
                // name='fullname'
                >
                    <Input className={styles.input} value={`${user?.ho} ${user?.ten}`} disabled={true} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Ng??y sinh</Typography.Text>}
                    className={styles.items}
                    name='ngay_sinh'
                >
                    <DatePicker className={styles.input} disabled={disableButton} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Email</Typography.Text>}
                    className={styles.items}
                    name='email'
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>S??? ??i???n tho???i</Typography.Text>}
                    className={styles.items}
                    name='dien_thoai'
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
            <Col flex={5} style={{ left: -50, width: 200 }}>
                <Form.Item
                    label={<Typography.Text>Gi???i t??nh</Typography.Text>}
                    className={styles.items}
                    name='phai'
                >
                    <Select placeholder='Gi???i t??nh' className={styles.cardFormInput} options={sexOptions} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>D??n t???c</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_dan_toc'
                >
                    <Select placeholder='Ch???n d??n t???c' className={styles.cardFormInput} disabled={disableButton}>
                        {dantocOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>T??n gi??o</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_ton_giao'
                >
                    <Select placeholder='Ch???n t??n gi??o' className={styles.cardFormInput} disabled={disableButton}>
                        {tongiaoOption}
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>N??i sinh</Typography.Text>}
                    className={styles.items}
                    name='noi_sinh'
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
            <Col style={{ left: -50, width: 700 }}>
                <Row style={{ width: 680, zIndex: 100 }}>
                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>N??i ??? hi???n nay</Typography.Text>}
                            className={styles.items}
                            name='dia_chi'
                            style={{ width: 150 }}
                        >
                            <Input placeholder='Nh???p s??? nh??,???????ng' className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col>
                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>Tinh/TP</Typography.Text>}
                            className={styles.items}
                            name='tinh_tp_dia_chi'
                            style={{ width: 150 }}
                        >
                            <Select
                                placeholder='Ch???n t???nh'
                                className={styles.cardFormInput}
                                disabled={disableButton}
                                options={citiesOption}
                                onChange={(e) => {
                                    if (e !== cityId) {
                                        setCityId(e)
                                        setdistrictId(null);
                                        districtsOption = []
                                        wardsOption = []
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>Qu???n/Huy???n</Typography.Text>}
                            className={styles.items}
                            name='quan_huyen_dia_chi'
                            style={{ width: 150 }}
                        >
                            <Select
                                placeholder='Ch???n Qu???n/Huy???n'
                                className={styles.cardFormInput}
                                disabled={disableButton}
                                onChange={(e) => {
                                    if (e !== cityId) {
                                        setdistrictId(e);
                                        wardsOption = []
                                    }
                                }}
                                defaultValue={districtId}
                                options={districtsOption}
                            />
                        </Form.Item>
                    </Col>
                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>X??/Ph?????ng</Typography.Text>}
                            className={styles.items}
                            name='xa_phuong_dia_chi'
                            style={{ width: 150 }}
                        >
                            <Select
                                placeholder='Ch???n X??/Ph?????ng'
                                className={styles.cardFormInput}
                                options={wardsOption}
                                disabled={disableButton}
                            />

                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col style={{ left: -50, width: 700 }}>
                <Form.Item
                    label={<Typography.Text>Qu?? qu??n</Typography.Text>}
                    className={styles.items}
                    name='que_quan'
                    style={{ width: 655 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
        </Row>

    )
}

export default memo(Detail1)