import React, {useState} from 'react'
import Validation from '../forms/validation'
import Alert from '../alerts'

const Login = ({message = null}) => {
  const [data, onSubmit] = useState(null)

  
  let items = [
    {
      label: 'Email',
      error: {required: 'Ingrese Email'},
      name: 'email',
      type: 'email',
      placeholder: 'Ingrese teléfono'
    },
    {
      label: 'Contraseña',
      error: {
        required: 'Contraseña es requerida',
        minLength: {
          value: 4,
          message: 'Tu Contraseña no puede menos o igual que cuatro(4) caractéres'
        },
      },
      name: 'password',
      type: 'password',
      placeholder: 'Ingrese su contraseña'
    },
  ]
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default Login
