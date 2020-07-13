import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useDispatch } from "react-redux";

const { Title } = Typography;

function ForgotPassPage(props) {
  const [formErrorMessage, setFormErrorMessage] = useState('')
  return (
    <div className="app padded login-padding">
      <h1 className="page-heading">Reset Password</h1>
      <p>We will send a recovery email to your email.</p>
      <Form
        name="normal_login"
        className="login-form"
        style={{width: '100%', maxWidth:'350px'}}
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

        {formErrorMessage && (
          <label ><p style={{ color: '#ff0000bf', fontSize: '14px', textAlign: 'center', border: '1px solid', padding: '7px 14px', borderRadius: '2px' }}>{formErrorMessage}</p></label>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Reset password
          </Button>
        </Form.Item>
      
      </Form>
    </div>
  );

};

export default withRouter(ForgotPassPage);


