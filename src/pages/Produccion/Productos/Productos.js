import React from "react";
import SectionTitle from "../../../components/section-title";
import Widget from "../../../components/widget";
import ListProductos from "./ListProduccion";

const Productos = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Inventario de Produción" />
      <Widget>
        <ListProductos />
      </Widget>
    </>
  );
};

export default Productos;
