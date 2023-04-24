import React, { useContext } from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DLMicroContext } from '@ks-dilu/react-micro';
const { Title, Paragraph, Text } = Typography;

const Demo = () => {
  const value = useContext(DLMicroContext);

  return (
    <Typography style={{ padding: '20px' }}>
      <Title>React版本路由级子应用2</Title>
      <Title>{`随机数： ${value?.title || 0}`}</Title>
      <Paragraph>
        <Link to="/nofound">点击我，就进入404页面了哦</Link>
      </Paragraph>
      <Paragraph>
        <img
          style={{ width: 300 }}
          src="https://img1.baidu.com/it/u=4256555577,2837194795&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
        ></img>
      </Paragraph>
    </Typography>
  );
};

export default Demo;
