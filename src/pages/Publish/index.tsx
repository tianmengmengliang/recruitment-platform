import React from 'react';
import { Alert, Input, Form, Button, Row, Col, message } from 'antd';
import { requestData } from '@/services';
import { handleRes } from '@/uitls/uitls';
import styles from './index.less';

const Welcome: React.FC = () => {
  const [form] = Form.useForm();

  const onSubmit = (e: any) => {
    form
      .validateFields()
      .then(async (values: any) => {
        //
        console.log('values:', values);
        const res = await requestData('', 'POST', values);
        if (res.success) {
          message.success('');
        } else {
          handleRes(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="components-content-title">发布招聘信息</h1>
      <Alert message={'创建招聘信息'} type="success" showIcon banner />

      <div style={{ marginTop: 24 }}>
        <Form form={form} layout="vertical">
          <Form.Item label="工作职责" name="job1" rules={[{ required: true, message: '请添加' }]}>
            <Input.TextArea rows={4} placeholder="请输入" />
          </Form.Item>

          <Form.Item label="任职资格" name="job2" rules={[{ required: true, message: '请添加' }]}>
            <Input.TextArea rows={4} placeholder="请输入" />
          </Form.Item>

          <Form.Item label="岗位标签" name="tags" rules={[{ required: false, message: '请添加' }]}>
            <Input
              placeholder="请输入城市、地点"
              allowClear
              // style={{ width: 350 }}
              // autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="" name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={(e) => onSubmit(e)}>
              创建
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Welcome;
