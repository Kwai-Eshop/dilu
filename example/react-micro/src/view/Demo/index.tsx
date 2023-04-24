import React, { useContext } from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DLMicroContext } from '@ks-dilu/react-micro';
const { Title, Paragraph, Text } = Typography;

const Demo = () => {
  const value = useContext(DLMicroContext);

  return (
    <Typography style={{ padding: '20px' }}>
      <Title>React版本路由级子应用</Title>
      <Title>{`随机数：${value?.title || 0}`}</Title>
      <Paragraph>
        <Link to="/nofound">点击我，就进入404页面了哦</Link>
      </Paragraph>
      <Paragraph>
        <img
          style={{ width: 300 }}
          src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF"
        ></img>
      </Paragraph>
    </Typography>
  );
};

export default Demo;
