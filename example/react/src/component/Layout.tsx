import React, { useState, useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Space } from 'antd';

import { Outlet, useNavigate } from 'react-router-dom';
import DLWidgetContent from './DLWidgetContent';
import clsx from 'clsx';
import { createBEMGenerator } from '../utils';

import './index.less';

export const prefix: string = 'example-react-layout';

const generator = createBEMGenerator(prefix);

export default () => {
  const navigate = useNavigate();
  const [showWidget1, setShowWidget1] = useState(false);
  const [showWidget2, setShowWidget2] = useState(false);
  const [showWidget3, setShowWidget3] = useState(false);
  const [showWidget4, setShowWidget4] = useState(false);

  const items2: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: 'route',
        icon: React.createElement(UserOutlined),
        label: '路由级子应用',
        children: [
          {
            key: '1',
            label: '/zone/1',
          },
          {
            key: '2',
            label: '/zone/2',
          },
          {
            key: '3',
            label: '/zone-origin/1',
          },
          {
            key: '4',
            label: '/zone-origin/2',
          },
          {
            key: '5',
            label: '/vue3/1',
          },
          {
            key: '6',
            label: '/vue3/2',
          },
          {
            key: '7',
            label: '/vue2/1',
          },
          {
            key: '8',
            label: '/vue2/2',
          },
          {
            key: 'x',
            label: '不存在的路由',
          },
        ],
      },
      {
        key: 'widget',
        icon: React.createElement(UserOutlined),
        label: `组件级子应用`,
        children: [
          {
            key: 'widget1',
            label: `${showWidget1 ? '隐藏' : '显示'}-组件子应用1`,
          },
          {
            key: 'widget2',
            label: `${showWidget2 ? '隐藏' : '显示'}-组件子应用2`,
          },
          {
            key: 'widget3',
            label: `${showWidget3 ? '隐藏' : '显示'}-Vue3组件子应用`,
          },
          {
            key: 'widget4',
            label: `${showWidget4 ? '隐藏' : '显示'}-Vue2组件子应用`,
          },
        ],
      },
    ];
  }, [showWidget1, showWidget2, showWidget3]);

  return (
    <div className={clsx(generator('container'))}>
      <div className={generator('header')}>
        <div className={generator('logo')}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
          <span className={generator('logo-title')}>React Main Demo</span>
        </div>
      </div>
      <div className={generator('content-wrap')}>
        <div className={generator('sidebar')}>
          <Layout.Sider width={200}>
            <Menu
              mode="inline"
              onClick={(e: any) => {
                if (e.key === 'widget1') {
                  setShowWidget1(!showWidget1);
                } else if (e.key === 'widget2') {
                  setShowWidget2(!showWidget2);
                } else if (e.key === 'widget3') {
                  setShowWidget3(!showWidget3);
                } else if (e.key === 'widget4') {
                  setShowWidget4(!showWidget4);
                } else if (['1', '2'].includes(e.key)) {
                  navigate(`/zone/${e.key}`);
                } else if (['3', '4'].includes(e.key)) {
                  navigate(`/zone-origin/${e.key - 2}`);
                } else if (['5', '6'].includes(e.key)) {
                  navigate(`/vue3/${e.key - 4}`);
                } else if (['7', '8'].includes(e.key)) {
                  navigate(`/vue2/${e.key - 6}`);
                } else {
                  navigate(`/zonee/${e.key}`);
                }
              }}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Layout.Sider>
        </div>
        <div className={generator('content')}>
          <Space direction="vertical" size="middle">
            <Space>
              {showWidget1 ? <DLWidgetContent name="1" entry="https://localhost:9000" /> : null}
              {showWidget2 ? <DLWidgetContent name="2" entry="https://localhost:9001" /> : null}
              {showWidget3 ? <DLWidgetContent name="3" entry="https://localhost:9003" /> : null}
              {showWidget4 ? <DLWidgetContent name="4" entry="https://localhost:9004" /> : null}
            </Space>

            <Outlet />
          </Space>
        </div>
      </div>
    </div>
  );
};
