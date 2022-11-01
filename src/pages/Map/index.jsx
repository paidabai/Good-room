import React, {useCallback, useEffect, useRef, useState} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import NavHeader from "../../components/NavHeader";
import './index.css'
import {reqArea, reqCityLatitudeAndLongitude, reqHouses} from "../../api";
import {BASE_URL, HOUSE_CITY} from "../../utils/constants";
import {Modal, SpinLoading} from "antd-mobile";
import {useNavigate} from "react-router-dom";

function Map(props) {
    // 城市的经纬度
    const [latitudeAndLongitude, setLatitudeAndLongitude] = useState([])
    // 提示框的状态
    const [visible, setVisible] = useState(false)
    // 城市房源信息
    const [cityAreaMap, setCityAreaMap] = useState([])
    // 加载状态
    const [visibleLoading, setVisibleLoading] = useState(true)
    // 地图层级
    const [zoom, setZoom] = useState(11)
    // 当前地区的房屋
    const [cityHouses, setCityHouse] = useState([])
    // 路由跳转
    const navigate = useNavigate();
    //
    const houses = useRef()

    // 高德地图web服务的key
    const MAP_KRY = '766b17108106f2562aa149e5b4b6b3e2'

    // 当前的城市
    const city = localStorage.getItem('city')

    // 当前的城市信息
    const cityMessage = localStorage.getItem('value')

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

    // 获取城市的房源信息
    const getCityArea = useCallback((cityMessage) => {
        reqArea(cityMessage).then((value) => {
            const result = value.data
            if (result.status === 200) {
                setVisibleLoading(false)
                setCityAreaMap(result.body)
            }
        })
    },[])

    // 获取当前地区的房屋
     const getCityHouses = (cityId) => {
         reqHouses(cityId).then((value) => {
             const result = value.data
             if (result.status === 200) {
                 setCityHouse(result.body.list)
                 setVisibleLoading(false)
                 houses.current.style = 'bottom: 0'
             }
         })
     }

     // 遍历房屋
    const cityHousesItems = cityHouses.map((item) => (
        <div className='house-one' key={item.houseCode}>
            <img className='house-img' src={BASE_URL + item.houseImg} alt=""/>
            <div>
                <h2 className='title'>{item.title}</h2>
                <p className='desc'>{item.desc}</p>
                <p className='tag'>{item.tags[0]}</p>
                <p className='price'>{item.price} <span>元/月</span></p>
            </div>
        </div>
    ))

    useEffect(() => {
        getCityArea(cityMessage)
    },[getCityArea,cityMessage])
    
    if (latitudeAndLongitude.length !== 0) {
         AMapLoader.load({
            "key": `${MAP_KRY}`,              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": ['AMap.Scale', 'AMap.ToolBar'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等

        }).then((AMap)=>{
             let map = new AMap.Map('container',{
                resizeEnable: true, //使用自定义窗体
                zoom: zoom,//级别
                center: latitudeAndLongitude,//中心点坐标
                viewMode:'3D'//使用3D视图
            });
             // 添加插件
                map.addControl(new AMap.Scale())
                map.addControl(new AMap.ToolBar())
             // 添加文本覆盖物
            cityAreaMap.forEach((item) => {
                const {label, count, coord:{longitude, latitude}} = item
                // 创建 infoWindow 实例
                const marker = new AMap.Marker({
                    isCustom: true,  //使用自定义窗体
                    // 添加的内容
                    content: zoom === 15 ? [`
                        <div id='text' style='height: 10px; padding: 10px;border-radius: 5%; background-color: #21b97a; display: flex; align-items: center; justify-content: center'>
                            <div style='display: flex;'>
                                <p style='text-align: center; white-space: nowrap'>${label}</p>
                                <p style='text-align: center; white-space: nowrap; margin-left: 10px'>${count}套</p>
                            </div>
                        </div>
                    `]:[`
                        <div id='text' style='width: 80px; height: 80px; border-radius: 50%; background-color: #21b97a; display: flex; align-items: center; justify-content: center'>
                            <div style='display: flex; flex-direction: column;'>
                                <p style='text-align: center; white-space: nowrap'>${label}</p>
                                <p style='text-align: center; white-space: nowrap'>${count}套</p>
                            </div>
                        </div>
                    `],
                    // 添加的位置
                    position: new AMap.LngLat(longitude, latitude),
                    // 偏移量
                    offset: new AMap.Pixel(-35, -35)
                })
                marker.setExtData({id: item.value})
                map.add(marker)
                marker.on('click', () => {
                    setVisibleLoading(true)
                    if (zoom !== 15){
                        getCityArea(marker.getExtData('id').id)
                    } else {
                        getCityHouses(marker.getExtData('id').id)
                    }
                    setZoom(map.getZoom() === 11 ? 13 : 15)
                    setLatitudeAndLongitude(new AMap.LngLat(longitude, latitude))
                })
             })
        }).catch(e => {
            console.log(e);
        })
    }
    // 判断城市是否有房源
    useEffect(() => {
        if (HOUSE_CITY.indexOf(city) === -1) {
            setVisible(true)
            setVisibleLoading(false)
        }
    },[city])

    return (
        <div className='map'>
            <NavHeader>地图找房</NavHeader>
            {/*地图容器*/}
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
            <Modal
                visible={visibleLoading}
                bodyClassName='loading'
                content= <SpinLoading color='primary' style={{ '--size': '32px' }}/>
            />
            <div className='houses' ref={houses}>
                <div className='house'>
                    <div className='house-header'>
                        <p>房屋列表</p>
                        <p>更多房源</p>
                    </div>
                    <div className='house-body'>
                        {cityHousesItems}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;