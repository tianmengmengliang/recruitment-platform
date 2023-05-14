import React from 'react';
import { FormattedMessage, useIntl, history } from 'umi';
import { Button, message } from 'antd';

export default () => {
  const { formatMessage } = useIntl();

  const onClick = () => {
    // const jsonStringUrl: any = localStorage.getItem('antd-pro-loginUrl-Details');
    // const loginUrlDetails = JSON.parse(jsonStringUrl);
    // const { login_url } = loginUrlDetails || {};
    // if (isUrl(login_url)) {
    //   const a = document.createElement('a');
    //   a.href = login_url;
    //   a.click();
    // } else {
    //   message.warning(formatMessage({ id: 'avatar.dropdown.url.error' }));
    // }
    history.push('/user/login');
  };

  return (
    <div>
      <Button
        style={{ borderRadius: '6px', height: '40px', width: '80px', border: 0, boxShadow: 'none' }}
        onClick={onClick}
      >
        登录
      </Button>
      <span style={{ display: 'inline-block', width: '10px' }} />
      <Button
        type="primary"
        style={{ borderRadius: '6px', height: '40px', width: '80px' }}
        onClick={onClick}
      >
        注册
      </Button>
    </div>
  );
};
