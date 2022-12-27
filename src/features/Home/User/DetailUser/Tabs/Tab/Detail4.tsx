import { Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd'
import React from 'react'
import styles from '../../../Style.module.scss'

type Props = {
    disableButton: any
}

const Detail4 = (props: Props) => {
    let { disableButton } = props;
    return (
        <Row>
            <Col style={{ left: 0, width: 300 }}>
                <Form.Item
                    label={<Typography.Text>Tình trạng sức khỏe</Typography.Text>}
                    className={styles.items}
                    name='tinh_trang_suc_khoe'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Chiều cao</Typography.Text>}
                    className={styles.items}
                    name='chieu_cao'
                    style={{ width: 280 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Cân nặng</Typography.Text>}
                    className={styles.items}
                    name='can_nang'
                    style={{ width: 280 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
            <Col style={{ left: 0, width: 300 }}>
                <Form.Item
                    label={<Typography.Text>Nhóm máu</Typography.Text>}
                    className={styles.items}
                    name='nhom_mau'
                    style={{ width: 280 }}
                >
                    <Select placeholder='Chọn nhóm máu' className={styles.input} disabled={disableButton}>
                        <Select.Option key='A' value='A'>A</Select.Option>
                        <Select.Option key='B' value='B'>B</Select.Option>
                        <Select.Option key='AB' value='AB'>AB</Select.Option>
                        <Select.Option key='O' value='O'>O</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Con thương binh hạng</Typography.Text>}
                    className={styles.items}
                    name='thuong_binh_hang'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Con gia đình chính sách</Typography.Text>}
                    className={styles.items}
                    name='hoan_canh_gia_dinh'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
            <Col style={{ width: 600 }}>
                <Form.Item
                    label={<Typography.Text>Lịch sử bản thân</Typography.Text>}
                    className={styles.items}
                    name='lich_su_ban_than'
                    style={{ width: 580, height: 100 }}
                >
                    <Input.TextArea value={'1'} className={styles.input} disabled={disableButton} style={{ height: 80 }} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Thân nhân nước ngoài</Typography.Text>}
                    className={styles.items}
                    name='than_nhan_nuoc_ngoai'
                    style={{ width: 580, height: 100 }}
                >
                    <Input.TextArea value={'1'} className={styles.input} disabled={disableButton} style={{ height: 80 }} />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default Detail4