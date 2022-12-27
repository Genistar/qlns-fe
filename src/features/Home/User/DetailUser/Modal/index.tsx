import { Button, message as notice } from 'antd';
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react';
import CV from '../../../../../components/CV';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getUser, userSelector } from '../../../../Auth/userSlice';
import styles from '../../Modal.module.scss';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Props = {
    // id: string,
    // data: any,
    // cbId: string | null
}

const ModalPrintPDF = (props: Props) => {
    const [isVisiableModal, setIsVisiableModal] = useState(false);
    const id = localStorage.getItem('cbId');
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(userSelector);
    useEffect(() => {
        dispatch(getUser(id))
    }, [id])
    const printPDF = () => {
        const contentToPrint: any = document.getElementById('content');
        html2canvas(contentToPrint)
            .then((canvas) => {
                // const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                // pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
            ;
    }
    return (
        <div>
            <Button
                type="primary"
                onClick={() => setIsVisiableModal(true)}
                size='large'
                style={{ borderRadius: 8, height: 44, width: 120, marginLeft: 20 }}
            >
                Word
            </Button>
            <Modal
                title={false}
                footer={false}
                visible={isVisiableModal}
                closable={true}
                closeIcon={<p onClick={() => setIsVisiableModal(false)}>x</p>}
                className={styles.modalContainer}
                bodyStyle={{ width: 660, backgroundColor: '#fff', borderRadius: 16 }}
            >
                <CV user={user} printPDF={printPDF} />
            </Modal>
        </div>

    )
}

export default ModalPrintPDF