import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';
  
  
  const onFinish = values => {
    console.log('Received values of form: ', values);
    setTimeout(() => {
      let dataToSubmit = {
        email: values.email,
        password: values.password
      };

      dispatch(loginUser(dataToSubmit))
        .then(response => {
          if (response.payload.loginSuccess) {
            window.localStorage.setItem('userId', response.payload.userId);
            if (rememberMe === true) {
              window.localStorage.setItem('rememberMe', values.email);
            } else {
              localStorage.removeItem('rememberMe');
            }
            props.history.push("/");
          } else {
            setFormErrorMessage('Check out your Account or Password again')
          }
        })
        .catch(err => {
          setFormErrorMessage('Check out your Account or Password again')
          setTimeout(() => {
            setFormErrorMessage("")
          }, 3000);
        });
    }, 500);
  };

  return (
    <div className='app padded login-padding'>
      <h1 style={{ fontSize: '42px' }}>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        style={{width: '100%', maxWidth:'350px'}}
        initialValues={{ remember: rememberMe, email: initialEmail }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="Email" 
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
          </Form.Item>

          {/* TODO: forgot password */}
          <Link className="login-form-forgot" to="/forgot-password"  style={{float: 'right'}}>
            Forgot password
          </Link>
        </Form.Item>

        {formErrorMessage && (
          <label ><p style={{ color: '#ff0000bf', fontSize: '14px', textAlign: 'center', border: '1px solid', padding: '7px 14px', borderRadius: '2px' }}>{formErrorMessage}</p></label>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      
      </Form>
    </div>
  );

};

export default withRouter(LoginPage);


