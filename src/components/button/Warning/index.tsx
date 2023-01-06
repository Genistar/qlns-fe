import { Button } from 'antd'
import React from 'react'
import styles from '../Style.module.scss'

type Props = {
    title: string,
    giaHan?: any,
    showConfirm: () => void
}

const WarningButton = (props: Props) => {
    var { title, giaHan, showConfirm } = props;
    return (
        <div className={styles["f-modal-alert"]}>
            <Button
                className={
                    giaHan < 30 && giaHan > 7 ? `${styles["f-modal-icon"]} ${styles["f-modal-warning"]} ${styles["scaleWarning"]}` :
                        (giaHan < 7 && giaHan > 0 ?
                            `${styles["f-modal-icon-red"]} ${styles["f-modal-warning-red"]} ${styles["scaleWarning-red"]}`
                            : (giaHan < 0 ? styles['btn-red'] : styles['btn-normal']))
                }

                onClick={showConfirm}
                disabled={giaHan > 30 ? true : false}
            >
                {title}
            </Button>
        </div>

    )
}

export default WarningButton