import { DLRouter } from '@ks-dilu/react';
import { Button, Card, Space, Typography } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteMicros } from '../mock/micros';
import { useState } from 'react';
const { Title, Paragraph, Text } = Typography;

export default () => {
  const [extra, setExtra] = useState({});
  const { pathname } = useLocation();
  return (
    <Card
      title="路由级子应用"
      extra={
        <Space>
          <Button
            onClick={() => {
              setExtra({
                title: Math.random(),
              });
            }}
          >
            更新
          </Button>
        </Space>
      }
    >
      <DLRouter
        fetchMicros={async () => {
          return Promise.resolve(RouteMicros);
        }}
        isOccupyOuterContainer={false}
        extra={{
          ...extra,
        }}
        activeFilter={(location: Location) => {
          return !location.pathname.includes('/zone-origin/2');
        }}
      >
        {
          // @ts-ignore
          (state, list) => {
            console.log(state, list);
            return (
              <Typography>
                <Title>你访问的子应用不存在</Title>
                <Paragraph>
                  微前端的兜底组件，在没有找到和location.pathname匹配的子应用时显示
                </Paragraph>
                <Paragraph>
                  存在以下几种情况：
                  <ul>
                    <li>没有相关的子应用注册</li>
                    <li>
                      有相关的子应用注册，但是被提供的activeFilter过滤了，比如 /zone-origing/2
                    </li>
                  </ul>
                </Paragraph>
              </Typography>
            );
          }
        }
      </DLRouter>
    </Card>
  );
};
