
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Person from '@material-ui/icons/Person'
import DashboardPage from "views/Dashboard/Dashboard.js";
import BicycleParkings from "views/BicycleParkings/BicycleParkings.js";
import History from "views/History/history.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import Login from "views/Login/Login.js"
import HomeIcon from '@material-ui/icons/Home';

const dashboardRoutes = [
  {
    path: "/user",
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
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;