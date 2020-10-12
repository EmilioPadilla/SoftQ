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
import Rtl from "views/Rtl.js";
import RE3 from "views/RE3.js";
import RE2 from "views/RE2.js";

import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/RE.js";
import EmployeeCalendar from "views/EmployeeCalendar.js";

var routes = [
  {
    path: "/dashboard",
    name: "Ejemplos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/notifications",
    name: "Beneficiarias",
    rtlName: "إخطارات",
    icon: "tim-icons icon-single-02",
    component: Notifications,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/user-profile",
    name: "Empleados",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-badge",
    component: UserProfile,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/tables",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-single-02",
    component: TableList,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/tables",
    name: "Prueba",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-single-02",
    component: TableList,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/typography",
    name: "Finanzas",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: Typography,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/typography",
    name: "Reportes",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: Typography,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/RE2",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RE2,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/RE3",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RE3,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/employee-calendar",
    name: "Calendario Empleado",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: EmployeeCalendar,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/employee-calendar",
    name: "Calendario Empleado",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: EmployeeCalendar,
    layout: "/admin",
    showInSidebar: false
  },



  // SE BORRARÁ UNA VEZ QUE TODOS ENTIENDAN EL CONCEPTO DE RTL SUPPORT
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl",
    showInSidebar: true
  }
];
export default routes;
