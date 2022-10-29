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
            "plugins": ['AMap.Scale', 'AMap.ToolBar'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等

        }).then((AMap)=>{
             let map = new AMap.Map('container',{
                resizeEnable: true,
                zoom: 11,//级别
                center: latitudeAndLongitude,//中心点坐标
                viewMode:'3D'//使用3D视图
            });
             // 添加插件
                map.addControl(new AMap.Scale())
                map.addControl(new AMap.ToolBar())
             // 添加文本覆盖物
             let info = [];
             info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
             info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
             info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
             info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");

            // 创建 infoWindow 实例
            let infoWindow = new AMap.InfoWindow({
                 isCustom: true,  //使用自定义窗体
                 content: info.join(""),  //传入 dom 对象，或者 html 字符串
             });
             infoWindow.open(map, map.getCenter());
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
                    setVisible(false)
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