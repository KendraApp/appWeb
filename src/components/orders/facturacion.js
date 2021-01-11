import React, {useState} from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';


const Facturacion = (props) => {
   const  {seleccion, precio } = props;

   const columnsFactu = [
    {
        name: "id",
        label: "Id",
        options: {
          filter: true,
          sort: true,
          display: true,
        }
    },
    {
     name: "produ",
     label: "Producto",
     options: {
      filter: true,
      sort: true,
     }
    },
    { 
      name: "comple",
      label: "Complemento",
      options: {
       filter: true,
       sort: true,
      }
     },
     { 
      name: "cond",
      label: "Condiciones",
      options: {
       filter: true,
       sort: true,
      }
     },
     { 
      name: "cond",
      label: "Observaciones",
      options: {
       filter: true,
       sort: true,
      }
     },
     { 
      name: "precio",
      label: "Precio",
      options: {
       filter: true,
       sort: true,
      }
     },

  ];

   const optionsFactu = {
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    download: false,
    search: false,
    viewColumns: false,
    filter: false,

    };

    return(
        <>
         <MUIDataTable
            title={"Facturación de órdenes"}
            data={seleccion}
            columns={columnsFactu}
            options={optionsFactu}
          />   
        </>
    )

}

export default Facturacion;