import React, {useEffect, useState} from 'react';
import {CascadePickerView} from "antd-mobile";
import './index.css'


function FilterPicker(props) {
    // 选择的value值
    const [value, setValue] = useState([])
    // 需要渲染的数据
    const [options, setOptions] = useState([])

    // prop获取选中的值
    const {getChoseData, result} = props

    useEffect(() => {
        setOptions(result)
    },[result])

    return (
        <div>
            <CascadePickerView
                options={options}
                value={value}
                onChange={val => {
                    setValue(val)
                    getChoseData(val)
                }}
            />
        </div>
    );
}

export default FilterPicker;