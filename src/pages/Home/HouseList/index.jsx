import React from 'react';
import SearchHeader from "../../../components/SearchHeader";
import { AiOutlineLeft } from "react-icons/ai";
import './index.css'
import {useNavigate} from "react-router-dom";
import Filter from "./Filter";


function HomeList(props) {
    const navigate = useNavigate();
    // 返回home页面
    const goHome = () => {
        navigate('/home')
    }

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