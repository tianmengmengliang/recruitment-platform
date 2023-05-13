import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Menu, Row, Col } from 'antd';
import { useIntl, FormattedMessage, history } from 'umi';
import styles from './index.less';

const Welcome: React.FC = (props) => {
  const routes = props?.route?.children || [];
  // hover效果
  const [hoverItem, setHoverItem] = useState(null);

  const filterComponentsPath = (path: any) => path;
  const routeRight = routes
    .filter((key: any) => key.name)
    .map((item: any) => {
      if (item.routes && item.routes.length > 0) {
        const children = item.routes.map((child: any) => ({
          ...child,
          path: filterComponentsPath(child.path),
          redirect: filterComponentsPath(child.redirect),
        }));
        return {
          ...item,
          routes: children,
          path: filterComponentsPath(item.path),
        };
      }
      return !item.unaccessible && { ...item, path: filterComponentsPath(item.path) };
    });

  // 获取当前url对应的菜单项。
  const { pathname } = window.location;
  const [definedPath, setDefinedPath] = useState('');
  const initialPath = () => {
    const current = routeRight.filter((item: any) => item.path === pathname);
    return current[0]?.path || '';
  };
  useEffect(() => {
    const currPath = initialPath();
    if (currPath != definedPath) {
      setDefinedPath(currPath);
    }
  }, [pathname]);

  const onMenuClick = useCallback((item) => {
    setDefinedPath(item.path);
    history.push(item.path);
  }, []);

  // 监听当前页面宽度
  const [layoutHeight, setLayoutWidth] = useState(innerHeight);
  const getWindowHeight = () => setLayoutWidth(innerHeight);
  useEffect(() => {
    window.addEventListener('resize', getWindowHeight);
    return () => {
      window.removeEventListener(' resize', getWindowHeight);
    };
  }, []);

  return (
    <div className={styles.basic_layout_root}>
      <Row>
        <Col className={styles['main-menu']} xs={24} sm={24} md={6} lg={5} xl={5} xxl={4}>
          <Menu mode="inline" selectedKeys={[definedPath]}>
            {routeRight.map((item: any) => {
              // console.log('item:', item);
              if (item?.routes?.length) {
                return (
                  <Menu.SubMenu
                    key={item.name}
                    title={<FormattedMessage id={`menu.${item.name}`} />}
                  >
                    {item.routes.map((child: any) => {
                      if (!child.hideInMenu) {
                        return (
                          <Menu.Item key={child.path} onClick={() => onMenuClick(child)}>
                            <FormattedMessage id={`menu.${item.name}.${child.name}`} />
                          </Menu.Item>
                        );
                      }
                    })}
                  </Menu.SubMenu>
                );
              }
              return (
                <Menu.Item key={item.path} onClick={() => onMenuClick(item)}>
                  <FormattedMessage id={`menu.layout.${item.name}`} />
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
        <Col className={styles['main-container']} xs={24} sm={24} md={18} lg={19} xl={19} xxl={20}>
          <div>{props.children}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
