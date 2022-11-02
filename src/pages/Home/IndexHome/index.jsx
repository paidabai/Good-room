import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Swiper} from "antd-mobile";
import './index.css'
import {reqCity, reqCityMessage, reqGroups, reqNews, reqSwiper} from "../../../api";
import {BASE_URL} from "../../../utils/constants";
import icon1 from '../../../assets/icon/Household.png'
import icon2 from '../../../assets/icon/peoples.png'
import icon3 from '../../../assets/icon/kehuditu.png'
import icon4 from '../../../assets/icon/house-add.png'
import {useNavigate} from "react-router-dom";
import SearchHeader from "../../../components/SearchHeader";

function Index(props) {
    // 轮播图
    const [swiper, setSwiper] = useState([])
    // 租房小组
    const [groups, setGroups] = useState([])
    // 最新资讯
    const [news, setNews] = useState([])
    // 经纬度
    const [locations, setLocations] = useState('')
    // 定位城市
    const [city, setCity] = useState('')
    // 使用路由跳转
    const navigate = useNavigate()

    // 设置导航菜单点击后跳转路由地址
    const setRouteActive = (value) => {
        navigate(value)
    }

    // 获取轮播图
    const getSwiper = () => {
        reqSwiper().then((value) => {
            const result = value.data
            if (result.status === 200) {
                setSwiper(result.body)
            }
        })
    }

    // 遍历轮播图
    const items = swiper.map((img) => (
        <Swiper.Item key={img.id}>
            <img src={BASE_URL + img.imgSrc} alt=""/>
        </Swiper.Item>
    ))

    // 导航菜单数据
    const navs = [
        {
            id: 1,
            img: icon1,
            title: '整租',
            path: '/home/list'
        },
        {
            id: 2,
            img: icon2,
            title: '合租',
            path: '/home/list'
        },
        {
            id: 3,
            img: icon3,
            title: '地图找房',
            path: '/map'
        },
        {
            id: 4,
            img: icon4,
            title: '去出租',
            path: '/home/list'
        },
    ]

    // 遍历菜单导航
    const navItems = navs.map((item) => (
        <Grid.Item key={item.id} onClick={() => setRouteActive(item.path)}>
            <img src={item.img} alt=""/>
            <h2>{item.title}</h2>
        </Grid.Item>
    ))

    // 获取租房小组
    const getGroups = () => {
        reqGroups('AREA%7C88cff55c-aaa4-e2e0').then((value) => {
            const result = value.data
            if (result.status === 200) {
                setGroups(result.body)
            }
        })
    }

    // 遍历租房小组
    const groupItems = groups.map((item) => (
        <Grid.Item key={item.id}>
            <div className='grid-group'>
                <h3>
                    {item.title}
                    <span>{item.desc}</span>
                </h3>
                <img src={BASE_URL + item.imgSrc} alt=""/>
            </div>
        </Grid.Item>
    ))

    // 获取最新资讯
    const getNews = () => {
        reqNews('AREA%7C88cff55c-aaa4-e2e0').then((value) => {
            const result = value.data
            if (result.status === 200) {
                setNews(result.body)
            }
        })
    }

    // 遍历最新资讯
    const newsItems = news.map((item) => (
        <div className='grid-news' key={item.id}>
            <img src={BASE_URL + item.imgSrc} alt=""/>
            <div className='news-text'>
                <h2>{item.title}</h2>
                <p>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                </p>
            </div>
        </div>
    ))

    // 获取地理信息
    navigator.geolocation.getCurrentPosition(position => {
        setLocations(`${position.coords.longitude},${position.coords.latitude}`)
    })

    // 获取城市
    const getCity = useCallback(() => {
        if (locations) {
            reqCity(locations,(err,data) => {
                if (!err && data.status === '1'){
                    const city = data.regeocode.addressComponent.city instanceof Array ? data.regeocode.addressComponent.province : data.regeocode.addressComponent.city
                    const index = city.indexOf('市')
                    setCity(city.slice(0,index))
                }
            })
        }
    },[locations])

    // 获取选择的城市
    const newChoseCity = localStorage.getItem('city')

    // 获取当前的城市信息
    const getCityMessage = useCallback(() => {
        reqCityMessage(newChoseCity).then((value) => {
            const result = value.data
            if (result.status === 200) {
                // 把城市信息保存在本地
                localStorage.setItem('value', result.body.value)
            }

        })
    },[newChoseCity])

    // 地理位置改变调用获取城市
    useEffect(() => {
        getCity()
        getCityMessage()
    },[locations,getCity,getCityMessage])

    // 将要挂载时获取轮播图/租房小组/最新资讯
    useEffect(() => {
        getSwiper()
        getGroups()
        getNews()
    },[])

    return (
        <div>
            {/*顶部搜索*/}
            <SearchHeader>{city}</SearchHeader>
            {/*轮播图*/}
            <Swiper
                loop= 'true'
                autoplay
                className='swiper'
                indicatorProps={{
                    color: 'white',
                }}
            >
                {items}
            </Swiper>
            {/*菜单导航*/}
            <Grid columns={4} gap={8} className='grid'>
                {navItems}
            </Grid>
            {/*租房小组*/}
            <div className='group'>
                <h3 className='group-top'>
                    租房小组
                    <span>更多</span>
                </h3>
                <Grid columns={2} gap={8}>
                    {groupItems}
                </Grid>
            </div>
            {/*最新资讯*/}
            <div className='news'>
                <h3>最新资讯</h3>
                <Grid columns={1}>
                    {newsItems}
                </Grid>
            </div>
        </div>
    );
}

export default Index;