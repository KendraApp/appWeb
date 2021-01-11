import React from 'react'
import {useSelector, shallowEqual} from 'react-redux'

const Text = () => {
  const {config} = useSelector(
    (state) => ({
      config: state.config
    }),
    shallowEqual
  )
  let {name} = {...config}
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold mb-4">Bienvenido a {name}!</p>
      <p className="text-sm font-thin">
        Aplicación web para el alquiler de vehículo con conductor.
      </p>
    </div>
  )
}
export default Text
