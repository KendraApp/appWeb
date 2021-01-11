import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { api } from "../../../functions/db";
import axios from "axios";

const ListInsumos = () => {
  const [isInsu, setIsInsu] = useState(false);
  const [lista, setLista] = useState([]);

  const ObtenerLista = async () => {
    const datos = await axios.get(`${api}insumos/?ordering=nombre`);
    if (datos.data.length > 0) {
      setLista(datos.data);
      setIsInsu(true);
    }
  };
  useEffect(() => {
    if (!isInsu) ObtenerLista();
  }, [isInsu]);

  const columns = [
    {
      name: "nombre",
      label: "Insumo",
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
      name: "modified",
      label: "Última compra",
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

export default ListInsumos;
