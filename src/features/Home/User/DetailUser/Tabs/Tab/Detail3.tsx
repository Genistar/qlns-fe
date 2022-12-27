import { Col, Input, Row, Typography, Form, DatePicker, Select } from 'antd'
import React from 'react'
import { hvptHeOption, hvptLopOption, llctOption, qlnnOption, tdptOption, tdthOption } from '../../../../../../constant/selectOption'
import styles from '../../../Style.module.scss'

type Props = {
    disableButton: any
}

const Detail3 = (props: Props) => {
    let { disableButton } = props;
    return (
        <Row>
            <Col style={{ left: 0, width: 300 }}>
                <Form.Item
                    label={<Typography.Text>Nghề nghiệp khi được tuyển dụng</Typography.Text>}
                    className={styles.items}
                    name='nghe_nghiep_tuyen_dung'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Ngày tuyển dụng</Typography.Text>}
                    className={styles.items}
                    name='ngay_vao_truong'
                    style={{ width: 280 }}
                >
                    <DatePicker className={styles.input} disabled={disableButton} style={{ width: 280 }} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Cơ quan tuyển dụng</Typography.Text>}
                    className={styles.items}
                    name='co_quan_cong_tac'
                    style={{ width: 280 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Công việc chính được giao</Typography.Text>}
                    className={styles.items}
                    name='cong_viec_chinh'
                    style={{ width: 280 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Sở trường công tác</Typography.Text>}
                    className={styles.items}
                    name='nang_luc_so_truong_nk'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Tình trạng công tác</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_tinh_trang'
                    style={{ width: 280 }}
                >
                    <Input value={'1'} className={styles.input} disabled={disableButton} />
                </Form.Item>
            </Col>
            <Col style={{ left: 0, width: 300 }}>
                <Form.Item
                    label={<Typography.Text>Trình độ học vấn</Typography.Text>}
                    className={styles.items}
                    name='fk_td_pho_thong'
                    style={{ width: 280 }}
                >
                    <Select options={tdptOption} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Trình độ chuyên môn</Typography.Text>}
                    className={styles.items}
                    name='chuyen_mon'
                    style={{ width: 280 }}
                >
                    <Input className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Lý luận chính trị</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_trinh_do_llct'
                    style={{ width: 280 }}
                >
                    <Select options={llctOption} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Quản lý nhà nước</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_trinh_do_qlnn'
                    style={{ width: 280 }}
                >
                    <Select options={qlnnOption} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Form.Item
                    label={<Typography.Text>Trình độ tin học</Typography.Text>}
                    className={styles.items}
                    name='fk_ma_tdo_tin_hoc'
                    style={{ width: 280 }}
                >
                    <Select options={tdthOption} className={styles.input} disabled={disableButton} />
                </Form.Item>
                <Row>
                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>Lớp</Typography.Text>}
                            className={styles.items}
                            name='hvpt_lop'
                            style={{ width: 140 }}
                        >
                            <Select options={hvptLopOption} className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col>
                    <Col flex={3}>
                        <Form.Item
                            label={<Typography.Text>Hệ</Typography.Text>}
                            className={styles.items}
                            name='hvpt_he'
                            style={{ width: 140 }}
                        >
                            <Select options={hvptHeOption} className={styles.input} disabled={disableButton} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Detail3