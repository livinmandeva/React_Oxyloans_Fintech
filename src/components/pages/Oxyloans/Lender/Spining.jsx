import React from 'react'
import { Button, Spin } from 'antd';
import './table.css'
export default function Spining() {

    const [spinning, setSpinning] = React.useState(true);

  return (
    <>
    <div className='flexcontaner' >
    <Spin spinning={spinning} fullscreen />
    </div>
  </>
  )
}