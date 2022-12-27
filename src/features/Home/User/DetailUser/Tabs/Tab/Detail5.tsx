import { Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import FamilyUserList from '../../../FamilyUser/List'
import styles from '../../../Style.module.scss'

type Props = {
    disableButton: any
}

const Detail5 = (props: Props) => {
    let { disableButton } = props;
    return (
        <Row>
            <Col span={24}>
                <FamilyUserList />
            </Col>
        </Row>
    )
}

export default Detail5