import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { api } from "../../../functions/db";
import axios from "axios";

const ListProductos = () => {
  const [isProd, setIsProd] = useState(false);
  const [lista, setLista] = useState([]);

  const ObtenerLista = async () => {
    const datos = await axios.get(`${api}produccion/?ordering=nombre`);
    if (datos.data.length > 0) {
      setLista(datos.data);
      setIsProd(true);
    }
  };
  useEffect(() => {
    if (!isProd) ObtenerLista();
  }, [isProd]);

  const columns = [
    {
      name: "nombre",
      label: "Producto",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "gramos",
      label: "Gramos",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sabor.nombre",
      label: "Sabor",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "modified",
      label: "Fecha última producción",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options = {
    responsive: "stacked",
    selectableRows: "none",
  };

  return (
    <>
      <MUIDataTable data={lista} columns={columns} options={options} />
    </>
  );
};

export default ListProductos;
