import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import ListShopping from "./ListShopping";
import ShoppingCartForm from "../../components/e-commerce/ShoppingCartForm";

const ShoppingCart = () => {
  const [insu, setInsu] = useState(false);

  const handleInsu = (dato) => {
    setInsu(dato);
  };

  return (
    <>
      <SectionTitle title="Pages" subtitle="Carrito de compra" />
      <Widget>
        <ShoppingCartForm handleInsu={handleInsu} />
        <ListShopping insu={insu} />
      </Widget>
    </>
  );
};

export default ShoppingCart;
