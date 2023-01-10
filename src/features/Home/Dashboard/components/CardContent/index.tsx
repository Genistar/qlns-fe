import { Card, Space, Tag, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons';
import React from 'react'
import styles from '../../Dashboard.module.scss'

type Props = {
    icon: React.ReactNode;
    tag: {
        color: string;
        number: number;
    };
    title: string;
    number: number;
}
const iconCardStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60px',
    width: '60px',
    fontSize: '24px',
    borderRadius: '50%',
};
const CardContent = (props: Props) => {
    var { icon, title, number, tag } = props
    return (
        <Card className={styles["first-card"]} bodyStyle={{ padding: '12px' }}>
            <Space size={12}>
                {icon}
                <Typography.Text className={styles.text}>
                    {title}
                </Typography.Text>
            </Space>
            <Space
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '12px',
                }}
            >
                <Typography.Text className={styles.number}>
                    {number}
                </Typography.Text>
                <Tag
                    className={styles.tag}
                    style={{
                        backgroundColor: 'rgba(255, 149, 1, 0.15)',
                        color: tag.color,
                    }}
                >
                    {tag.number}%
                </Tag>
            </Space>
        </Card>
    )
}

export default CardContent