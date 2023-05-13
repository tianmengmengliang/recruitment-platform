import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Table, Tooltip } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import PopoverEllipsis from '@/components/public/PopoverEllipsis';
import styles from './index.less';

const Welcome: React.FC = () => {
  const intl = useIntl();

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号飞冰飞冰发布报告发布发个报告发布',
      introduction: '从VR搞过让他俩，帮忙，防抖，把目光放v个，股份，不同人跟人让他',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      introduction: '帮忙，防抖',
    },
  ];
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (text: any, record: any) => <PopoverEllipsis title={text} />,
    },
    {
      title: '介绍',
      dataIndex: 'introduction',
      key: 'introduction',
      ellipsis: true,
      render: (text: any, record: any) => <PopoverEllipsis title={text} />,
    },
  ];

  return (
    <div className={styles['tooltip-root']}>
      <h1 className="components-content-title">Overflow Tooltip 内容超出时气泡显示</h1>
      <Alert
        message={intl.formatMessage({ id: 'pages.overflow.alertMessage' })}
        type="success"
        showIcon
        banner
      />
      <br />

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Welcome;
