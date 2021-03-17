import React from "react";
import SectionTitle from "../components/section-title";
import Widget from "../components/widget";
// import Ratings from '../components/e-commerce/ratings'
// import Colors from '../components/e-commerce/colors'
// import Brands from '../components/e-commerce/brands'
import Categories from "../components/e-commerce/categories";
import Products from "../components/e-commerce/products";

// import {RangeSlider} from '../components/sliders'

const Index = () => {
  return (
    <>
      <SectionTitle title="Producción/Cocina" subtitle="Ordenar/Crear pedido" />
      <Widget>
        <div className="flex w-full">
          {/* <div className="w-full lg:w-1/4 p-2">
            <div className="w-full mb-4">
              <div className="uppercase font-normal text-xs tracking-wider flex flex-row items-center justify-start w-full">
                Filtrar por Categorias
              </div>
              <Categories />
            </div>
          </div> */}
          <div>
            <Products />
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
