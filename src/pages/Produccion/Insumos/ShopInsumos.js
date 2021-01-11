import React, { useState } from "react";
import ShopInsumosForm from "../../../components/produccion/Insumos/ShopInsumosForm";
import SectionTitle from "../../../components/section-title";
import Widget from "../../../components/widget";
import ListShop from "./ListShop";

const ShopInsumos = () => {
  const [isShop, setIsShop] = useState(false);

  const handleShop = (dato) => {
    setIsShop(dato);
  };
  return (
    <>
      <SectionTitle title="Pages" subtitle="Compra Insumos" />
      <Widget>
        <ShopInsumosForm addleShop={handleShop} />
        <ListShop isShop={isShop} addleShop={handleShop} />
      </Widget>
    </>
  );
};

export default ShopInsumos;
