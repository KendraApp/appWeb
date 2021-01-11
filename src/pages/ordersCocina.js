import React from 'react'
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import Cocina from '../components/orders/cocina' 

const Index = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Cocina" />
      <Widget>
        <Cocina />
      </Widget>
    </>
  )
}
export default Index
