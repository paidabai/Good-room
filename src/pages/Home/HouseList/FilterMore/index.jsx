import React, {useEffect, useRef} from 'react';
import {Button, Form, Selector} from "antd-mobile";
import PubSub from 'pubsub-js'
import './index.css'

function FilterMore(props) {

    // 使用ref
    const formRef = useRef()

    useEffect(() => {
        PubSub.subscribe('result', (msg, data) => {
            console.log( msg, data )
        })
    },[])

    const onFinish = (values) => {
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
                            type='submit'
                            color='primary'
                            size='large'
                        >
                            提交
                        </Button>
                        <Button
                            block
                            color='primary'
                            onClick={() => {
                                formRef.current?.resetFields()
                            }}
                            size='large'
                            style={{marginLeft: 10}}
                        >
                            重置
                        </Button>
                    </div>
                }
            >
                <Form.Header>竖直布局表单</Form.Header>
                <Form.Item name='favoriteFruits' label='喜爱的水果'>
                    <Selector
                        columns={3}
                        multiple
                        options={[
                            { label: '苹果', value: 'apple' },
                            { label: '橘子', value: 'orange' },
                            { label: '香蕉', value: 'banana' },
                        ]}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default FilterMore;