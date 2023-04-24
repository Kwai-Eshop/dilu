//flash.corp.kuaishou.com/static/kwaishop-seller-cover-pc-test10/index.20220419.131046.txt
// http://f2.eckwai.com/kos/nlav12333/fangzhou/pub/fangzhou-page-freeFeeGuide/index.20230202.102905.txt

import { DLWidget, MicroApp } from '@ks-dilu/react';
import { useRef, useState } from 'react';
import { Button, Card, Space } from 'antd';
export default ({ name, entry }: any) => {
  const ref = useRef<MicroApp>(null);
  const [title, setTitle] = useState(44);

  return (
    <Card
      title="组件级子应用"
      extra={
        <Space>
          <Button
            onClick={() => {
              ref?.current?.update?.({ props: { title: Math.random() } });
            }}
          >
            实例update方法
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setTitle(Math.random());
            }}
          >
            Props更新
          </Button>
        </Space>
      }
    >
      <DLWidget ref={ref} name={name} entry={entry} extra={{ title, type: 'widget' }}></DLWidget>
    </Card>
  );
};
