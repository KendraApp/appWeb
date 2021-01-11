import React from "react";
import SectionTitle from "../../../components/section-title";
import Widget from "../../../components/widget";
import ListInsumos from "./ListInsumos";

const ShopInsumos = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Inventario de Insumos" />
      <Widget>
        <ListInsumos />
      </Widget>
    </>
  );
};

export default ShopInsumos;
