import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from "react-router";
import { Form, Input, Button, notification  } from 'antd';
import { ActionsType } from './../../Reducers/rootReducers';
import { auth, logIn } from './../../Actions/actions';
import classes from './login.module.css';

type MapDispatchPropsType = {
    auth: (email: string, password: string) => void
    logIn: (email: string, password: string, history: any) => void
}
type LoginPageParams = {
    id: string
}
type TransportPageRouterProps = RouteComponentProps<LoginPageParams>
type LoginType = MapDispatchPropsType & TransportPageRouterProps

const Login: FC<LoginType> = ({ auth, logIn, history }) => {
    const [form] = Form.useForm();
    const [errMsg, setErrMsg] = useState('')
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            string: '${label} is not a validate number!',
        },
        string: {
            range: '${label} must be between ${min} and ${max}',
        }
    }
    const openNotification = () => {
        notification.open({
          message: 'Регистрация прошла успешно!',
          description: 'Вы можете войти на сайт со своим паролем!',
          top: 104,
          style: {color: 'green'}
        })
    }
    const onSignIn = () => {
        const values = form.getFieldsValue()
        logIn(values.Email, values.password, history)
    }
    const onSignUp = () => {
        const values = form.getFieldsValue()
        if(values.Email && values.password){
            auth(values.Email, values.password)
            setErrMsg('')
            form.resetFields()
            openNotification()
        }else {
            setErrMsg('Заполните все поля!')
        }  
    }
    return (
        <div className={classes.container}>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                form={form}
                onFinish={onSignIn}
                validateMessages={validateMessages}
                >
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, type: 'string', min: 6, max: 99, message: 'Please input at least 6 characters!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <div className={classes.errorMsg}>{errMsg}</div>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Sigh In
                    </Button>
                    <Button type="primary" danger htmlType="button" onClick={onSignUp}>
                        Sign Up
                    </Button>
                </Form.Item>        
            </Form>
        </div>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsType>) => {
    return {
        auth: (email: string, password: string) => dispatch(auth(email, password)),
        logIn: (email: string, password: string, history: any) => dispatch(logIn(email, password, history))
    }
} 

export default connect(null, mapDispatchToProps)(Login)
