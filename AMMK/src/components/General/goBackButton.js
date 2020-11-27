import React, { Component } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
    Button
  } from "reactstrap";

 const GoBackButton = (props) => {
    const {
      pathname,
      path,
    } = props;
  

    return (
        <div>
        <Link to={path}>
            <Button type="button" style={{float: 'right'}} outline className="" id="goBack">Regresar a {pathname}</Button>
        </Link>
        </div>
    );
}

export default GoBackButton;