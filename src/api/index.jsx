import axios from "axios";
import {BASE_URL} from "../utils/constants";
import jsonp from "jsonp";

const KEY = '93887104dbfceff1377e485d50b4e818'

// 轮播图
export const reqSwiper = () => axios(`${BASE_URL}/home/swiper`,{})

// 租房小组
export const reqGroups = (area) => axios(`${BASE_URL}/home/groups`,{area})

// 最新资讯
export const reqNews = (area) => axios(`${BASE_URL}/home/news`,{area})

// 获取城市
export const reqCity = (locations, fn) => {
    const url = `https://restapi.amap.com/v3/geocode/regeo?key=${KEY}&location=${locations}&radius=0&extensions=all&batch=false&roadlevel=0`
    return jsonp(url, {}, fn)
}

// 获取热门城市
export const reqHotCity = () => axios(`${BASE_URL}/area/hot`,{})

// 获取城市列表(type: 1 表示获取所有城市数据 2 表示城市下区的数据)
export const reqCityList = (type) => axios(`${BASE_URL}/area/city?level=${type}`,{})