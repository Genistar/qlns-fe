import { Button, Modal } from 'antd'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React, { memo } from 'react'
import Warning from '../../Icon/Warning';
const { confirm } = Modal;
type Props = {
    onDelete: (id: any) => void,
    id: any,
    title: string
}

const Delete: React.FC<Props> = (props: Props) => {
    const { onDelete, id, title } = props;
    const showDeleteConfirm = (id: any) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa mục ${title} này không?`,
            icon: <ExclamationCircleFilled />,
            content: <Warning />,
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Khum',
            onOk() {
                onDelete(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    return (
        <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(id)}
        />
    )
}

export default memo(Delete)