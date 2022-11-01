import React, {useState} from 'react';
import {CascadePickerView} from "antd-mobile";
import {reqArea} from "../../../../api";


function FilterPicker(props) {
    const [value, setValue] = useState(['区域', '北京'])

    // prop获取选中的值
    const {getChoseData} = props

    // 获取当前城市的地区
    const AreaData = JSON.parse(localStorage.getItem('AreaData'))

    // 准备格式化后的容器
    const areaOptions = []

    // 格式化当前城市的地区
     AreaData.forEach(item => {
        areaOptions.push({label:item.label, value:item.label, areaId:item.value})
    })

    // 添加首条数据
    areaOptions.unshift({label: '不限', value: '不限'})

    // 获取地区信息
    const getAreaData = (id) => {
        reqArea(id).then((value) => {
            const result = value.data
            if (result.status === 200) {
                console.log(result)
            }
        })
    }

    console.log(areaOptions)
    console.log(value[1])
    areaOptions.map(item => {
        if (item.value === value[1]){
           if (item.areaId !== undefined) {
               setTimeout(() => {
                   getAreaData(item.areaId)
               },2000)
           }
        }
        return ''
    })

    const options = [
        {
            label: '区域',
            value: '区域',
            children: areaOptions
        },
        {
            label: '地铁',
            value: '地铁',
            children: [
                {
                    label: '南京',
                    value: '南京',
                },
                {
                    label: '苏州',
                    value: '苏州',
                },
            ],
        },
    ]

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