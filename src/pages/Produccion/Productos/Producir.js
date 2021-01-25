import React, { useState } from "react";
import ProducirForm from "../../../components/produccion/Productos/ProducirForm";
import SectionTitle from "../../../components/section-title";
import Widget from "../../../components/widget";

const Producir = () => {
  const [isShop, setIsShop] = useState(false);

  const handleShop = (dato) => {
    setIsShop(dato);
  };
  return (
    <>
      <SectionTitle title="Pages" subtitle="Área de producción" />
      <Widget>
        <ProducirForm addleProduccion={handleShop} />
      </Widget>
    </>
  );
};

export default Producir;
