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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "views/Cuentas/Login";
import AdminLayout from "layouts/Admin/Admin.js";
import General from "layouts/Admin/General.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/black-dashboard-react.css";
import "assets/css/nucleo-icons.css";

export const API_BASE_URL = window.api_path;
//export const API_BASE_URL = 'http://localhost:8000/api/';
export const FRONT_BASE_URL = 0;
export const IMAGE_URL = 'http://api.gestionammk.com/public/';
const hist = createBrowserHistory();

function activateWhite() {
  document.body.classList.add("white-content");
}

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} history= {hist}/>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/general" render={props => <General {...props} />} />
      
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root"),
  document.body.classList.add("white-content")
);
