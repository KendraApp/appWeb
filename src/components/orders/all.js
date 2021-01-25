import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core/";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import Facturacion from "./facturacion";
import { api } from "../../functions/db";
import ReactToPrint from "react-to-print";
// import FactuPrint from "./factuprint";

const All = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isProd, setIsProd] = useState(false);
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState();
  const [precioFactu, setPrecioFactu] = useState(0);

  const UpdateCocina = async (id, es) => {
    const objeto = {
      cancelado: es,
    };
    await axios.put(`${api}pedido/update/${id}/`, objeto);
  };
  useEffect(() => {
    const obtenerPedidos = async () => {
      const new_pedidos = await axios.get(
        `${api}pedido?ordering=-modified&facturado=false`,
      );

      if (new_pedidos.data.length > 0) {
        setPedidos(new_pedidos.data);
        //setIsProd(true)
      } else setPedidos([]);
    };

    const interval = setInterval(() => {
      obtenerPedidos();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [seleccion, setSeleccion] = useState([]);
  const [seleccionFactu, setSeleccionFactu] = useState([]);

  const handleChecked = (id, produ, comple, cond, obs, precio, e) => {
    const objeto = {
      id,
      produ,
      comple,
      cond,
      obs,
      precio,
    };
    const objeto2 = id;

    if (seleccion.length > 0) {
      if (e) {
        setSeleccion([...seleccion, objeto]);
        setSeleccionFactu([...seleccionFactu, objeto2]);
      } else {
        const filtro = seleccion.filter((dt) => dt.id !== id);
        setSeleccion(filtro);
        setSeleccionFactu(filtro);
      }
    } else {
      // console.log("No tiene info")
      setSeleccion([objeto]);
      setSeleccionFactu([objeto2]);
      setPrecioFactu(0);
    }
  };

  const columns2 = [
    {
      name: "id",
      label: "Seleccionar",
      options: {
        filter: true,
        sortDescFirst: true,
        sortThirdClickReset: true,
        sort: true,
        display: true,
        customBodyRender: (value, tableMeta) => {
          const produ = tableMeta.rowData[2];
          const comple = tableMeta.rowData[3];
          const cond = tableMeta.rowData[4];
          const obs = tableMeta.rowData[5];
          const precio = tableMeta.rowData[6];

          return (
            <Checkbox
              onChange={(e) =>
                handleChecked(
                  value,
                  produ,
                  comple,
                  cond,
                  obs,
                  precio,
                  e.target.checked,
                )
              }
              name="checkedA"
            />
          );
        },
      },
    },
    {
      name: "cliente_name",
      label: "Cliente",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "producto.nombre",
      label: "Producto",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "desc_pedido",
      label: "Complementos",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "condiciones",
      label: "Condiciones",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "observacion",
      label: "Observacion",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "valor",
      label: "Precio",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "asignado_a.nombre",
      label: "Responsable",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "hora_inicio",
      label: "Hora Preparación",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "hora_final",
      label: "Hora de salida",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "hora_entrega",
      label: "Hora de entrega",
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: "modified",
    //   label: "Hora de entrega",
    //   options: {
    //    filter: true,
    //    sort: true,
    //    customBodyRender: (value, tableMeta) => {
    //     const estado_entrega = tableMeta.rowData[11];
    //       if(estado_entrega){
    //         const separar = value.split("T");
    //         const hora_1 = separar[1].split(".")
    //         const hora =  hora_1[0];
    //         return hora
    //       }else
    //       return " ";

    //     }
    //   }
    // },

    {
      name: "entrega_cliente",
      label: "Estado",
      options: {
        filter: true,
        sort: true,
        display: false,
        customBodyRender: (value) => {
          if (value) return "En proceso";
          else return "Sin empezar";
        },
      },
    },

    {
      name: "id",
      label: "Acción",
      options: {
        filter: true,
        sortDescFirst: true,
        sortThirdClickReset: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const hora_prep = tableMeta.rowData[8];
          const estado = true;

          if (hora_prep) {
            return " ";
          } else {
            return (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => UpdateCocina(value, estado)}
              >
                Cancelar
              </Button>
            );
          }
        },
      },
    },
  ];

  const options2 = {
    responsive: "stacked",
    selectableRows: "none",
  };

  const handleFacturar = () => {
    setCliente("");

    let sum_precio = 0;

    seleccion.map((dt) => {
      sum_precio = parseInt(sum_precio) + parseInt(dt.precio);
    });
    setPrecioFactu(sum_precio);

    setOpen(true);
  };

  const UpdatePedido = async (id) => {
    const objeto = {
      facturado: true,
    };

    await axios.put(`${api}pedido/update/${id}/`, objeto);
  };

  const FacturarAlone = async () => {
    const objeto = {
      facturado: true,
      valor: parseInt(precioFactu),
      personas: 1,
      pedidos: seleccionFactu,
    };

    await axios.post(`${api}facturas/add/`, objeto);

    seleccionFactu.map((dt) => {
      //console.log(dt)
      UpdatePedido(dt);
    });

    setSeleccionFactu([]);
    // console.log(facturar)
    setOpen(false);
  };

  const FacturarAndPrint = async () => {
    // const objeto = {
    //   facturado: true,
    //   valor: parseInt(precioFactu),
    //   personas: 1,
    //   pedidos: seleccionFactu,
    // };

    // await axios.post(`${api}facturas/add/`, objeto);

    // seleccionFactu.map((dt) => {
    //   //console.log(dt)
    //   UpdatePedido(dt);
    // });

    // setSeleccionFactu([]);
    window.open(
      `http://localhost:3000/facturacion/print/`,
      "_blank",
      "toolbar=0,location=0,menubar=0",
    );

    // console.log(facturar)
    setOpen(false);
  };

  // const FacturarSave = async () => {
  //   const objeto = {
  //     guardado: true,
  //     valor: parseInt(precioFactu),
  //     personas: 1,
  //     pedidos: seleccionFactu,
  //   };

  //   seleccionFactu.map((dt) => {
  //     UpdatePedido(dt);
  //   });
  //   const facturar = await axios.post(
  //     `${api}facturas/add/`,
  //     objeto,
  //   );

  //   setOpen(false);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenEmergen = () => {
    // let separar = vehiculo.split('|')
    // if (separar[1])
    //   window.open(`https://api.whatsapp.com/send?phone=57${separar[1]}`, '_blank', 'toolbar=0,location=0,menubar=0');
  };

  return (
    <>
      {seleccion.length > 0 && (
        <center>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFacturar}
          >
            Facturar
          </Button>
        </center>
      )}
      <br></br>
      <br></br>
      <MUIDataTable
        title={"Lista de ordenes"}
        data={pedidos}
        columns={columns2}
        options={options2}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="lg"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">
          Facturar Pedido: total: {precioFactu}{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="Cliente"
            label="Cliente"
            type="text"
            value={cliente}
            fullWidth
            // onChange={(e)=> setTiempo(e.target.value)}
          />
          <Facturacion seleccion={seleccion} precio={precioFactu} />
          {/* <MUIDataTable
            title={"Facturación de órdenes"}
            data={seleccion}
            columns={columnsFactu}
            options={optionsFactu}
          />       */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>

          <Button onClick={FacturarAlone} color="primary">
            Sólo Facturar
          </Button>
          {/* <Button onClick={FacturarSave} color="primary">
            Sólo Guardar
          </Button> */}

          {/* <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <ComponentToPrint ref={componentRef} />
          <Button onClick={FacturarAndPrint} color="primary">
            Facturar e Imprimir
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default All;
