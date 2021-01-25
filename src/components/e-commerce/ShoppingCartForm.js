import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../functions/db";
import { VaciarOrdenesAccion } from "../../reducers/orderDucks";
import { Button } from "@material-ui/core/";

const ShoppingCartForm = ({ handleInsu }) => {
  let history = useHistory();

  const dispatch = useDispatch();
  const ordenes = useSelector((store) => store.orderDucks);

  const AddPedido = async () => {
    if (ordenes.length > 0) {
      ordenes.map((data) => {
        AddOrden(
          data.orden,
          data.insumos,
          data.sabor,
          data.adicion,
          data.orden.gramaje,
        );
      });

      // Vaciamos el carrito de compra
      dispatch(VaciarOrdenesAccion());
      handleInsu(false);
    }
  };

  const AddOrden = async (data, insumo, sabores, adicion, gramaje) => {
    const orden = await axios.post(`${api}pedido/crear/`, data);
    if (insumo.length > 0) AddInsumo(orden.data.id, insumo);
    if (sabores.length > 0) AddSabor(orden.data.id, sabores, gramaje);
    if (adicion.length > 0) AddAdicion(orden.data.id, adicion);
  };

  // Añadiendo consumo promdiuccion

  const ConsumoProduccion = async (id, gramos) => {
    const objeto = {
      producto: parseInt(id),
      gramos: parseInt(gramos),
    };
    await axios.post(`${api}produccion/consumo/add/`, objeto);
  };
  // Añadiendo consumo insumo
  const ConsumoInsumo = async (id, gramos) => {
    const objeto = {
      insumo: parseInt(id),
      gramos: parseInt(gramos),
    };
    await axios.post(`${api}insumos/consumo/add/`, objeto);
  };

  // Añadiendo Insumo
  const AddInsumo = async (orden, insumo) => {
    insumo.map((data) => {
      const detalle_orden_ped = {
        pedido: parseInt(orden),
        ingrediente_name: data.insumo.nombre,
        gramos: parseInt(data.gramos),
      };
      // Agregamos pedido
      AddDetallePedido(detalle_orden_ped);
      // descotamos los gramos de los insumos
      UpGramosInsumos_1(data.insumo.id, data.gramos);

      // Agregamos consumo
      ConsumoInsumo(data.insumo.id, data.gramos);
    });
  };
  // Añadiendo sabor
  const AddSabor = async (orden, sabor, gramaje) => {
    const gramos_sabor = gramaje / sabor.length;

    sabor.map((data) => {
      const detalle_orden_ped = {
        pedido: parseInt(orden),
        ingrediente_name: "(Helado) " + data.sabor,
        gramos: parseInt(gramos_sabor),
      };
      // Agregamos pedido
      AddDetallePedido(detalle_orden_ped);

      // descotamos los gramos de los helados
      UpGramosProd(data.id_sabor, gramos_sabor);

      // Añadimos consumo
      ConsumoProduccion(data.id_sabor, gramos_sabor);

      return null;
    });
  };
  // Añadiendo Adicion
  const AddAdicion = async (orden, adicion) => {
    adicion.map((data) => {
      const detalle_orden_ped = {
        pedido: parseInt(orden),
        ingrediente_name: data.nombre,
        gramos: parseInt(data.gramos),
        valor: parseInt(data.precio),
      };
      // Agregamos pedido
      AddDetallePedido(detalle_orden_ped);
      // descotamos los gramos de los insumos
      UpGramosInsumos(data.id_adicion, data.gramos);
      return null;
    });
  };

  //Funciones para agregar información

  const AddDetallePedido = async (detalle) => {
    await axios.post(`${api}pedido/detalle/crear/`, detalle);
  };

  const UpGramosInsumos_1 = async (prod, gramos) => {
    const produc_gramos = await axios.get(`${api}insumos/buscar/${prod}/`);
    const new_gramos =
      parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    const objeto = {
      gramos: new_gramos,
    };
    await axios.put(`${api}insumos/update/${prod}/`, objeto);
  };

  const UpGramosProd = async (prod, gramos) => {
    const produc_gramos = await axios.get(`${api}produccion/buscar/${prod}/`);
    const new_gramos =
      parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    const objeto = {
      gramos: new_gramos,
    };
    await axios.put(`${api}produccion/update/${prod}/`, objeto);
  };

  const UpGramosInsumos = async (prod, gramos) => {
    const id_insumo = await axios.get(`${api}productos/${prod}/`);

    const produc_gramos = await axios.get(
      `${api}insumos/buscar/${id_insumo.data[0].insumos[0].id}/`,
    );
    const new_gramos =
      parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    const objeto = {
      gramos: new_gramos,
    };
    await axios.put(
      `${api}insumos/update/${id_insumo.data[0].insumos[0].id}/`,
      objeto,
    );
  };

  const VaciarPedido = () => {
    dispatch(VaciarOrdenesAccion());
    handleInsu(false);
  };

  return (
    <>
      <center>
        <div className="flex flex-col align-items:center lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <Button variant="contained" color="primary" onClick={AddPedido}>
            Enviar Pedido
          </Button>
          <Button variant="contained" color="secondary" onClick={VaciarPedido}>
            Eliminar Pedido
          </Button>
        </div>
      </center>
    </>
  );
};

export default ShoppingCartForm;
