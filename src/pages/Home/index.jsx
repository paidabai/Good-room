import React from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {TabBar} from "antd-mobile";
import {HomeOutlined, ProfileOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import './index.css'


function Home(props) {
        // 路由跳转
        const navigate = useNavigate()
        // 获取当前的path地址
        const location = useLocation()
        const { pathname } = location

        // 点击tab后设置跳转的地址
        const setRouteActive = (value) => {
            navigate(value)
        }

        // tab数据
        const tabs = [
            {
                key: '/home',
                title: '首页',
                icon: <HomeOutlined />,
            },
            {
                key: '/home/list',
                title: '找房',
                icon: <SearchOutlined />,
            },
            {
                key: '/home/news',
                title: '咨询',
                icon: <ProfileOutlined />,
            },
            {
                key: '/home/profile',
                title: '我的',
                icon: <UserOutlined />,
            },
        ]

        // 遍历tab返回参数
        const tabItems = (
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        )
    return (
        <div>
            <div className='app'>
                <div className='body'>
                    <Outlet/>
                </div>
                <div className='bottom'>
                    {tabItems}
                </div>
            </div>
        </div>
    );
}

export default Home;