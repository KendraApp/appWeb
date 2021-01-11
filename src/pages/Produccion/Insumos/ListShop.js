import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { api } from "../../../functions/db";
import axios from "axios";
const ListShop = ({ isShop, addleShop }) => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const ObtenerLista = async () => {
      const datos = await axios.get(`${api}shopinsumos/?ordering=-fecha`);
      if (datos.data.length > 0) {
        addleShop(true);
        setLista(datos.data);
      }
    };
    if (!isShop) {
      ObtenerLista();
    }
  }, [isShop, addleShop]);

  const columns = [
    {
      name: "insumo.nombre",
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
      name: "fecha",
      label: "Fecha",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "precio",
      label: "Precio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cantidad",
      label: "Cantidad",
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
      <MUIDataTable
        title={"Compras realizadas"}
        data={lista}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default ListShop;
