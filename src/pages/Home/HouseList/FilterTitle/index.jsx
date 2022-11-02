import React, {useState} from 'react';
import {Tabs} from "antd-mobile";
import FilterPicker from "../FilterPicker";
import './index.css'
import FilterMore from "../FilterMore";

function FilterTitle(props) {
    // 选择激活的选项
    const [activeKey, setActiveKey] = useState('')

    // 点击确认后获取选择的数据
    const [choseData, setChoseData] = useState([])

    // 点击取消，删除选中的激活key
    const cancel = () => {
        setActiveKey('')
    }

    // 点击确认，删除选中的激活key，收集选中的信息
     const ok = () => {
         setActiveKey('')
         console.log(choseData)
     }

    return (
        <div>
            <div className='navHeader-chose'>
                <Tabs
                    activeKey={activeKey}
                    onChange={(key) => {
                        setActiveKey(key)
                    }}
                >
                    <Tabs.Tab title='区域' key='area'>
                        <FilterPicker getChoseData={value => setChoseData(value)} type={activeKey}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='方式' key='plan'>
                        <FilterPicker getChoseData={value => setChoseData(value)} type={activeKey}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='租金' key='price'>
                        <FilterPicker getChoseData={value => setChoseData(value)} type={activeKey}/>
                        <div className='confirm'>
                            <p className='cancel' onClick={cancel}>取消</p>
                            <p className='ok' onClick={ok}>确定</p>
                        </div>
                    </Tabs.Tab>
                    <Tabs.Tab title='筛选' key='chose'>
                        <div className='chose'>
                            <FilterMore />
                        </div>
                    </Tabs.Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default FilterTitle;