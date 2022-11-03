import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Selector, Toast} from "antd-mobile";
import './index.css'

function FilterMore(props) {

    const [screen, setScreen] = useState({})

    const [characteristic, setCharacteristic] = useState([])
    const [floor, setFloor] = useState([])
    const [oriented, setOriented] = useState([])
    const [roomType, setRoomType] = useState([])

    const formRef = useRef()
    const handler = useRef()
    // 获取props传递的值
    const {result, closeFilterMore, setMore} = props

    useEffect(() => {
        handler.current = Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration: 0,
            maskClickable: true,
        })
    },[])


    useEffect(() => {
        setScreen(result)
    },[result])

   useEffect(() => {
       if (screen.characteristic) {
           const {characteristic, floor, oriented, roomType} = screen
           setCharacteristic(characteristic)
           setFloor(floor)
           setOriented(oriented)
           setRoomType(roomType)
           handler.current?.close()
       }
   },[screen])

    const onFinish = (values) => {
        // 关闭FilterMore的方法
        closeFilterMore()
        setMore(values)
    }
    return (
        <div>
            <Form
                name='form'
                ref={formRef}
                onFinish={onFinish}
                footer={
                    <div className='btn'>
                        <Button
                            block
                            color='success'
                            onClick={() => {
                                formRef.current?.resetFields()
                            }}
                            size='large'
                        >
                            重置
                        </Button>
                        <Button
                            block
                            type='submit'
                            color='success'
                            size='large'
                            style={{marginLeft: 10, width: 750}}
                        >
                            确认
                        </Button>
                    </div>
                }
            >
                <Form.Item name='roomType' label='户型'>
                    <Selector
                        columns={3}
                        multiple
                        options={roomType}
                    />
                </Form.Item>
                <Form.Item name='oriented' label='朝向'>
                    <Selector
                        columns={3}
                        multiple
                        options={oriented}
                    />
                </Form.Item>
                <Form.Item name='floor' label='楼层'>
                    <Selector
                        columns={3}
                        multiple
                        options={floor}
                    />
                </Form.Item>
                <Form.Item name='characteristic' label='房屋亮点'>
                    <Selector
                        columns={3}
                        multiple
                        options={characteristic}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FilterMore;