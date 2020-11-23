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
// import Facturacion from "views/Facturacion";

import GeneralIndex from "views/General/GeneralIndex.js";
import NurseIndex from "views/General/NurseIndex.js";
import Nomina from "views/Nomina/Nomina.js";


import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import RegisterEmployee from "views/Employees/RE.js";
import ModifyEmployee from "views/Employees/ModifyE1.js";
import RegisterEmployee2 from "views/Employees/RE2emp.js";
import ModifyEmployee2 from "views/Employees/ModifyE2mp.js";
import RegisterEmployee3 from "views/Employees/RE3.js";
import ModifyEmployee3 from "views/Employees/ModifyE3.js";
import ViewEmployee from "views/Employees/ViewEmployee.js";
import SearchEmployee from "views/Employees/SearchEmployee.js";
import EmployeeCalendar from "views/Employees/EmployeeCalendar.js";

//Cuentas
import MainAccount from "views/Cuentas/MainAccounts";
import ModifyPersonalAc from "views/Cuentas/ModifyPersonalAccount";
import ModifyAccountEmp from "views/Cuentas/ModifyAccountEmployee";
import CreateAccEmp from "views/Cuentas/CreateAccountEmployee";
import EmployeesAccountView from "views/Cuentas/EmployeesAccountsView";
import DeleteAccountEmployee from "views/Cuentas/DeleteAccountEmployee";

//BENEFICIARIAS
import RegisterB1 from "views/Beneficiarias/RegisterB1.js";
import RegisterB2 from "views/Beneficiarias/RegisterB2.js";
import RegisterB3 from "views/Beneficiarias/RegisterB3.js";
import RegisterTreatment from "views/Beneficiarias/RegisterTreatment.js";
import GeneralViewAdmin from "views/Beneficiarias/GeneralViewAdmin.js";
import GeneralViewNurse from "views/Beneficiarias/GeneralViewNurse.js";
import SpecificView from "views/Beneficiarias/SpecificView.js";
import MedicalRecordView from "views/Beneficiarias/MedicalRecordView";
import RegisterMedApp from "views/Beneficiarias/RegisterMedApp";
import ModifyMedApp from "views/Beneficiarias/ModifyMedApp";
import ModifyPersonal from "views/Beneficiarias/ModifyPersonal";
import ModifyEntry from "views/Beneficiarias/ModifyEntry";
//modals
import TakeOutB from "views/Beneficiarias/TakeOutB";
import ReenterB from "views/Beneficiarias/ReenterB";
import ModifyTreatment from "views/Beneficiarias/ModifyTreatment";
import ViewMedApp from "views/Beneficiarias/ViewMedApp";
//FIN BENEFICIARIAS

//DONANTES
import RDonantePatronato from "./views/Donors/RDonantePatronato"
import Facturacion from "./views/Donors/Facturacion"
import GeneralDonantes from "./views/Donors/GeneralDonantes"
import ViewDonors from "views/Donors/ViewDonors.js";
import ViewSpecificDonor from "views/Donors/ViewSpecificDonor";
import RegisterDonation from "views/Donors/RegisterDonation";
import RegisterDonorContact from "views/Donors/RegisterDonorContact";
import EliminarDonacion from "views/Donors/EliminarDonacion";
import EliminarContacto from "views/Donors/EliminarContacto";
import ModifyDonation from "views/Donors/ModifyDonation";
import ModifyDonorContact from "views/Donors/ModifyDonorContact";
import ModificarDGenerales from "views/Donors/ModificarDGenerales";
import ModificarDF from "views/Donors/ModificarDF";
import TakeOutD from "views/Donors/TakeOutD";
import ReenterD from "views/Donors/ReenterD";
import Email from "views/Donors/Email";




//FINANZAS
import MonthlyView from "views/Finanzas/MonthlyView.js";
import RegisterExpense from "views/Finanzas/RegisterExpense.js";
import Record from "views/Finanzas/Record.js";
//FIN FINANZAS

//REPORTES
import Reports from "views/Reports/Reports.js";
//FIN REPORTES

// const login = localStorage.getItem("isLoggedIn");

//     //Redirect in case of wrong role or no login
//     if(idRol==2){
//         window.location = "http://localhost:3000/general/NurseIndex";
//     }else if (idRol==1){
//         window.location = "http://localhost:3000/admin/Nomina/Nomina";
//     }



var routes = [
  {
    path: "/dashboard",
    name: "Ejemplos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  //Start Cuentas
  {
    path: "/Cuentas/principal",
    name: "Cuentas",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-settings",
    component: MainAccount,
    layout: "/admin",
    showInSidebar: true ,
    rol: 'admin'
  },
  {
    path: "/Cuentas/CuentaPersonal/",
    name: "Cuenta Personal",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyPersonalAc,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/Cuentas/CrearCuentaEmp",
    name: "Crear cuenta empleado",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: CreateAccEmp,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/Cuentas/ModCuentaEmp/:id",
    name: "Modificar Cuenta Empleado",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyAccountEmp,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/Cuentas/DelCuentaEmp/:id",
    name: "Eliminar Cuenta Empleado",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: DeleteAccountEmployee,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/Cuentas/PrincipalEmp",
    name: "Cuentas Empleado",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: EmployeesAccountView,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  //End Cuentas
  {
    path: "/GeneralIndex",
    name: "panel de administrador",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: GeneralIndex,
    layout: "/general",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/NurseIndex",
    name: "panel de enfermera",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: NurseIndex,
    layout: "/general",
    showInSidebar: false,
    rol: 'employee'
  },
  /*  START BENEFICIARIAS */
  {
    path: "/Beneficiarias/GeneralViewAdmin",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: GeneralViewAdmin,
    layout: "/admin",
    showInSidebar: true,
    rol: 'admin'
  },
  {
    path: "/Beneficiarias/GeneralViewNurse",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: GeneralViewNurse,
    layout: "/admin",
    showInSidebar: true,
    rol: 'enf',
    onlyGen: false
  },
  {
    path: "/Beneficiarias/SpecificView/:id",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: SpecificView,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/TakeOutB/:id",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: TakeOutB,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/ReenterB/:id",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ReenterB,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/ModifyTreatment/:id",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ModifyTreatment,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/ViewMedApp/:id",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: ViewMedApp,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/MedicalRecordView/:id",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: MedicalRecordView,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/RegisterTreatment/:id",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterTreatment,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/RegisterMedApp/:id",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterMedApp,
    layout: "/admin",
    showInSidebar: false,

  },
  {
    path: "/Beneficiarias/ModifyMedApp/:id",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: ModifyMedApp,
    layout: "/admin",
    showInSidebar: false,

  },
  {
    path: "/Beneficiarias/RegisterB1",
    name: "Beneficiarias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: RegisterB1,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/RegisterB2",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterB2,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/RegisterB3",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterB3,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/Beneficiarias/ModifyPersonal",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: ModifyPersonal,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Beneficiarias/ModifyEntry",
    name: "Beneficiarias",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: ModifyEntry,
    layout: "/admin",
    showInSidebar: false
  },
  /* END BENEFICIARIAS */
  /*  START EMPLOYEES */
  {
    path: "/search-employee",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-badge",
    component: SearchEmployee,
    layout: "/admin",
    showInSidebar: true,
    rol: 'admin'
  },
  {
    path: "/register-employee",
    name: "Empleados",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-badge",
    component: RegisterEmployee,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/RE2",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterEmployee2,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/RE3",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterEmployee3,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/view-employee/:id",
    name: "Empleados",
    icon: "tim-icons icon-single-02",
    component: ViewEmployee,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/ModifyE1/:id",
    name: "Empleados",
    icon: "tim-icons icon-single-02",
    component: ModifyEmployee,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/ModifyE2/:id",
    name: "Empleados",
    icon: "tim-icons icon-single-02",
    component: ModifyEmployee2,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/ModifyE3/:id",
    name: "Empleados",
    icon: "tim-icons icon-single-02",
    component: ModifyEmployee3,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  {
    path: "/employee-calendar",
    name: "Empleados",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: EmployeeCalendar,
    layout: "/admin",
    showInSidebar: false,
    rol: 'employee'
  },
  /*  END EMPLOYEES */

  /*DONANTES*/
 
  {
    path: "/ViewDonors",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ViewDonors,
    layout: "/admin",
    showInSidebar: true,
    rol: 'admin'
  },
  {
    path: "/EliminarDonacion/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: EliminarDonacion,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/egresarDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: TakeOutD,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/re-ingresarDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ReenterD,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/EliminarContactoDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: EliminarContacto,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/ModificarDonacion/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ModifyDonation,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/ModificarDFacturacion/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ModificarDF,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/ModificarContactoDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ModifyDonorContact,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/ModificarGeneralDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ModificarDGenerales,
    layout: "/admin",
    showInSidebar: false
  },
  {

    path: "/RegistroDonante1",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: RDonantePatronato,
    layout: "/admin",
    showInSidebar: false
  },
  {

    path: "/Email",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: Email,
    layout: "/admin",
    showInSidebar: false
  },
  
  {
    path: "/donacion/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: RegisterDonation,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/contactoDonante/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: RegisterDonorContact,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/ViewSpecificDonor/:id",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: ViewSpecificDonor,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Facturacion",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: Facturacion,
    layout: "/admin",
    showInSidebar: false
  },

  {
    path: "/GeneralRegistroD",
    name: "Donantes",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-heart-2",
    component: GeneralDonantes,
    layout: "/admin",
    showInSidebar: false
  },

 

      /*END DONANTES*/
  //STARTS FINANZAS
  {
    path: "/Finanzas/RegisterExpense",
    name: "Finanzas",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: RegisterExpense,
    layout: "/admin",
    showInSidebar: false
  },
  {
    path: "/Finanzas/MonthlyView",
    name: "Finanzas",
    rtlName: "طباعة",
    icon: "tim-icons icon-money-coins",
    component: MonthlyView,
    layout: "/admin",
    showInSidebar: true,
    rol: 'admin'
  },
  {
    path: "/Finanzas/Record",
    name: "Finanzas",
    rtlName: "طباعة",
    icon: "tim-icons icon-single-02",
    component: Record,
    layout: "/admin",
    showInSidebar: false
  },
  //ENDS FINANZAS
  {
    path: "/Nomina/Nomina",
    name: "Nomina",
    rtlName: "طباعة",
    icon: "tim-icons icon-chart-bar-32",
    component: Nomina,
    layout: "/admin",
    showInSidebar: true,
    rol: 'enf',
    onlyGen: true
  },
  {
    path: "/Reportes",
    name: "Reportes",
    rtlName: "طباعة",
    icon: "tim-icons icon-chart-bar-32",
    component: Reports,
    layout: "/admin",
    showInSidebar: true,
    rol: 'admin'
  },



  



  // SE BORRARÁ UNA VEZ QUE TODOS ENTIENDAN EL CONCEPTO DE RTL SUPPORT
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl",
    showInSidebar: false
  }
];
export default routes;
