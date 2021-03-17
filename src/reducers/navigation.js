import React from "react";
import { FiCompass, FiShoppingCart } from "react-icons/fi";

const initialState = [
  {
    title: "Panel de Usuario",
    items: [
      {
        url: "/dashboard",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
    ],
  },
  {
    title: "Producción",
    items: [
      {
        url: "/",
        icon: <FiShoppingCart size={20} />,
        title: "Insumos",
        items: [
          {
            url: "/insumos/inventario",
            title: "Inventario",
            items: [],
          },
          {
            url: "/insumos/compras",
            title: "Compras",
            items: [],
          },
        ],
      },

      {
        url: "/",
        icon: <FiShoppingCart size={20} />,
        title: "Productos",
        items: [
          {
            url: "/inventario/produccion",
            title: "Inventario",
            items: [],
          },
          {
            url: "/producir",
            title: "Producir",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Preparación/Cocina",
    items: [
      {
        url: "/",
        icon: <FiShoppingCart size={20} />,
        title: "Pedidos",
        items: [
          {
            url: "/e-commerce",
            title: "Ordenar/Crear",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiShoppingCart size={20} />,
        title: "Órdenes",
        items: [
          {
            url: "/ordenes/all",
            title: "Todas",
            items: [],
          },
          {
            url: "/ordenes/cocina",
            title: "Cocina",
            items: [],
          },
          {
            url: "/ordenes/done",
            title: "Realizadas",
            items: [],
          },
          {
            url: "/ShopingCart",
            title: "Carrito",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Facturación/Inventario",
    items: [
      {
        url: "/",
        icon: <FiShoppingCart size={20} />,
        title: "Facturas",
        items: [
          {
            url: "/facturas",
            title: "Ver todas",
            items: [],
          },
        ],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
