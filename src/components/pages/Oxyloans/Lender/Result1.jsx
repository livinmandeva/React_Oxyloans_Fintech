import React from 'react';
import { Button, Result } from 'antd';
const Result1 = ({message}) => (
  <Result
    status="success"
    title={message}
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
);
export default Result1;