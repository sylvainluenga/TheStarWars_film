import Main from "./searchBar";
import ViewSearch from "./viewSearch";



const Pages = [
  {
    path: "/",
    exact: true,
    component: Main,
  },
  {
    path: "/viewSearch",
    exact: true,
    component: ViewSearch,
  }
];

export default Pages;
