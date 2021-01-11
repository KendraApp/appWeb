import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";

const ListShopping = ({ insu }) => {
  const [isInsu, setIsInsu] = useState(insu);

  const [lista, setLista] = useState([]);
  const ordenes = useSelector((store) => store.orderDucks);

  useEffect(() => {
    if (!isInsu) {
      setLista(ordenes);
      setIsInsu(true);
    }
  }, [isInsu, ordenes]);

  const columns = [
    {
      name: "orden.nombre",
      label: "Producto",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orden.desc_pedido",
      label: "Descripción",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orden.condiciones",
      label: "Condiciones",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orden.observacion",
      label: "Observaciones",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orden.valor",
      label: "Precio",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "orden.cantidad",
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
      <MUIDataTable data={lista} columns={columns} options={options} />
    </>
  );
};

export default ListShopping;
