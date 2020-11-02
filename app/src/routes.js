
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Notifications from "@material-ui/icons/Notifications";
import DirectionsBike from '@material-ui/icons/DirectionsBike';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import BicycleParkings from "views/BicycleParkings/BicycleParkings.js";
import History from "views/History/history.js";
import NotificationsPage from "views/Notifications/Notifications.js";
// core components/views for RTL layout

const dashboardRoutes = [
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
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
];

export default dashboardRoutes;