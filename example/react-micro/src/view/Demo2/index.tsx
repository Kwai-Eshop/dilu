import { Typography } from 'antd';
import { DLMicroContext } from '@ks-dilu/react-micro';
import { useContext } from 'react';
const { Title, Paragraph, Text, Link } = Typography;

const Demo = () => {
  const value = useContext(DLMicroContext);
  return (
    <Typography style={{ padding: '20px' }}>
      <Title>React组件级子应用</Title>
      <Title>随机数：{value?.title}</Title>
      <Paragraph>
        <img
          style={{ height: 200 }}
          src={
            value?.image ||
            'https://img0.baidu.com/it/u=1188128476,2692382549&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
          }
        ></img>
      </Paragraph>
    </Typography>
  );
};

export default Demo;
