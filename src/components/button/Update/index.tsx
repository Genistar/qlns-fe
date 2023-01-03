import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import React, { memo } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    link: string;
    id: any
}

const Update: React.FC<Props> = (props: Props) => {
    const { link, id } = props
    return (
        <Button style={{ width: 23 }} type="default">
            <Link to={link}><EditOutlined style={{ marginLeft: -6 }} /></Link>
        </Button>

    )
}

export default memo(Update)