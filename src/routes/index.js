import CityList from "../pages/CityList";
import Home from "../pages/Home";
import News from "../pages/Home/News";
import Index from "../pages/Home/IndexHome";
import HomeList from "../pages/Home/HouseList";
import Profile from "../pages/Home/Profile";
import {Navigate} from "react-router-dom";

// 路由表
const indexRouter = [
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '',
                element: <Index />
            },
            {
                path: 'list',
                element: <HomeList />
            },
            {
                path: 'news',
                element: <News />
            },{
                path: 'profile',
                element: <Profile />
            },

        ]
    },
    {
        path: '/citylist',
        element: <CityList />
    },
    {
        // 路由匹配不到重定向到home
        path: '/*',
        element: <Navigate to='/home'/>
    }
]

export default indexRouter;