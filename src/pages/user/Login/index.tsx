import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
import { ReactComponent as Background } from '@/assets/svg/background.svg';
import { login } from './service';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  // 监听当前页面宽度尺寸变化
  const [layoutHeight, setLayoutWidth] = useState(innerHeight);
  const getWindowWidth = () => setLayoutWidth(innerHeight);
  useEffect(() => {
    window.addEventListener('resize', getWindowWidth);
    return () => {
      window.removeEventListener('resize', getWindowWidth);
    };
  }, []);

  // 获取用户信息
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo && userInfo.error) {
      // && userInfo.code !== 200
      setUserLoginState({ type: 'error', message: userInfo.error });
    }
    if (userInfo.username) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  // 登录
  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      const res = await login({ ...values, type });
      if (res.success) {
        // message.success('登录成功！');
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        goto();
      } else {
        // 如果失败去设置用户错误信息
        setUserLoginState({ type: 'error', message: res?.error });
      }
    } catch (error) {
      // 如果失败去设置用户错误信息
      setUserLoginState({ type: 'error' });
    }
    setSubmitting(false);
  };

  // 重置用户登陆的提示状态
  const restLoginState = () => {
    if (userLoginState?.type === 'error') {
      setUserLoginState({});
    }
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}

      <div className={styles.content} style={{ height: layoutHeight - 40 - 94 }}>
        <div style={{ marginRight: 60 }}>
          <Background />
        </div>
        <div className={styles.main}>
          <LoginForm
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType} size={'large'}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
            </Tabs>

            {userLoginState.type === 'error' && (
              <LoginMessage content={userLoginState.message || '账户或密码错误'} />
            )}
            {type === 'account' && (
              <>
                <div className={styles.label}>
                  <FormattedMessage id={'user.login.username.label'} />
                </div>
                <ProFormText
                  name="userName"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '请输入用户名',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <div className={styles.label}>
                  <FormattedMessage id={'user.login.password.label'} />
                </div>
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {/*           
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div> */}
          </LoginForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
