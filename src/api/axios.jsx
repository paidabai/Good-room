/*封装axios*/
import axios from 'axios'

export default function axios(url, data={}, type='GET'){
    if (type === 'GET'){ //发送get请求
        return axios.get(url, { //配置对象
            params: data //指定请求参数
        })
    }else {
        //发送post请求
        return axios.post(url, data)
    }
}
