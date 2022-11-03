import React, {useState} from 'react';
import SearchHeader from "../../../components/SearchHeader";
import { AiOutlineLeft } from "react-icons/ai";
import './index.css'
import {useNavigate} from "react-router-dom";
import Filter from "./Filter";
import {BASE_URL} from "../../../utils/constants";


function HomeList(props) {

    // 房屋数据
    const [houseList, setHouseList] = useState([])

    const navigate = useNavigate();
    // 返回home页面
    const goHome = () => {
        navigate('/home')
    }

    // 遍历房屋信息
    const cityHousesItems = houseList.map((item) => (
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

    return (
        <div>
            <div className='home-list'>
                <div className='icon-back' onClick={goHome}>
                    <AiOutlineLeft style={{fontSize: 22}}/>
                </div>
                <SearchHeader className='searchHeader'/>
            </div>
            <Filter setHouseList={setHouseList}/>
            <div className='houses'>
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

export default HomeList;