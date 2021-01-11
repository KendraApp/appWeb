import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerOrdenesAccion,
  AddOrdenesAccion,
} from "../../reducers/orderDucks";
import {
  Button,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  List,
  TextField,
} from "@material-ui/core/";
import shortid from "shortid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { formatCurrency } from "../../functions/numbers";
import { api } from "../../functions/db";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Selección de Producto",
    "Seleccione ingredientes",
    "Sabor Helado (Opcional)",
    "Adiciones (Opcional)",
    "Complementos",
  ];
}

const OrderForm = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [nomProdu, setNomProdu] = useState();

  const [insumo, setInsumo] = useState([]); // // insumo seleccionado del usuario
  const [listInsumos, setListInsumos] = useState([]); // Lista de insumos del producto
  const [insumos, setInsumos] = useState([]); //Lista de insumo para agregar.

  const [adiciones, setAdiciones] = useState([]); // Lista de adiciones del usuario
  const [adicion, setAdicion] = useState(); // Adicion seleccionado

  const [sabores, setSabores] = useState([]); // Lisa de sabores
  const [sabor, setSabor] = useState(); // Sabor seleccionado del usuario.

  // const [gramajes, setGramajes] = useState([]); //Lista de gramajes
  const [gramaje, setGramaje] = useState(); // Gramaje del producto
  const [cantGramaje, setCantGramaje] = useState();

  // Para condicionales
  const [condicionales, setCondicionales] = useState("Ninguno"); // para las condicionales

  const [isProd, setIsProd] = useState(false);

  // Eleccion de sabores de helado
  const [listsabor, setListsabor] = useState([]); // Sabores  elegidos de helado del usuario.

  // Elección de adiciones

  const [listadicion, setListadicion] = useState([]); //Adicones elegidos por el usuario.

  // Precio total del producto
  const [precio, setPrecio] = useState();

  // Usuario del pedido

  const [cliente, setCliente] = useState();
  const [tipoOrder, setTipoOrder] = useState(); // Tipo de orden
  const [obs, setObs] = useState();

  const [carrito, setCarrito] = useState([]); // Carrito de compra

  // Cosas del reducer
  const dispatch = useDispatch();

  // Descripción total del pedido

  //const [descPedido, setDescPedido] = useState();

  const AddIngrediente = () => {
    let separar = insumo.split("|");
    //console.log(id)
    const objeto = {
      id: parseInt(separar[0]),
      nombre: separar[2],
      gramos_preparacion: parseInt(separar[1]),
    };

    setListInsumos([...listInsumos, objeto]);
  };

  const deleteIngrediente = (id, nom) => {
    const filtro = listInsumos.filter((item) => item.id !== id);
    setListInsumos(filtro);

    // Agredandato datos de condicionales
    if (listInsumos.length > 1) {
      setCondicionales("");
      let conteni = condicionales;
      if (conteni) {
        conteni += nom + ", ";
      } else {
        conteni = "Sin " + nom + ", ";
      }
      setCondicionales(conteni);
    } else setCondicionales("Ninguno");

    console.log("informacion de condicionales: ", condicionales);
  };

  const addSabor = () => {
    let separar = sabor.split("|");

    // mostramos los

    const objeto = {
      id: shortid.generate(),
      id_sabor: separar[0],
      sabor: separar[1],
    };

    setListsabor([...listsabor, objeto]);
  };
  const deleteSabor = (id) => {
    const filtro = listsabor.filter((item) => item.id !== id);
    setListsabor(filtro);
  };

  const addAdicion = () => {
    let separar = adicion.split("|");

    const objeto = {
      id: shortid.generate(),
      id_adicion: separar[0],
      nombre: separar[1],
      gramos: separar[2],
      precio: separar[3],
    };

    // Actualizamos el precio
    const new_precio = parseInt(precio) + parseInt(separar[3]);
    setPrecio(new_precio);

    setListadicion([...listadicion, objeto]);
  };

  const deleteAdicion = (id, precio2) => {
    // Actualizamos precio
    const new_precio = parseInt(precio) - parseInt(precio2);
    setPrecio(new_precio);

    const filtro = listadicion.filter((item) => item.id !== id);
    setListadicion(filtro);
  };

  //  console.log("sabores", listsabor)
  //  console.log("cantidad de gramaje", cantGramaje)
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            {productos.map((item, i) => (
              <div className="w-1/4 p-2" key={i}>
                <div className="w-full flex flex-col items-start justify-around space-y-3">
                  <div className="mx-auto w-24">
                    <img
                      src={item.photo}
                      alt="media"
                      className={`h-24 w-full shadow-lg rounded-full shadow-lg`}
                    />
                  </div>
                  <div className="text-sm font-bold">{item.nombre}</div>
                  <div className="text-sm">{item.category}</div>

                  <div className="text-xl font-bold">
                    {formatCurrency(item.precio)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <>
            <List>
              {listInsumos.map((item, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.nombre} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon
                        onClick={() => deleteIngrediente(item.id, item.nombre)}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={insumo}
                onChange={(e) => setInsumo(e.target.value)}
              >
                <MenuItem value="">
                  <em>Eligir Ingrediente</em>
                </MenuItem>
                {insumos.map((item, i) => (
                  <MenuItem
                    value={`${item.id}|${item.gramos_preparacion}|${item.nombre}`}
                  >
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
              <br></br>
              <Button
                variant="contained"
                color="primary"
                onClick={AddIngrediente}
                className={classes.button}
              >
                Agregar
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <List>
              {listsabor.map((item, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.sabor} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => deleteSabor(item.id)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            {listsabor.length < cantGramaje && (
              <>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sabor}
                  onChange={(e) => setSabor(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Eligir sabor</em>
                  </MenuItem>
                  {sabores.map((item, i) => (
                    <MenuItem value={`${item.id}|${item.sabor.nombre}`}>
                      {item.sabor.nombre}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addSabor}
                  className={classes.button}
                >
                  Agregar
                </Button>
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <List>
              {listadicion.map((item, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.nombre} secondary={item.precio} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon
                        onClick={() => deleteAdicion(item.id, item.precio)}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={adicion}
              onChange={(e) => setAdicion(e.target.value)}
            >
              <MenuItem value="">
                <em>Eligir adicion</em>
              </MenuItem>
              {adiciones.map((item, i) => (
                <MenuItem
                  value={`${item.id}|${item.nombre}|${item.gramos}|${item.precio}`}
                >{`${item.nombre} - ${formatCurrency(item.precio)}`}</MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={addAdicion}
              className={classes.button}
            >
              Agregar
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <div>
              ¿Tipo de orden?
              <br></br>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoOrder}
                onChange={(e) => setTipoOrder(e.target.value)}
              >
                <MenuItem value="1">
                  <em>Mesa</em>
                </MenuItem>
                <MenuItem value="2">
                  <em>Cliente</em>
                </MenuItem>
              </Select>
              <br></br>
              {tipoOrder === 1 ? (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                >
                  <MenuItem value="1">
                    <em>Mesa 1</em>
                  </MenuItem>
                  <MenuItem value="2">
                    <em>Mesa 2</em>
                  </MenuItem>
                </Select>
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Nombre del cliente"
                  variant="outlined"
                  onChange={(e) => setCliente(e.target.value)}
                />
              )}
            </div>
            <br></br>

            <TextField
              id="outlined-multiline-static"
              label="Observacion adicional"
              multiline
              rows={10}
              variant="outlined"
              onChange={(e) => setObs(e.target.value)}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    if (!isProd) {
      const obtenerProductos = async () => {
        const producto = await axios.get(`${api}productos/${id}/`);
        setProductos(producto.data);

        producto.data.map((item, i) => {
          setNomProdu(item.nombre);
          setListInsumos(item.insumos);
          setPrecio(item.precio);
          setGramaje(item.gramos);
          setCantGramaje(item.cantidad_gramos);
          return null;
        });

        const insumos = await axios.get(`${api}insumos/`);
        setInsumos(insumos.data);

        const sabores = await axios.get(`${api}produccion/sabores/`);
        setSabores(sabores.data);

        const adiciones = await axios.get(`${api}productos/adicion/`);
        setAdiciones(adiciones.data);

        if (productos.length > 0) setIsProd(true);
      };
      obtenerProductos();
    }
  }, [isProd, id, productos]);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 4) {
      AddPedido(); // Agregamos toda la orden.
    }
  };

  const AddPedido = async () => {
    // Obtemos la información para compilar el pedido
    let descPedido;
    let ins;
    if (listInsumos.length > 0) {
      // Si existen insumos
      ins = "Ingredientes: ";
      listInsumos.map((data) => {
        ins += data.nombre + ",";
      });
    }
    if (listsabor.length > 0) {
      // Si existen insumos
      ins += "Sabor: ";
      listsabor.map((data) => {
        ins += "(Helado) " + data.sabor;
      });
    }
    if (listadicion.length > 0) {
      // Si existen insumos
      ins += "Adicion(es): ";
      listadicion.map((data) => {
        ins += data.nombre + ",";
      });
    }
    descPedido = ins;

    console.log("Informacion de desc pedido ", descPedido);
    // Crear Orden
    const orden_prod = {
      estado: false,
      cliente_name: cliente,
      producto: parseInt(id),
      asignado_a: null,
      observacion: obs,
      valor: parseInt(precio),
      desc_pedido: descPedido,
      condiciones: condicionales,
      nombre: nomProdu,
      gramaje: gramaje,
    };
    console.log(orden_prod);

    const objetoCarrito = {
      orden: orden_prod,
      insumos: listInsumos,
      sabor: listsabor,
      adicion: listadicion,
    };

    console.log("Información del orden para el carrito: ", objetoCarrito);
    dispatch(AddOrdenesAccion(objetoCarrito));

    // const orden = await axios.post(`${api}pedido/crear/`, orden_prod);

    // // Agregamos los sabores del helado
    // const AddDetallePedido = async (detalle) => {
    //   await axios.post(`${api}pedido/detalle/crear/`, detalle);
    // };

    // const UpGramosProd = async (prod, gramos) => {
    //   const produc_gramos = await axios.get(`${api}produccion/buscar/${prod}/`);
    //   const new_gramos =
    //     parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    //   const objeto = {
    //     gramos: new_gramos,
    //   };

    //   await axios.put(`${api}produccion/update/${prod}/`, objeto);
    //   //console.log("Actualizando gramos: " ,update_gramos.data.gramos)
    // };

    // const UpGramosInsumos_1 = async (prod, gramos) => {
    //   //Buscamos el id de insumo

    //   const produc_gramos = await axios.get(`${api}insumos/buscar/${prod}/`);
    //   const new_gramos =
    //     parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    //   const objeto = {
    //     gramos: new_gramos,
    //   };
    //   await axios.put(`${api}insumos/update/${prod}/`, objeto);
    // };

    // const UpGramosInsumos = async (prod, gramos) => {
    //   //Buscamos el id de insumo

    //   const id_insumo = await axios.get(`${api}productos/${prod}/`);
    //   //console.log("Información del insumo: ", id_insumo.data[0].insumos[0].id)

    //   const produc_gramos = await axios.get(
    //     `${api}insumos/buscar/${id_insumo.data[0].insumos[0].id}/`,
    //   );
    //   const new_gramos =
    //     parseInt(produc_gramos.data[0].gramos) - parseInt(gramos);

    //   const objeto = {
    //     gramos: new_gramos,
    //   };
    //   await axios.put(
    //     `${api}insumos/update/${id_insumo.data[0].insumos[0].id}/`,
    //     objeto,
    //   );
    // };

    // if (listInsumos.length > 0) {
    //   // Si existen insumos

    //   listInsumos.map((data) => {
    //     const detalle_orden_ped = {
    //       pedido: parseInt(orden.data.id),
    //       ingrediente_name: data.nombre,
    //       gramos: parseInt(data.gramos_preparacion),
    //     };
    //     // Agregamos pedido
    //     AddDetallePedido(detalle_orden_ped);
    //     // descotamos los gramos de los insumos
    //     UpGramosInsumos_1(data.id, data.gramos_preparacion);
    //     return null;
    //   });
    // }

    // if (listsabor.length > 0) {
    //   // Si hay sabores elegidos.

    //   //Evaluamos la cantidad de sabores elegidos
    //   const gramos_sabor = gramaje / listsabor.length;

    //   listsabor.map((data) => {
    //     const detalle_orden_ped = {
    //       pedido: parseInt(orden.data.id),
    //       ingrediente_name: "(Helado) " + data.sabor,
    //       gramos: parseInt(gramos_sabor),
    //     };
    //     // Agregamos pedido
    //     AddDetallePedido(detalle_orden_ped);

    //     // descotamos los gramos de los helados
    //     UpGramosProd(data.id_sabor, gramos_sabor);

    //     return null;
    //   });
    // }

    // // Adiciones del usuario

    // if (listadicion.length > 0) {
    //   // Si existen adiciones

    //   listadicion.map((data) => {
    //     const detalle_orden_ped = {
    //       pedido: parseInt(orden.data.id),
    //       ingrediente_name: data.nombre,
    //       gramos: parseInt(data.gramos),
    //       valor: parseInt(data.precio),
    //     };
    //     // Agregamos pedido
    //     AddDetallePedido(detalle_orden_ped);
    //     // descotamos los gramos de los insumos
    //     UpGramosInsumos(data.id_adicion, data.gramos);
    //     return null;
    //   });
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <div>
        <h1>Precio total: {formatCurrency(precio)}</h1>
        <hr></hr>
        <Button
          onClick={() => dispatch(obtenerOrdenesAccion())}
          className={classes.button}
        >
          Obtener
        </Button>
      </div>

      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Volver
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Ordenar"
                        : "Siguiente"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Orden realizada correctamente</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Eliminar orden/reiniciar
            </Button>
          </Paper>
        )}
      </div>
    </>
  );
};

export default OrderForm;
