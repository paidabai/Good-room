import React, {useCallback, useEffect, useState} from 'react';
import {NavBar} from "antd-mobile";
import {useLocation, useNavigate} from "react-router-dom";
import {reqCityList, reqHotCity} from "../../api";
import List from 'react-virtualized/dist/es/List'

function CityList(props) {
    // // 热门城市
    // const [hotCity, setHotCity] = useState([])
    // // 城市列表
    // const [cityList, setCityList] = useState({})
    // // 城市索引
    // const [cityIndex, setCityIndex] = useState([])

    let cityList = {}
    let cityIndex = []

    // 使用路由跳转
    const navigate = useNavigate()

    // 获取路由传参的城市
    const {state:{city}} = useLocation()

    // 返回到home
    const backHome = (value) => {
        navigate(value,{state:{city}})
    }

    // 选择了热门城市后返回home传当前选择的城市
    const choiceHostCity = (value,city) => {
        navigate(value,{state:{city}})
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

    // 获取城市列表
    const getCityList = useCallback(() => {
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
                            cityList['#'] = [{city}]
                            cityIndex.unshift('hot')
                            cityIndex.unshift('#')
                            console.log(cityIndex,cityList)
                        }
                    })
                }
                getHotCity()
            }
        })
    },[])

    // 将要挂载时获取热门城市
    useEffect(() => {
        getCityList()
    },[getCityList])


    return (
        <div>
            <NavBar onBack={() => {backHome('/home')}} style={{height: 42,}}>城市选择</NavBar>
        </div>
    );
}

export default CityList;