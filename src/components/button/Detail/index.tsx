import { FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import React, { memo } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    link: string;
    id: any
}

const Detail: React.FC<Props> = (props: Props) => {
    const { link, id } = props
    return (
        <Button style={{ width: 23 }} type="text">
            <Link to={link}><FileSearchOutlined style={{ marginLeft: -6 }} /></Link>
        </Button>

    )
}

export default memo(Detail)