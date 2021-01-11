import React from 'react';
import SectionTitle from '../components/section-title'
import Widget from '../components/widget'
import OrderForm from '../components/e-commerce/orderForm'


const Ordenar = () => {

    return (
    <>
     <SectionTitle title="Ordenar/Cocina" subtitle="Ordenar Producto" />
     <Widget>
    
           <OrderForm />

    </Widget>
    </>
    )
}

export default Ordenar