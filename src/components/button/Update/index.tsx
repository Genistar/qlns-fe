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
        <Button type="default">
            <Link to={link}><EditOutlined /></Link>
        </Button>

    )
}

export default memo(Update)