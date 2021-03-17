// import axios from "axios";

// Constantes

const dataInicial = [];

const OBTENER_ORDENES_EXITO = "OBTENER_ORDENES_EXITO";
const ADD_ORDEN = "ADD_ORDEN";
const DELETE_ORDEN = "DELETE_ORDEN";
const VACIAR_ORDEN = "VACIAR_ORDEN";

// Reducer
export default function ordenesReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_ORDENES_EXITO:
      return state;
    case ADD_ORDEN:
      return [...state, action.payload];
    case VACIAR_ORDEN:
      return [];
    case DELETE_ORDEN:
      const filtro = state.map((data) => data.id !== action.payload);
      return [filtro];
    default:
      return state;
  }
}

// Acciones

export const obtenerOrdenesAccion = () => (dispatch, getState) => {
  dispatch({
    type: OBTENER_ORDENES_EXITO,
  });
};

export const AddOrdenesAccion = (data) => (dispatch, getState) => {
  dispatch({
    type: ADD_ORDEN,
    payload: data,
  });
};

export const DeleteOrdenesAccion = (data) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ORDEN,
    payload: data,
  });
};

export const VaciarOrdenesAccion = () => (dispatch, getState) => {
  dispatch({
    type: VACIAR_ORDEN,
  });
};
