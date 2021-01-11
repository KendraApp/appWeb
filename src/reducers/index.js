import { combineReducers } from "redux";
import config from "./config";
import leftSidebar from "./left-sidebar";
import palettes from "./palettes";
import navigation from "./navigation";
import orderDucks from "./orderDucks";

const rootReducer = combineReducers({
  navigation,
  config,
  leftSidebar,
  palettes,
  orderDucks,
});

export default rootReducer;
