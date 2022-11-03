import React, {useEffect, useState} from 'react';
import {CascadePickerView} from "antd-mobile";
import './index.css'


function FilterPicker(props) {
    // 选择的value值
    const [value, setValue] = useState([])
    // 需要渲染的数据
    const [options, setOptions] = useState([])
    // 加载状态
    const [loading, setLoading] = useState(true)

    // prop获取选中的值
    const {getChoseData, result} = props

    useEffect(() => {
        if (result !== undefined && result[0] !== undefined) {
            setOptions(result)
            setLoading(false)
        }
    },[result])

    return (
        <div>
            <CascadePickerView
                loading={loading}
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