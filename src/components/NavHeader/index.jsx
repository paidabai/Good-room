import React from 'react';
import {NavBar} from "antd-mobile";
import {useNavigate} from "react-router-dom";

function NavHeader(props) {
    const navigate = useNavigate()

    // 获取标签名
    const {children} = props

    // 返回到home
    const backHome = (value) => {
        navigate(value)
    }

    return (
            <NavBar onBack={() => {backHome('/home')}} className='navHeader'>{children}</NavBar>
    );
}

export default NavHeader;