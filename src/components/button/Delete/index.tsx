import { Button, Modal } from 'antd'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React, { memo } from 'react';
import Swal from 'sweetalert2';
import Warning from '../../Icon/Warning';
import { useAppDispatch } from '../../../store/store';
import { addDaily } from '../../../features/Home/Admin/Setting/DailyManagement/dailySlice';
const { confirm } = Modal;
type Props = {
    id: any,
    title: string,
    removeAction: any,
    deleteAction: any,
    dailyName: string
}

const Delete: React.FC<Props> = (props: Props) => {
    const { id, title, removeAction, deleteAction, dailyName } = props;
    let cbId = localStorage.getItem('cbId')
    const dispatch = useAppDispatch();
    const onDelete = (id: string) => {
        dispatch(removeAction({ id }))
        dispatch(deleteAction(id)).then((res: any) => {
            if (res.payload.errCode === 0) {
                dispatch(addDaily({
                    ten_hoat_dong: 'Xóa',
                    fkMaCanBo: cbId,
                    noiDung: `${dailyName} ${id}`
                }))
                Swal.fire({
                    title: `Xóa thành công`,
                    text: res.payload.errMessage,
                    icon: 'success'
                })
            }
            else {
                Swal.fire({
                    title: `Xảy ra lỗi`,
                    text: res.payload.errMessage,
                    icon: 'error'
                })
            }
        })

    }
    const showDeleteConfirm = (id: any) => {
        // confirm({
        //     title: `Bạn có chắc chắn muốn xóa mục ${title} này không?`,
        //     icon: <ExclamationCircleFilled />,
        //     content: <Warning />,
        //     okText: 'Có',
        //     okType: 'danger',
        //     cancelText: 'Khum',
        //     onOk() {
        //         onDelete(id)
        //     },
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // });
        Swal.fire({
            title: `Bạn có chắc chắn muốn xóa mục ${title} này không?`,
            text: 'Bạn có muốn xóa mục này hay không?',
            icon: 'warning',
            showDenyButton: true,
            denyButtonText: 'Quay lại',
            confirmButtonText: 'Xác nhận'
        }).then(response => {
            if (response.isConfirmed) {
                onDelete(id)
            }
        })
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