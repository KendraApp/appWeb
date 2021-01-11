import React, { useState, useEffect } from "react";
import { TextField, Select } from "@material-ui/core/";
import Notification from "../../notifications";
import { FiAlertCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Widget from "../../widget";
import { api } from "../../../functions/db";
import axios from "axios";

export default function ShopInsumosFrom({ addleShop }) {
  const { register, handleSubmit } = useForm();
  const [isInsum, setIsInsum] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [open, setOpen] = useState(false);
  const [typeNoti, setTypeNoti] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const ObtenerInsumos = async () => {
      const datos = await axios.get(`${api}insumos/`);
      if (datos.data.length > 0) {
        setInsumos(datos.data);
        setIsInsum(true);
      }
    };
    if (!isInsum) ObtenerInsumos();

    if (open) {
      const interval = setInterval(() => {
        setOpen(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInsum, open]);

  const onSubmit = async (data, e) => {
    if (
      data.insumo !== "" &&
      data.fecha !== "" &&
      data.cantidad !== "" &&
      data.gramos !== "" &&
      data.precio !== ""
    ) {
      await axios.post(`${api}shopinsumos/add/`, data);
      e.target.reset();
      setOpen(true);
      setTypeNoti("bg-green-500 text-white");
      setMsg("<span>Compra registrada correctamente</span>");
      // Enviamos notifiación al otro componente
      addleShop(false);
    } else {
      setOpen(true);
      setTypeNoti("bg-red-500 text-white");
      setMsg("<span>Complete los campos obligatorio</span>");
    }
  };
  return (
    <>
      <Widget>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
            <div className="w-full lg:w-1/4">
              <Select name="insumo" native={true} inputRef={register}>
                <option value="" key="">
                  Selecione insumo
                </option>
                {insumos.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-1/4">
              <TextField
                id="outlined-basic"
                label="Fecha de compra"
                name="fecha"
                type="date"
                inputRef={register}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="w-full lg:w-1/4">
              <TextField
                id="outlined-basic"
                label="Cantidad"
                name="cantidad"
                type="number"
                inputRef={register}
                variant="outlined"
              />
            </div>
          </div>
          <br></br>
          <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
            <div className="w-full lg:w-1/4">
              <TextField
                name="gramos"
                id="outlined-basic"
                label="Gramos"
                type="number"
                variant="outlined"
                inputRef={register}
              />
            </div>
            <div className="w-full lg:w-1/4">
              <TextField
                id="outlined-basic"
                label="Precio"
                name="precio"
                type="number"
                variant="outlined"
                inputRef={register}
              />
            </div>
            <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded">
              Enviar
            </button>
          </div>
        </form>
      </Widget>
      {open && (
        <Notification
          btnClassNames="btn btn-default btn-rounded"
          outerClassNames="z-50 transform fixed top-0 right-0 h-auto w-96 p-4"
          innerClassNames={typeNoti}
          animation="animate__animated animate__backInRight"
          icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
          content={msg}
        />
      )}
    </>
  );
}
