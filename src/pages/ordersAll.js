import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import All from '../components/orders/all' 

const Index = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Órdenes" />
      <Widget>
        <All />
      </Widget>
    </>
  )
}
export default Index