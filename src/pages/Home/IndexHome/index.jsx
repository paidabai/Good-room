import React, {useEffect, useState} from 'react';
import {Grid, Swiper} from "antd-mobile";
import './index.css'
import {reqGroups, reqSwiper} from "../../../api";
import {BASE_URL} from "../../../utils/constants";
import icon1 from '../../../assets/icon/Household.png'
import icon2 from '../../../assets/icon/peoples.png'
import icon3 from '../../../assets/icon/kehuditu.png'
import icon4 from '../../../assets/icon/house-add.png'
import {useNavigate} from "react-router-dom";


function Index(props) {
    // 轮播图
    const [swiper, setSwiper] = useState([])
    // 租房小组
    const [groups, setGroups] = useState([])
    // 使用路由跳转
    const navigate = useNavigate()

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

    // 设置导航菜单点击后跳转路由地址
    const setRouteActive = (value) => {
        navigate(value)
    }

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

    // 将要挂载时获取轮播图/租房小组
    useEffect(() => {
        getSwiper()
        getGroups()
    },[])
    return (
        <div>
            <Swiper
                autoplay
                className='swiper'
                indicatorProps={{
                    color: 'white',
                }}
            >
                {items}
            </Swiper>
            <Grid columns={4} gap={8} className='grid'>
                {navItems}
            </Grid>
            <div className='group'>
                <h3 className='group-top'>
                    租房小组
                    <span>更多</span>
                </h3>
                <Grid columns={2} gap={8}>
                    {groupItems}
                </Grid>
            </div>
            <div className='news'>
                <h3>最新资讯</h3>
                <Grid columns={1}>
                    <Grid.Item>
                        <div className='grid-news'>
                            <img src={BASE_URL + '/img/news/1.png'} alt=""/>
                            <div className='news-text'>
                                <h2>置业选择 | 安贞西里 三室一厅 河间的古雅别院</h2>
                                <p>
                                    <span>新华网</span>
                                    <span>一周前</span>
                                </p>
                            </div>
                        </div>
                    </Grid.Item>
                </Grid>
            </div>
        </div>
    );
}

export default Index;