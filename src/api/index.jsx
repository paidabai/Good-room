import axios from "axios";
import {BASE_URL} from "../utils/constants";
import jsonp from "jsonp";

const KEY = '93887104dbfceff1377e485d50b4e818'
const LatitudeAndLongitude_URL = 'http://47.109.41.165:3399'

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

// 获取城市的经纬度信息
export const reqCityLatitudeAndLongitude = (city) => axios(`${LatitudeAndLongitude_URL}/api?address=${city}&key=${KEY}`)

// 获取城市信息
export const reqCityMessage = (name) => axios(`${BASE_URL}/area/info?name=${name}`, {})

// 获取房源数据
export const reqArea = (id) => axios(`${BASE_URL}/area/map?id=${id}`, {})

// 获取当前地区的房屋
export const reqHouses = (cityId) => axios(`${BASE_URL}/houses?cityId=${cityId}`,{})

// 获取房屋的查询条件
export const reqCondition = (id) => axios(`${BASE_URL}/houses/condition?id=${id}`,{})

// 根据条件查询房屋
export const reqFindHouse = (params) => axios(`${BASE_URL}/houses`, {params})