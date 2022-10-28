import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, NavBar} from "antd-mobile";
import {useLocation, useNavigate} from "react-router-dom";
import {reqCityList, reqHotCity} from "../../api";
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { AiOutlineFire } from "react-icons/ai";
import './index.css'

function CityList(props) {
    // 城市列表
    const [cityList, setCityList] = useState({})
    // 城市索引
    const [cityIndex, setCityIndex] = useState([])
    // 右侧索引的状态
    const [activeIndex, setActiveIndex] = useState(0)
    // 提示框的状态
    const [visible, setVisible] = useState(false)
    // list Ref
    const listRef = useRef()
    // 索引名高度
    const TITLE_HEIGHT = 30
    // 城市名高度
    const CITY_HEIGHT = 45
    // 有房源的城市
    const HOUSE_CITY = ['北京','深圳','广州','上海']

    // 使用路由跳转
    const navigate = useNavigate()

    // 获取路由传参的城市
    const {state:{city}} = useLocation()

    // 返回到home
    const backHome = (value) => {
        navigate(value,{state:{city}})
    }

    // 选择了城市后返回home传当前选择的城市
    const choiceCity = (value,city) => {
        if (HOUSE_CITY.indexOf(city) !== -1) {
            navigate(value,{state:{city}})
        } else {
            setVisible(true)
        }
    }



    // 格式化城市列表
    const formatCityData = list => {
        const cList = {}

        list.forEach(item => {
            // 获取城市的首字母
            const first = item.short.substr(0,1)
            // 判断cityList 是否有该分类
            if (cList[first]) {
                // 有就往该分类添加数据
                cList[first].push(item)
            } else {
                // 没有就创建一个数组，把当前的数据添加进去
                cList[first] = [item]
            }

        })
        // 获取索引数据
        const cIndex = Object.keys(cList).sort()

        return {
            cList,
            cIndex
        }
    }

    // 处理字母索引的方法
    const formatCityIndex = (letter) => {
        switch (letter) {
            case '#':
                return '当前定位'
            case 'hot':
                return '热门城市'
            default:
                return letter.toUpperCase()
        }
    }

    // 获取城市列表
    const getCityList = useCallback(() => {
        let cityList = {}
        let cityIndex = []
        reqCityList('1').then((value) => {
            const result = value.data
            if (result.status === 200) {
                const {cIndex, cList} = formatCityData(result.body)
                cityIndex = cIndex
                cityList = cList
                // 获取热门城市
                const getHotCity = () => {
                    reqHotCity().then((value) => {
                        const result = value.data
                        if (result.status === 200) {
                            cityList['hot'] = result.body
                            cityList['#'] = [{label: city,value: city}]
                            cityIndex.unshift('hot')
                            cityIndex.unshift('#')
                            setCityList(cityList)
                            setCityIndex(cityIndex)
                        }
                    })
                }
                getHotCity()
            }
        })
    },[city])

    // 将要挂载时获取热门城市
    useEffect(() => {
        getCityList()
    },[getCityList])

    // 渲染城市列表每一行的内容
    const rowRenderer = ({
                              key,         // Unique key within array of rows
                              index,       // 索引号
                              isScrolling, // 当前项是否正在滚动中
                              isVisible,   // 当前项在List中是可见的
                              style        // 重点属性：一定要给每一个行数添加该样式
                          }) => {
        const letter = cityIndex[index]
        return (
            <div key={key} style={style} className='city'>
                <div className='cityIndex'>{formatCityIndex(letter)}</div>
                {
                    cityList[letter].map(item => (
                        <div className='cityName' key={item.value} onClick={() => {choiceCity('/home', item.label)}}>
                            {item.label}
                        </div>
                    ))
                }
            </div>
        )
    }

    // 动态计算渲染的每一行的高度
    const getRowHeight = ({ index }) => {
        // 索引标题高度 + 城市名称高度 * 城市名称的高度

        return TITLE_HEIGHT + cityList[cityIndex[index]].length * CITY_HEIGHT
    }

    // 点击右侧索引跳转到相应的行
    const jumpIndex = (index) => {
        listRef.current.scrollToRow(index)
    }

    // 遍历右侧索引
    const cityIndexItems = cityIndex.map((item, index) => (
        <li className='city-index-item' key={item} onClick={() => {jumpIndex(index)}}>
            <span className={activeIndex === index ? 'index-active' : ''}>{item === 'hot' ? <AiOutlineFire /> : item.toUpperCase()}</span>
        </li>
    ))

    // 获取list组件中分类行的信息
    const onRowsRendered = ( {startIndex} ) => {
        if (activeIndex !== startIndex) {
            setActiveIndex(startIndex)
        }
    }


    return (
        <div className='cityList'>
            <NavBar onBack={() => {backHome('/home')}} className='cityListBar'>城市选择</NavBar>
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <List
                            ref={listRef}
                            // 组件的宽度
                            width={width}
                            // 组件的高度
                            height={height}
                            rowCount={cityIndex.length}
                            // 每行的高度
                            rowHeight={getRowHeight}
                            rowRenderer={rowRenderer}
                            onRowsRendered={onRowsRendered}
                            scrollToAlignment='start'
                        />
                    )
                }
            </AutoSizer>

            <ul className='city-index'>
                {cityIndexItems}
            </ul>

            {/*没房源城市提醒框*/}
            <Modal
                visible={visible}
                content='该城市暂无房源，请选择其他城市'
                closeOnAction
                onClose={() => {
                    setVisible(false)
                }}
                actions={[
                    {
                        key: 'confirm',
                        text: '我知道了',
                    },
                ]}
            />
        </div>

    );
}

export default CityList;