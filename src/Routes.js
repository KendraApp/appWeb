import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/index";
import Dashboard from "./pages/dashboard";
// import DefaultForms from './pages/default-forms'
// import DefaultTables from './pages/default-tables'
import ForgotPassword from "./pages/forgot-password";
// import Lists from './pages/lists'
// import LockScreen from './pages/lock-screen'
import Login3 from "./pages/login-3";
import Logout from "./pages/logout";
// import Validation from './pages/validation'
// import SampleForms from './pages/sample-forms'
// import Landing from './pages/landing'
import OrdersAll from "./pages/ordersAll";
import OrdersCocina from "./pages/ordersCocina";
import OrdersDone from "./pages/ordersDone";
import Ecommerce from "./pages/e-commerce";
import Ordenar from "./pages/ordenar";
import ShopInsumos from "./pages/Produccion/Insumos/ShopInsumos";
import Insumos from "./pages/Produccion/Insumos/Insumos";
import ShoppingCart from "./pages/Pedidos/ShoppinCart";
import Producir from "./pages/Produccion/Productos/Producir";
import PrintFactu from "./pages/Facturacion/Print";
// import Account from "./pages/Account";

const Routes = () => {
  return (
    <Switch>
      <Route path="/e-commerce">
        <Ecommerce />
      </Route>
      <Route exact path="/producir">
        <Producir />
      </Route>
      <Route exact path="/ShopingCart">
        <ShoppingCart />
      </Route>
      <Route exact path="/ordenes/All">
        <OrdersAll />
      </Route>
      <Route exact path="/ordenes/cocina">
        <OrdersCocina />
      </Route>
      <Route exact path="/ordenes/done">
        <OrdersDone />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/login-3">
        <Login3 />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/facturacion/print">
        <PrintFactu />
      </Route>
      <Route path="/ordenar/:id">
        <Ordenar />
      </Route>
      <Route exact path="/">
        <Login3 />
      </Route>
      <Route component={Index} />
    </Switch>
  );
};
export default Routes;
