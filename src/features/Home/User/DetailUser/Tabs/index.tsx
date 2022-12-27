import React, { memo } from 'react'
import { Tabs } from 'antd';
import Detail1 from './Tab/Detail1';
import { can_bo_giang_day } from '../../../../../interface';
import Detail2 from './Tab/Detail2';
import Detail3 from './Tab/Detail3';
import Detail4 from './Tab/Detail4';
import Detail5 from './Tab/Detail5';

type Props = {
    user: can_bo_giang_day | null,
    disableButton: any,
    cities: any,
    districts: any,
    wards: any
}

const TabUser = (props: Props) => {
    const { user, disableButton, cities, districts, wards } = props
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <Tabs
            defaultActiveKey="1"
            onChange={onChange}
            style={{ width: '60%', marginTop: -40 }}
            items={[
                {
                    label: `Lý lịch cá nhân`,
                    key: '1',
                    children: <Detail1 user={user} disableButton={disableButton} cities={cities} districts={districts} wards={wards} />,
                },
                {
                    label: `Lý lịch`,
                    key: '2',
                    children: <Detail2 disableButton={disableButton} cities={cities} />,
                },
                {
                    label: `Công tác đơn vị/Học vấn`,
                    key: '3',
                    children: <Detail3 disableButton={disableButton} />,
                },
                {
                    label: `Bản thân`,
                    key: '4',
                    children: <Detail4 disableButton={disableButton} />,
                },
                {
                    label: `Gia đình`,
                    key: '5',
                    children: <Detail5 disableButton={disableButton} />,
                }
            ]}
        />
    )
}

export default memo(TabUser)