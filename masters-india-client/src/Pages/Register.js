import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import baseUrl from '../baseUrl';
import { NavLink } from 'react-router-dom';

const Register = () => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            window.location.href = '/snippets'
        }
    })

    const onFinish = (values) => {
        axios.post(baseUrl + `/register`, {
            username: values.username,
            password: values.password,
            name: values.name
        })
            .then((res) => {
                if (res.data.status) {
                    message.success('Registered Successfully');
                    window.location.href = '/login'
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
        // message.error('Please try again');

    };

    return (
        <Form
            name="register"
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
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        type: "string"
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                    Register
                </Button>
                <br />
                <br />
                <NavLink to='/login'>Already registered? Login</NavLink>
            </Form.Item>
        </Form>
    );
};

export default Register;