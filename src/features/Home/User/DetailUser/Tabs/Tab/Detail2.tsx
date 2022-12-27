import { Col, Input, Row, Typography, Form, DatePicker } from 'antd'
import React from 'react'
import styles from '../../../Style.module.scss'

type Props = {
    disableButton: any
}

const Detail2 = (props: Props) => {
    let { disableButton } = props;
    return (
        <Row>
            <Col style={{ left: 0, width: 600 }}>
                <Form.Item
                    label={<Typography.Text>Hộ khẩu thường trú</Typography.Text>}
                    className={styles.items}
                    name='ho_khau_thuong_tru'
                    style={{ width: 600 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>

            </Col>
            <Col style={{ left: 0, width: 600 }}>
                <Row>
                    <Col flex={5} style={{ left: 0 }}>
                        <Form.Item
                            label={<Typography.Text>Số CMND</Typography.Text>}
                            className={styles.items}
                            name='so_cmnd'
                            style={{ width: 280 }}
                        >
                            <Input value={'1'} className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Nơi cấp</Typography.Text>}
                            className={styles.items}
                            name='noi_cap'
                            style={{ width: 280 }}
                        >
                            <Input className={styles.input} disabled={disableButton} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày vào đảng</Typography.Text>}
                            className={styles.items}
                            // name='ngay_vao_dang'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày nhập ngũ</Typography.Text>}
                            className={styles.items}
                            // name='ngay_nhap_ngu'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Quân hàm cao nhât</Typography.Text>}
                            className={styles.items}
                            name='quan_ham_cao_nhat'
                            style={{ width: 280 }}
                        >
                            <Input value={'1'} className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col>
                    <Col flex={5} style={{ left: 0 }}>
                        <Form.Item
                            label={<Typography.Text>Ngày cấp</Typography.Text>}
                            className={styles.items}
                            name='ngay_cap'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày vào đoàn</Typography.Text>}
                            className={styles.items}
                            name='ngay_vao_doan'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Chính thức</Typography.Text>}
                            className={styles.items}
                            name='ngay_vao_dang_chinh_thuc'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày xuất ngũ</Typography.Text>}
                            className={styles.items}
                            name='ngay_xuat_ngu'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Typography.Text>Ngày vào trường</Typography.Text>}
                            className={styles.items}
                            name='ngay_vao_truong'
                            style={{ width: 280 }}
                        >
                            <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Detail2