import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import React, { memo } from 'react'

type Props = {
    onDelete: (id: any) => void,
    id: any
}

const Delete: React.FC<Props> = (props: Props) => {
    const { onDelete, id } = props
    return (
        <Button
            type="default"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(id)}
        />
    )
}

export default memo(Delete)