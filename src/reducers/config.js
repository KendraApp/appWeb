export default function config(
  state = {
    name: "Kendra",
    description: "Kendra App",
    url: "https://kendra.co",
    layout: "layout-1",
    collapsed: true,
    rightSidebar: false,
    backdrop: true,
  },
  action,
) {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        ...action.config,
      };
    case "SET_CONFIG_KEY":
      let { key, value } = { ...action };
      return {
        ...state,
        [`${key}`]: value,
      };
    default:
      return state;
  }
}
