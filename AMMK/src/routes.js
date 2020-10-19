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
//import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
//import Facturacion from "views/Facturacion";

import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import RegisterEmployee from "views/RE.js";
import RegisterEmployee2 from "views/RE2.js";
import RegisterEmployee3 from "views/RE3.js";
import ViewEmployee from "views/ViewEmployee.js";
import EmployeeCalendar from "views/EmployeeCalendar.js";

//Cuentas
import MainAccount from "views/Cuentas/MainAccounts";
import ModifyPersonalAc from "views/Cuentas/ModifyPersonalAccount";
import ModifyAccountEmp from "views/Cuentas/ModifyAccountEmployee";

//BENEFICIARIAS
import RegisterB1 from "views/Beneficiarias/RegisterB1.js";
import RegisterB2 from "views/Beneficiarias/RegisterB2.js";
import RegisterB3 from "views/Beneficiarias/RegisterB3.js";
import RegisterTreatment from "views/Beneficiarias/RegisterTreatment.js";
import GeneralViewAdmin from "views/Beneficiarias/GeneralViewAdmin.js";
import SpecificView from "views/Beneficiarias/SpecificView.js";
//import GeneralViewNurse from "views/Beneficiarias/GeneralViewNurse.js";
import MedicalRecordView from "views/Beneficiarias/MedicalRecordView";
import RegisterMedApp from "views/Beneficiarias/RegisterMedApp";
import ModifyMedApp from "views/Beneficiarias/ModifyMedApp";
//modals
import TakeOutB from "views/Beneficiarias/TakeOutB";
import ReenterB from "views/Beneficiarias/ReenterB";
import ModifyTreatment from "views/Beneficiarias/ModifyTreatment";
import ViewMedApp from "views/Beneficiarias/ViewMedApp";
//FIN BENEFICIARIAS


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
  //Star Cuentas
  {
    path: "/Cuentas/principal",
    name: "Principal Cuentas",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: MainAccount,
    layout: "/admin",
    showInSidebar: true
  },

  {
    path: "/Cuentas/CuentaPersonal",
    name: "Cuenta Personal",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyPersonalAc,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Cuentas/ModCuentaEmp",
    name: "Modificar Cuenta Empleado",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyAccountEmp,
    layout: "/admin",
    showInSidebar: false
  },
  /*  START BENEFICIARIAS */
  {
    path: "/Beneficiarias/GeneralViewAdmin",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: GeneralViewAdmin,
    layout: "/admin",
    showInSidebar: true
  },
  /*{
    path: "/Beneficiarias/GeneralViewNurse",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: GeneralViewNurse,
    layout: "/admin",
    showInSidebar: true
  },*/
  {
    path: "/Beneficiarias/SpecificView",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: SpecificView,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/TakeOutB",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: TakeOutB,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/ReenterB",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ReenterB,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/ModifyTreatment",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyTreatment,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/ViewMedApp",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ViewMedApp,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/MedicalRecordView",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: MedicalRecordView,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/RegisterTreatment",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterTreatment,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/RegisterMedApp",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterMedApp,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/ModifyMedApp",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: ModifyMedApp,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/RegisterB1",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: RegisterB1,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/RegisterB2",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterB2,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/RegisterB3",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterB3,
    layout: "/admin",
    showInSidebar: false
  },
  /* END BENEFICIARIAS */
  {
    path: "/user-profile",
  },
  {
    path: "/view-employee",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-badge",
    component: ViewEmployee,
    layout: "/admin",
    showInSidebar: true
  },
  {
    path: "/register-employee",
    name: "Empleados",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-badge",
    component: RegisterEmployee,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/donantes",
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
    component: RegisterEmployee2,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/RE3",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterEmployee3,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/employee-calendar",
    name: "Empleados",
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
