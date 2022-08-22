import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import baseUrl from '../baseUrl';
import { NavLink } from 'react-router-dom';

const Login = () => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            window.location.href = '/snippets'
        }
    })

    const onFinish = (values) => {
        axios.post(baseUrl + `/login`, {
            username: values.username,
            password: values.password,
        })
            .then((res) => {
                if (res.data.user) {
                    localStorage.setItem('token', res.data.user)
                    localStorage.setItem('userId', res.data.user_id)
                    message.success('Logged in Successfully', 1);
                    window.location.href = '/snippets'
                } else {
                    message.error(res.data.message);
                }
            }).catch((error) => {
                console.log(error)
                message.error('Please try again');
            })
    };

    const onFinishFailed = (error) => {
        console.log(error);
        message.error('Please try again');
    };

    return (
        <Form
            name="Login"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                margin: 20,
                width: "75%",
                textAlign: "center"
            }}
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        type: 'email'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
                <br />
                <br />
                <NavLink to='/register'>Not registered? Register</NavLink>
            </Form.Item>
        </Form>
    );
};

export default Login;