/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import RE2 from "views/RE2";
import RE3 from "views/RE3";
import Rtl from "views/Rtl.js";
import Facturacion from "views/Facturacion";

import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Ejemplos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Beneficiarias",
    rtlName: "إخطارات",
    icon: "tim-icons icon-single-02",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Empleados",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/donantes",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-single-02",
    component: Facturacion,
    layout: "/admin"
  },
  
  {
    path: "/typography",
    name: "Finanzas",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Reportes",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/RE2",
    name: "Registro Empleado parte 2",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RE2,
    layout: "/admin"
  },
  {
    path: "/RE3",
    name: "Registro Empleado parte 3",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RE3,
    layout: "/admin"
  },
  
  
  // SE BORRARÁ UNA VEZ QUE TODOS ENTIENDAN EL CONCEPTO DE RTL SUPPORT
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }
];
export default routes;
