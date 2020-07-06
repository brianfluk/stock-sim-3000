import React from "react";
import moment from "moment";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  InputNumber,
  Button,
  Tooltip,
} from 'antd';


const layout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  const onFinish = values => {
    console.log(values);

    let dataToSubmit = {
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    };
  
    dispatch(registerUser(dataToSubmit)).then(response => {
      if (response.payload && response.payload.success) {
        props.history.push("/login");
      } else {
        alert(response.payload.err.errmsg)
      }
    })
  };

  return (
    <div className="app">
      <h1 style={{ fontSize: '42px' }}>Sign up</h1>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
      style={{width: '100%', maxWidth: '500px'}}>
        <Form.Item
          name='username'
          label={
            <span>
            Username&nbsp;
            <Tooltip title="The name that is displayed on the leaderboards">
              <QuestionCircleOutlined />
            </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Username is required!'
            },
            {
              min: 4,
              max: 25,
              message: 'Usernames must be 4-25 characters'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='firstname'
          label="First name"
          rules={[
            {
              required: true,
              message: 'First name is required!'
            },
            {
              min: 1,
              max: 100,
              message: 'Names are 1-100 characters long'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastname'
          label="Last name"
          rules={[
            {
              required: true,
              message: 'Last name is required!'
            },
            {
              min: 1,
              max: 100,
              message: 'Names are 1-100 characters long'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
              min: 6,
              message: 'Please enter a password at least 6 characters long.'
            },
            {
              max: 256,
              message: 'Password can be at most 256 characters'
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label="Confirm password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

      </Form>
      </div>

  );
};


export default RegisterPage
