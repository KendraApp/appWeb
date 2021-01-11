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

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isProd, setIsProd] = useState(false);
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState();

  const obtenerPedidos = async () => {
    const new_pedidos = await axios.get(
      `http://localhost:8000/api/pedido?ordering=-id&entrega_cocina=false`,
    );

    if (new_pedidos.data.length > 0) {
      setPedidos(new_pedidos.data);
      setIsProd(true);
    } else setPedidos([]);
  };

  const UpdateCocina = async (id, es, hora) => {
    const hoy = new Date();
    let hora_inicio =
      hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    let hora_final = null;
    let entrega = false;
    if (es) {
      hora_final = hora_inicio;
      hora_inicio = hora;
      entrega = true;
    }
    const objeto = {
      estado: true,
      entrega_cocina: entrega,
      hora_inicio: hora_inicio,
      hora_final: hora_final,
    };

    await axios.put(`http://localhost:8000/api/pedido/update/${id}/`, objeto);
  };
  useEffect(() => {
    setInterval(() => {
      obtenerPedidos();
    }, 5000);
  }, []);

  const [seleccion, setSeleccion] = useState([]);

  const handleChecked = (id, e) => {
    const objeto = { id };

    if (seleccion.length > 0) {
      console.log("Tiene info");
      if (e) {
        setSeleccion([...seleccion, objeto]);
      } else {
        const filtro = seleccion.filter((dt) => dt.id != id);
        setSeleccion(filtro);
      }
    } else {
      // console.log("No tiene info")
      setSeleccion([objeto]);
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
        display: false,
        customBodyRender: (value) => (
          <Checkbox
            onChange={(e) => handleChecked(value, e.target.checked)}
            name="checkedA"
          />
        ),
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
      },
    },
    {
      name: "hora_inicio",
      label: "Hora de inicio",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "estado",
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
          const estado = tableMeta.rowData[9];
          const hora = tableMeta.rowData[8];

          if (estado) {
            return (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => UpdateCocina(value, estado, hora)}
              >
                Finalizar
              </Button>
            );
          } else {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={() => UpdateCocina(value, estado, hora)}
              >
                Empezar
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
    //  customToolbarSelect: selectedRows => (
    //     <CustomToolbarSelect selectedRows={selectedRows} />
    //   )
  };

  const handleFacturar = () => {
    setCliente(""); // Borramos el nombre del cliente inicial

    //Buscamos los datos de los productos seleccionados

    // console.log("valor del pedido", id)

    // // Consultamos los datos del pedido

    // const dt_pedido = await axios.get(`${api}pedidos/${id}`);
    // setIdPedido(id)
    // setTiempo(dt_pedido.data[0].tiempo);
    // setPrecio(dt_pedido.data[0].precio);
    // if(dt_pedido.data[0].vehiculo)
    // setVehiculo(dt_pedido.data[0].vehiculo.id)

    // const new_vehiculos = await axios.get(`${api}vehiculo/`);
    // setVehiculos(new_vehiculos.data);

    setOpen(true);
  };

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
            {" "}
            Facturar
          </Button>
        </center>
      )}
      <br></br>
      <br></br>
      <MUIDataTable data={pedidos} columns={columns2} options={options2} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Facturar Pedido</DialogTitle>
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
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tiempo"
            type="number"
            value={tiempo}
            fullWidth
            onChange={(e)=> setTiempo(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Precio"
            type="number"
            value={precio}
            fullWidth
            onChange={(e)=> setPrecio(e.target.value)}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vehiculo}
            onChange={(e)=> setVehiculo(e.target.value)}
            defaultChecked={vehiculo}
            defaultValue={vehiculo}
          >
            {
              vehiculos.map(data => (
              <MenuItem value={`${data.id}|${data.persona.phone}`}>
                {`${data.placa}-${data.modelo}-${data.marca}-${data.persona.name}`}
              </MenuItem>
              ))} 
              
          </Select>
          <Button onClick={OpenEmergen} color="primary">
            Chatear 
          </Button>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={estadoPed}
            onChange={(e)=> setEstadoPed(e.target.value)}
          >
            <MenuItem value="4">Cancelado</MenuItem>
            <MenuItem value="5">En camino</MenuItem>
            <MenuItem value="6">Terminado</MenuItem>
              
          </Select>  */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cocina;
