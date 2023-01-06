import React from 'react';
import styles from './Style.module.scss'

type Props = {}

const Warning: React.FC = (props: Props) => {
  return (
    <div className={styles["f-modal-alert"]}>
      <div className={`${styles["f-modal-icon"]} ${styles["f-modal-warning"]} ${styles["scaleWarning"]}`}>
        <span className={`${styles["f-modal-body"]} ${styles["pulseWarningIns"]}`}></span>
        <span className={`${styles["f-modal-dot"]} ${styles["pulseWarningIns"]}`}></span>
      </div>
    </div>
  )
}

export default Warning