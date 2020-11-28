
import Dashboard from "@material-ui/icons/Dashboard";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Person from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home';
import DashboardPage from "views/Dashboard/Dashboard.js";
import BicycleParkings from "views/BicycleParkings/BicycleParkings.js";
import History from "views/History/history.js";
import Login from "views/Login/Login.js"
import Users from "views/UserProfile/UserProfile.js"
import AuthorizationStays from "views/AuthorizationStays/AuthorizationStays.js"
import DataUsageIcon from '@material-ui/icons/DataUsage';
import ReportsNavigation from 'views/Reports/SimpleBottomNavigation.js'
import PanelControlWebEstadias from 'views/PanelControl/CleanOldEstadias.js'


const dashboardRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: Login,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Estadias",
    icon: DirectionsBike,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/authorizationStays",
    name: "Autorizaciones",
    icon: DirectionsBike,
    component: AuthorizationStays,
    layout: "/admin"
  },
  {
    path: "/bicycleParkings",
    name: "Bicicleteros",
    icon: Dashboard,
    component: BicycleParkings,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Historial",
    icon: "content_paste",
    component: History,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Usuarios",
    icon: Person,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/SimpleBottomNavigation",
    name: "Reportes",
    icon: DataUsageIcon,
    component: ReportsNavigation,
    layout: "/admin"
  },
  {
    path: "/PanelControlWebEstadias",
    name: "PanelControl",
    icon: DataUsageIcon,
    component: PanelControlWebEstadias,
    layout: "/admin"
  },

];

export default dashboardRoutes;