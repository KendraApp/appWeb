import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { api } from "../../../functions/db";
import Notification from "../../notifications";
import { FiAlertCircle } from "react-icons/fi";
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
  return ["Seleccione Producto", "Total Producido"];
}

const ProducirForm = () => {
  let history = useHistory();

  // const [listInsumos, setListInsumos] = useState([]); // Lista de insumos del producto

  // Elección de adiciones

  // const [listadicion, setListadicion] = useState([]); //Adicones elegidos por el usuario.

  /// ProducirForm

  // const [gramosInsumo, setGramosInsumo] = useState(); //Gramos del insumos elegido.
  // const [gramosAdicion, setGramosAdicion] = useState(); //Gramos del adicion producto relacionado
  const [gramosUsu, setGramosUsu] = useState();
  // const [gramosTotal, setGramosTotal] = useState();

  // Información para el cambio de modelo
  const [open, setOpen] = useState(false);
  const [typeNoti, setTypeNoti] = useState();
  const [msg, setMsg] = useState();

  const [isProduc, setIsProduc] = useState(false);
  const [produc, setProduc] = useState([]); //Listado de producto
  const [producUsu, setProducUsu] = useState(); //Producto elegido por el usuario

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [produccion, setProduccion] = useState({
    producto: 0,
    cantidad: 0,
    gramos: 0,
    total_gramos: 0,
  });

  const [insumos, setInsumos] = useState([]); //Lista de insumos del producto
  const [adiciones, setAdiciones] = useState([]); // Lista de adiciones (Producto relacionado)
  const [isExceso, setIsExceso] = useState();

  useEffect(() => {
    const ObtenerProductos = async () => {
      const datos = await axios.get(`${api}produccion/`);

      if (datos.data.length > 0) {
        setProduc(datos.data);
        setIsProduc(true);
      }
    };

    if (!isProduc) ObtenerProductos();

    if (open) {
      const interval = setInterval(() => {
        setOpen(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isProduc, open]);

  const obtenerInfoBase = async (base) => {
    const datosdeBase = await axios.get(
      `${api}produccion/bases/detalle/?base=${base}&isprod=false`,
    );
    if (datosdeBase.data.length > 0) {
      setInsumos(datosdeBase.data);
    }
    // Consultamos los productos de la base del producto
    const datosdeBase2 = await axios.get(
      `${api}produccion/bases/detalle/?base=${base}&isprod=true`,
    );

    if (datosdeBase2.data.length > 0) {
      setAdiciones(datosdeBase2.data);
    }
  };

  const ValidatorsProduccion = (total_gramos) => {
    let productos = "";
    if (insumos.length > 0) {
      insumos.map((dt) => {
        // calculmnos cuantos gramos necesita éste insumo
        const gramos_ins =
          (parseInt(total_gramos) * parseInt(dt.porcentaje)) / 100;
        if (gramos_ins > dt.insumo.gramos) {
          productos += dt.insumo.nombre + ",";
        }
      });
    }
    if (adiciones.length > 0) {
      adiciones.map((dt) => {
        const gramos_ins =
          (parseInt(total_gramos) * parseInt(dt.porcentaje)) / 100;

        if (gramos_ins > dt.producto.gramos) {
          productos +=
            dt.producto.nombre + " de " + dt.producto.sabor.nombre + ",";
        }
      });
    }
    // Actualizamos el valor si tiene o no productos sin existencia
    setIsExceso(productos);
    if (productos) {
      setOpen(true);
      setTypeNoti("bg-red-500 text-white");
      setMsg("Éste producto no se puede producir, no hay existencias");
    } else {
      setOpen(true);
      setTypeNoti("bg-green-500 text-white");
      setMsg(
        "Éste producto puede producirse, haga clic en 'Registrar producción' ",
      );
    }
  };

  const handleProduccion = () => {
    let total_produccion =
      parseInt(produccion.cantidad) * parseInt(produccion.gramos);
    setProduccion({
      ...produccion,
      total_gramos: total_produccion,
    });

    ValidatorsProduccion(total_produccion);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 1) {
      console.log("Ingresó aquí");
      // Agregamos toda la orden.
      if (!isExceso) AddPedido();
      else {
        setOpen(true);
        setTypeNoti("bg-red-500 text-white");
        setMsg("Éste producto no se puede producir, corrobore las existencias");
      }
    }
  };

  // Agregar detalle a producción
  const AddProduccion = async (detalle) => {
    const add = await axios.post(`${api}produccion/add/`, detalle);
    console.log(add);
  };

  const UpGramosInsumos_1 = async (id, gramosProd, gramosCons) => {
    //const produc_gramos = await axios.get(`${api}insumos/buscar/${prod}/`);
    const new_gramos = parseInt(gramosProd) - parseInt(gramosCons);

    const objeto = {
      gramos: new_gramos,
    };
    // console.log("nuevos gramos del insumo: ", objeto);
    await axios.put(`${api}insumos/update/${id}/`, objeto);
    // console.log(update);
  };

  const UpGramosInsumos_2 = async (id, gramosProd, gramosCons) => {
    //const produc_gramos = await axios.get(`${api}insumos/buscar/${prod}/`);
    const new_gramos = parseInt(gramosProd) - parseInt(gramosCons);

    const objeto = {
      gramos: new_gramos,
    };
    // console.log("nuevos gramos del insumo: ", objeto);
    await axios.put(`${api}produccion/update/${id}/`, objeto);
    // console.log(update);
  };

  const ConsumoProduccion = async (id, gramos) => {
    const objeto = {
      producto: parseInt(id),
      gramos: parseInt(gramos),
    };
    await axios.post(`${api}produccion/consumo/add/`, objeto);
  };

  const ConsumoInsumo = async (id, gramos) => {
    const objeto = {
      insumo: parseInt(id),
      gramos: parseInt(gramos),
    };
    await axios.post(`${api}insumos/consumo/add/`, objeto);
  };

  const AddPedido = async () => {
    if (producUsu) {
      console.log(insumos);
      if (insumos.length > 0) {
        insumos.map((data) => {
          const gramos_ins =
            (parseInt(produccion.total_gramos) * parseInt(data.porcentaje)) /
            100;
          const objeto = {
            producto: parseInt(producUsu),
            insumos: parseInt(data.insumo.id),
            gramos: parseInt(gramos_ins),
          };
          console.log("Insumo: ", objeto);
          AddProduccion(objeto);
          // Desconectamos
          UpGramosInsumos_1(data.insumo.id, data.insumo.gramos, gramos_ins);

          //Agregamos el consumo
          ConsumoInsumo(data.insumo.id, gramos_ins);
        });
      }
      if (adiciones.length > 0) {
        adiciones.map((data) => {
          const gramos_ins =
            (parseInt(produccion.total_gramos) * parseInt(data.porcentaje)) /
            100;
          const objeto = {
            producto: parseInt(producUsu),
            gramos: parseInt(gramos_ins),
            producto_rela: parseInt(data.producto.id),
          };
          console.log("info de adicion", objeto);
          AddProduccion(objeto);
          //Desconectamos

          UpGramosInsumos_2(data.producto.id, data.producto.gramos, gramos_ins);
          ConsumoProduccion(data.producto.id, gramos_ins);
          // Agregamos el producto consumido
        });
      }

      // Agregamos los gramos producidos al stock
      const new_gramos =
        parseInt(gramosUsu) + parseInt(produccion.total_gramos);
      const objeto = {
        gramos: parseInt(new_gramos),
      };
      console.log("Nuevos gramos, ", new_gramos);
      await axios.put(`${api}produccion/update/${producUsu}/`, objeto);
      // Agregamos los gramos producidos en la fecha
      await axios.post(`${api}produccion/create/`, produccion);
      setOpen(true);
      setTypeNoti("bg-green-500 text-white");
      setMsg("Producción registrada correctamente");
    } else {
      setOpen(true);
      setTypeNoti("bg-red-500 text-white");
      setMsg("Debe seleccionar el producto a producir");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    history.go("/producir");
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={producUsu}
              onChange={(e) => {
                let separar = e.target.value.split("|");

                setProducUsu(separar[0]);
                setGramosUsu(separar[1]);
                obtenerInfoBase(separar[2]);
                setProduccion({ ...produccion, producto: separar[0] });
              }}
            >
              <MenuItem value="">
                <em>Eligir Producto</em>
              </MenuItem>
              {produc.map((item, i) => (
                <MenuItem value={`${item.id}|${item.gramos}|${item.base}`}>
                  {item.nombre} - {item.sabor.nombre} - Gramos: {item.gramos}
                </MenuItem>
              ))}
            </Select>
            <br></br>
          </div>
        );

      case 1:
        return (
          <>
            <TextField
              id="outlined-basic"
              label="Cantidad producida"
              type="number"
              onChange={(e) =>
                setProduccion({ ...produccion, cantidad: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Gramos por unidad"
              name="fecha"
              type="number"
              onChange={(e) =>
                setProduccion({ ...produccion, gramos: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Total producido"
              name="fecha"
              type="number"
              value={produccion.total_gramos}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
              }}
            />
            <br></br>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleProduccion}
              className={classes.button}
            >
              Validar
            </Button>
            <br></br>
            {isExceso && (
              <div>
                Productos con existencias insuficientes <br></br>
                <b>{isExceso}</b>
              </div>
            )}
          </>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <>
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
                        ? !isExceso && "Registar Producción"
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
            <Typography>Producción realizada correctamente</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Producir otro
            </Button>
          </Paper>
        )}
      </div>
      {open && (
        <Notification
          btnClassNames="btn btn-default btn-rounded"
          outerClassNames="z-50 transform fixed top-0 right-0 h-auto w-96 p-4"
          innerClassNames={typeNoti}
          animation="animate__animated animate__backInRight"
          icon={<FiAlertCircle className="mr-2 stroke-current h-4 w-4" />}
          content={msg}
        />
      )}
    </>
  );
};

export default ProducirForm;
