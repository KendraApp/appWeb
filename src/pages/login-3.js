import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../components/sample-forms/login";

const Index = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { name } = { ...config };
  return (
    <>
      <div className="w-full flex flex-row h-screen overflow-hidden">
        <div className="hidden lg:flex lg:flex-col w-1/2 items-center justify-center bg-grey-50 border-r border-grey-100">
          <img
            className="object-contain w-auto h-90 mb-8"
            src="/pages/error-page/fondo.png"
            alt="png"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-start justify-center p-4 lg:px-24">
          <div className="flex flex-col w-full mb-4">
            <div className="text-sm uppercase font-light text-grey-500">
              Autenticación
            </div>
            <div className="text-sm font-bold">
              Por favor ingrese su identificación y contraseña
            </div>
          </div>
          <Login />
          <div className="w-full">
            <span>
              <Link className="link" to="/forgot-password">
                Registrarse
              </Link>
            </span>
          </div>
          {/* <div className="flex flex-col w-full text-xs mt-4">
            <div className="flex flex-row space-x-2">
              <Link to="/privacy-policy">Política de privacidad</Link>
              <Link to="/terms-of-service">Términos y condiciones</Link>
            </div>
            <div className="text-grey-500">&copy; {name} 2021</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Index;
