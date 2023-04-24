import React from 'react';
import { Button, ConfigProvider, Result } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Demo from './view/Demo';
import Demo2 from './view/Demo2';

ConfigProvider.config({
  iconPrefixCls: 'anticon',
});

const getPopupContainer = (node: any) => (node && node.parentNode) || document.body;

function RouterDemo({ basename }: { basename: string }) {
  // 路由使用形式按照喜好使用即可，此demo只展示basename的配置, 可打开 https://localhost:9528/zone/home/test 访问子应用路由
  // 在微前端环境下，basename 可在管理平台上的额外属性中进行配置 https://flash.corp.kuaishou.com/micro-manage/app/main/list

  return (
    <BrowserRouter basename={basename || '/'}>
      <Routes>
        <Route path="/1" element={<Demo />} />

        <Route
          path="/*"
          element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Link to="/1">Back Home</Link>}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function App(props: any) {
  console.log('==== 从主应用收到参数 ====');
  console.log(props);
  console.log('==== 从主应用收到参数 ====');

  const { type = 'route', widget } = props || {};
  console.log(props)
  return (
    <ConfigProvider getPopupContainer={getPopupContainer} locale={zhCN}>
      {type == 'route' ? <RouterDemo {...props} /> : <Demo2></Demo2>}
    </ConfigProvider>
  );
}

export default App;
