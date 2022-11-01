import React from 'react';
import {CaretDownOutlined, SearchOutlined} from "@ant-design/icons";
import {RiRoadMapLine} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import './index.css'

function SearchHeader(props) {
    // 使用路由跳转
    const navigate = useNavigate()


    const {children: city ,className} = props
    // 点击location选择位置后的路由跳转
    const activeHouseList = (value) => {
        navigate(value,{state:{city}})
    }

    // 点击搜索地址后的跳转到search
    const activeSearch = (value) => {
        navigate(value)
    }
    // 点击地图图片后跳转到map
    const activeMap = (value) => {
        navigate(value)
    }

    // 获取选择的城市
    const newChoseCity = localStorage.getItem('city')

    return (
        <div className={['search', className || ''].join(' ')}>
            <div className='search-box'>
                <div className='location' onClick={() => {activeHouseList('/citylist')}}>
                    <span className='name'>{newChoseCity ? newChoseCity : city}</span>
                    <CaretDownOutlined />
                </div>
                <div className='from' onClick={() => {activeSearch('/search')}}>
                    <SearchOutlined />
                    <span>请输入小区或地址</span>
                </div>
                <div className='map-icon' onClick={() => {activeMap('/map')}}>
                    <RiRoadMapLine />
                </div>
            </div>
        </div>
    );
}

export default SearchHeader;