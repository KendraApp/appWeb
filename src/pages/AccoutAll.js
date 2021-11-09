import React from "react";
import SectionTitle from "../components/section-title";
import Widget from "../components/widget";
import All from "../components/account/all";

const Index = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="Listado de Cuentas" />
      <Widget>
        <All />
      </Widget>
    </>
  );
};
export default Index;
