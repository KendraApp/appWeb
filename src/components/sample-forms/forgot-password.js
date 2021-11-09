import React, { useState } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";

const ForgotPassword = ({ message = null }) => {
  const [data, onSubmit] = useState(null);
  let items = [
    {
      label: "Identificación",
      error: { required: "Identificación" },
      name: "identity",
      type: "number",
      placeholder: "Identificación",
    },
    {
      label: "Nombres",
      error: { required: "Nombres" },
      name: "first_name",
      type: "text",
      placeholder: "Nombres",
    },
    {
      label: "Apellidos",
      error: { required: "Apellidos" },
      name: "last_name",
      type: "text",
      placeholder: "Apellidos",
    },
    {
      label: "Teléfono",
      // error: { required: "Teléfono" },
      name: "phone_number",
      type: "number",
      placeholder: "Teléfono",
    },
    {
      label: "Dirección",
      // error: { required: "Dirección" },
      name: "address",
      type: "text",
      placeholder: "Dirección",
    },
    {
      label: "Contraseña",
      error: { required: "Contraseña" },
      name: "password",
      type: "password",
      placeholder: "Cree una contraseña",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised
            >
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default ForgotPassword;
