
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Person from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home';
import DashboardPage from "views/Dashboard/Dashboard.js";
import BicycleParkings from "views/BicycleParkings/BicycleParkings.js";
import History from "views/History/history.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import Login from "views/Login/Login.js"
import Users from "views/UserProfile/UserProfile.js"
import AuthorizationStays from "views/AuthorizationStays/AuthorizationStays.js"
import Reports from "views/Reports/StadiaStatistics.js"
import DataUsageIcon from '@material-ui/icons/DataUsage';

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
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  {
    path: "/users",
    name: "Usuarios",
    icon: Person,
    component: Users,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Reportes",
    icon: DataUsageIcon,
    component: Reports,
    layout: "/admin"
  },
];

export default dashboardRoutes;