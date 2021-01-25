import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem } from "@material-ui/core/";
import Notification from "../../notifications";
import { FiAlertCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Widget from "../../widget";
import { api } from "../../../functions/db";
import axios from "axios";

export default function ShopInsumosFrom({ addleShop }) {
  const { register, handleSubmit } = useForm();
  const [isInsum, setIsInsum] = useState(false);
  const [insumo, setInsumo] = useState();
  const [porcentaje, setPorcentaje] = useState();
  const [gramosUtil, setGramosUtil] = useState();
  const [insumos, setInsumos] = useState([]);
  const [uniMed, setUniMed] = useState([]);
  const [open, setOpen] = useState(false);
  const [typeNoti, setTypeNoti] = useState();
  const [msg, setMsg] = useState();

  // información calculada

  const [cant, setCantidad] = useState();
  const [precioUni, setPrecioUni] = useState();
  const [gramosUni, setGramosUni] = useState();
  const [gramosTot, setGramosTot] = useState();
  const [precioTot, setPrecioTot] = useState();

  const [formShop, setFormShop] = useState({
    fecha: null,
    cantidad: null,
    gramos_unidad: null,
    precio_unidad: null,
    gramos: null,
    precio: null,
    insumo: null,
    unidad_medida: null,
  });

  useEffect(() => {
    const ObtenerInsumos = async () => {
      const datos = await axios.get(`${api}insumos?ordering=nombre`);
      const datos2 = await axios.get(
        `${api}insumos/unidadmedida?ordering=nombre`,
      );
      if (datos.data.length > 0) {
        setInsumos(datos.data);
        setUniMed(datos2.data);
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
      //console.log(formShop);
      await axios.post(`${api}shopinsumos/add/`, formShop);
      e.target.reset();
      setCantidad();
      setPrecioUni();
      setGramosTot();
      setGramosUni();
      setPrecioTot();
      setGramosUtil();
      setInsumo();
      setOpen(true);
      setTypeNoti("bg-green-500 text-white");
      setMsg("Compra registrada correctamente");
      // Enviamos notifiación al otro componente
      addleShop(false);
    } else {
      setOpen(true);
      setTypeNoti("bg-red-500 text-white");
      setMsg("Complete los campos obligatorio");
    }
  };

  const handleUnidadMedida = async (id) => {
    // obtenemos los gramos a calular
    const datos = await axios.get(`${api}insumos/unidadmedida?id=${id}`);
    // console.log(datos.data);
    if (datos.data.length > 0) {
      // calcumos los gramos unitarios
      setGramosUni(datos.data[0].valor);
      setGramosTot(parseInt(cant) * parseInt(datos.data[0].valor));
      setPrecioTot(parseInt(cant) * parseInt(precioUni));

      //console.log(porcentaje);
      setGramosUtil(
        (parseInt(cant) * parseInt(datos.data[0].valor) * porcentaje) / 100,
      );
      setFormShop({
        ...formShop,
        gramos:
          (parseInt(cant) * parseInt(datos.data[0].valor) * porcentaje) / 100,
        gramos_unidad: datos.data[0].valor,
        gramos_total: parseInt(cant) * parseInt(datos.data[0].valor),
        precio: parseInt(cant) * parseInt(precioUni),
        unidad_medida: id,
      });
    }
  };
  return (
    <>
      <Widget>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-6">
            <div className="w-full lg:w-1/6">
              <Select
                name="insumo"
                native={false}
                value={insumo}
                onChange={(e) => {
                  let separar = e.target.value.split("|");
                  setInsumo(separar[0]);
                  setPorcentaje(separar[1]);
                  setFormShop({
                    ...formShop,
                    insumo: separar[0],
                  });
                }}
                inputRef={register}
              >
                <MenuItem value="" key="">
                  Selecione insumo
                </MenuItem>
                {insumos.map((item, i) => (
                  <MenuItem key={i} value={`${item.id}|${item.rendimiento}`}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-1/6">
              <TextField
                id="outlined-basic"
                label="Cantidad comprada"
                name="cantidad"
                type="number"
                value={cant}
                onChange={(e) => {
                  setCantidad(e.target.value);
                  setFormShop({
                    ...formShop,
                    cantidad: e.target.value,
                  });
                }}
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="w-full lg:w-1/6">
              <TextField
                id="outlined-basic"
                label="Precio unitario"
                name="precio_unidad"
                type="number"
                value={precioUni}
                onChange={(e) => {
                  setPrecioUni(e.target.value);
                  setFormShop({
                    ...formShop,
                    precio_unidad: e.target.value,
                  });
                }}
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="w-full lg:w-1/6">
              <Select
                name="unidad_medida"
                native={true}
                onChange={(e) => {
                  handleUnidadMedida(e.target.value);
                  setFormShop({
                    ...formShop,
                    unidad_medida: e.target.value,
                  });
                }}
                inputRef={register}
              >
                <option value="" key="">
                  Unidad de medida
                </option>
                {uniMed.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </Select>
            </div>
            <div className="w-full lg:w-1/6">
              <TextField
                name="precio"
                id="outlined-basic"
                label="Precio total"
                type="number"
                value={precioTot}
                onChange={(e) => {
                  setFormShop({
                    ...formShop,
                    precio: e.target.value,
                  });
                }}
                inputRef={register}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <br></br>
          <hr></hr>
          <br></br>
          <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-6">
            <div className="w-full lg:w-1/6">
              <TextField
                name="gramos_unidad"
                id="outlined-basic"
                label="Gramos por unidad"
                type="text"
                value={gramosUni}
                onChange={(e) => {
                  setFormShop({
                    ...formShop,
                    gramos_unidad: e.target.value,
                  });
                }}
                inputRef={register}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="w-full lg:w-1/6">
              <TextField
                name="gramos"
                id="outlined-basic"
                label="Gramos totales"
                type="number"
                value={gramosTot}
                onChange={(e) => {
                  setFormShop({
                    ...formShop,
                    gramos_total: e.target.value,
                  });
                }}
                inputRef={register}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="w-full lg:w-1/6">
              <TextField
                name="gramos_util"
                id="outlined-basic"
                label="Gramos últiles"
                type="number"
                value={gramosUtil}
                onChange={(e) => {
                  setFormShop({
                    ...formShop,
                    gramos: e.target.value,
                  });
                }}
                inputRef={register}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="w-full lg:w-1/6">
              <TextField
                id="outlined-basic"
                label="Fecha de compra"
                name="fecha"
                type="date"
                inputRef={register}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setFormShop({
                    ...formShop,
                    fecha: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <center>
            <button className="btn btn-default bg-blue-500 hover:bg-blue-600 text-white btn-rounded">
              Registrar Compra
            </button>
          </center>
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
