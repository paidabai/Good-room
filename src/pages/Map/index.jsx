import React, {useCallback, useEffect, useState} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import NavHeader from "../../components/NavHeader";
import './index.css'
import {reqCityLatitudeAndLongitude} from "../../api";
import {HOUSE_CITY} from "../../utils/constants";
import {Modal} from "antd-mobile";
import {useNavigate} from "react-router-dom";

function Map(props) {
    // 城市的经纬度
    const [latitudeAndLongitude, setLatitudeAndLongitude] = useState([])
    // 提示框的状态
    const [visible, setVisible] = useState(false)
    // 路由跳转
    const navigate = useNavigate();

    // 高德地图web服务的key
    const MAP_KRY = '766b17108106f2562aa149e5b4b6b3e2'

    // 当前的城市
    const city = localStorage.getItem('city')

    // 获取城市经纬度
    const getCityLatitudeAndLongitude = useCallback(() => {
        reqCityLatitudeAndLongitude(city).then((value) => {
            const result = value.data
            if (result.status === '1') {
                setLatitudeAndLongitude(result.geocodes[0].location.split(',').map(Number))
            }
        })
    },[city])

    useEffect(() => {
        getCityLatitudeAndLongitude()
    },[getCityLatitudeAndLongitude,city])

    if (latitudeAndLongitude.length !== 0) {
        AMapLoader.load({
            "key": `${MAP_KRY}`,              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等

        }).then((AMap)=>{
            new AMap.Map('container',{
                zoom: 11,//级别
                center: latitudeAndLongitude,//中心点坐标
                viewMode:'3D'//使用3D视图
            });
        }).catch(e => {
            console.log(e);
        })
    }
    // 判断城市是否有房源
    useEffect(() => {
        if (HOUSE_CITY.indexOf(city) === -1) {
            setVisible(true)
        }
    },[city])

    return (
        <div className='map'>
            <NavHeader>地图找房</NavHeader>
            <div id='container'></div>

            {/*没房源城市提醒框*/}
            <Modal
                visible={visible}
                content='该城市暂无房源，请选择其他城市'
                closeOnAction
                onClose={() => {
                    navigate('/home')
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

export default Map;