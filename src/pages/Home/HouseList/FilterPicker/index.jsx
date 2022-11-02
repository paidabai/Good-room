import React, {useEffect, useState} from 'react';
import {CascadePickerView} from "antd-mobile";
import PubSub from 'pubsub-js'
import './index.css'


function FilterPicker(props) {
    // 选择的value值
    const [value, setValue] = useState([])
    // 需要渲染的数据
    const [options, setOptions] = useState([])
    // 选择时的加载的状态
    const [loading, setLoading] = useState(false)
    // pubSub数据
    const [result, setResult] = useState({})


    // prop获取选中的值
    const {getChoseData, type} = props

    console.log(type)

    useEffect(() => {
        PubSub.subscribe('result', (msg, data) => {
            setResult(data.body)
        })
    },[type])

    useEffect(() => {
        if (Object.keys(result).length !== 0) {
            const {area, subway, rentType, price} = result
            type === 'area' ? setOptions([area, subway]) : type === 'plan' ? setOptions(rentType) : setOptions(price)
        }
    },[result, type])

    console.log('@',options)

    return (
        <div>
            <CascadePickerView
                options={options}
                loading={loading}
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