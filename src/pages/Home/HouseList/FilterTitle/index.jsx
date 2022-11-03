import React, {useCallback, useEffect, useState} from 'react';
import {Tabs} from "antd-mobile";
import FilterPicker from "../FilterPicker";
import './index.css'
import FilterMore from "../FilterMore";
import {reqCondition, reqFindHouse} from "../../../../api";

function FilterTitle(props) {
    // 选择激活的选项
    const [activeKey, setActiveKey] = useState('')
    // 点击确认后获取选择的数据
    const [choseData, setChoseData] = useState([])
    // 筛选的信息
    const [result, setResult] = useState({})
    // 地区
    const [area, setArea] = useState({})
    // 方式
    const [mode, setMode] = useState({})
    // 价格
    const [price, setPrice] = useState({})
    // 更多筛选
    const [more, setMore] = useState({})
    // 获取当前的城市id
    const cityId = localStorage.getItem('value')
    const {setHouseList} = props
    // 格式化后的more数据
    const newMore = []

    // 判断more的属性有该属性才添加到新的数组
    if([more?.characteristic][0] !== undefined) newMore.push(more.characteristic)
    if([more?.floor][0] !== undefined) newMore.push(more.floor)
    if([more?.oriented][0] !== undefined) newMore.push(more.oriented)
    if([more?.roomType][0] !== undefined) newMore.push(more.roomType)

    // 整理选择的数据
    const params = {
        cityId,
        area: area[1] === undefined ? 'null' : area[2] === 'null' ? area[1] : area[2] || 'null',
        mode: mode[0] === undefined ? 'null' : mode[0],
        price: price[0] === undefined ? 'null' : price[0],
        more: newMore.join(','),
        start :1,
        end: 20
    }

    // 获取条件筛选的房屋
    const getHouse = () => {
        reqFindHouse(params).then((value) => {
            const result = value.data
            if (result.status === 200) {
                setHouseList(result.body.list)
            }
        })
    }

    // 点击取消，删除选中的激活key
    const cancel = () => {
        setActiveKey('')
    }

    // 点击确认，删除选中的激活key，收集选中的信息
     const ok = () => {
         console.log(params)
         getHouse()
         setActiveKey('')
         activeKey === 'area' ? setArea(choseData) : activeKey === 'plan' ? setMode(choseData) : setPrice(choseData)
     }

     // FilterMore组件确认关闭组件的方法
    const closeFilterMore = () => {
        setActiveKey('')
        getHouse()
    }

    // 获取房屋的查询条件
    const getCondition = useCallback(() => {
        reqCondition(cityId).then((value) => {
            const result = value.data
            if (result.status === 200) {
                setResult(result.body)
            }
        })
    },[cityId])

    useEffect(() => {
        getHouse()
    },[])

    useEffect(() => {
        getCondition()
    },[getCondition])

    return (
        <div>
            <div className='navHeader-chose'>
                <Tabs
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key)
                        getHouse()
                    }}
                >
                    <Tabs.Tab title='区域' key='area'>
                        <FilterPicker getChoseData={value => setChoseData(value)} result={activeKey === 'area' ? [result.area, result.subway]: ''}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='方式' key='plan'>
                        <FilterPicker getChoseData={value => setChoseData(value)} result={activeKey === 'plan' ? result.rentType : ''}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='租金' key='price'>
                        <FilterPicker getChoseData={value => setChoseData(value)} result={activeKey === 'price' ? result.price : ''}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='筛选' key='chose'>
                        <div className='chose'>
                            <FilterMore result={result} closeFilterMore={closeFilterMore} setMore={setMore}/>
                        </div>
                    </Tabs.Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default FilterTitle;