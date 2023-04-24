import { Typography } from 'antd';
import { DLMicroContext } from '@ks-dilu/react-micro';
import { useContext } from 'react';
const { Title, Paragraph, Text, Link } = Typography;

const Demo = () => {
  const value = useContext(DLMicroContext);
  return (
    <Typography style={{ padding: '20px' }}>
      <Title>React版本组件级子应2</Title>
      <Title>随机数：{value?.title || 0}</Title>
      <Paragraph>
        <img
          style={{ height: 200 }}
          src={
            value?.image ||
            'https://img0.baidu.com/it/u=202361835,3806649081&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
          }
        ></img>
      </Paragraph>
    </Typography>
  );
};

export default Demo;
