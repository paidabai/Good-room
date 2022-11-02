import React, {useCallback, useEffect} from 'react';
import SearchHeader from "../../../components/SearchHeader";
import { AiOutlineLeft } from "react-icons/ai";
import './index.css'
import {useNavigate} from "react-router-dom";
import Filter from "./Filter";
import {reqCondition} from "../../../api";
import PubSub from "pubsub-js";


function HomeList(props) {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/home')
    }

    // 获取当前的城市id
    const cityId = localStorage.getItem('value')

    // 获取房屋的查询条件
    const getCondition = useCallback(() => {
        reqCondition(cityId).then((value) => {
            const result = value.data
            if (result.status === 200) {
                PubSub.publish('result', result);
            }
        })
    },[cityId])

    useEffect(() => {
        getCondition()
    },[getCondition])

    return (
        <div>
            <div className='home-list'>
                <div className='icon-back' onClick={goHome}>
                    <AiOutlineLeft style={{fontSize: 22}}/>
                </div>
                <SearchHeader className='searchHeader'/>
            </div>
            <Filter/>
        </div>
    );
}

export default HomeList;