import { Select, Typography } from 'antd'
import React from 'react'

type Props = {
    title?: string,
    options: any,
    selectStyle?: any,
    setValue?: any
}

const SelectItem: React.FC<Props> = (props: Props) => {
    var { title, options, selectStyle, setValue } = props;
    const handleChange = (value: string) => {
        setValue(value);
    };
    return (
        <div>

            <Select
                defaultValue={'Tất cả'}
                onChange={handleChange}
                options={options}
                size={'large'}
                className={selectStyle}
            />
        </div>
    )
}

export default SelectItem