import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Done from '../components/orders/done' 

const Index = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Órdenes para entregar" />
      <Widget>
        <Done />
      </Widget>
    </>
  )
}
export default Index
