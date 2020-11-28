import React, { useState } from 'react';
import { API_BASE_URL } from '../../index';
import { Button } from 'reactstrap';
//API calls
import axios from 'axios';

const DropdownRecordExpenses = (props) => {
    var idT = props.id;
    var idTable = "exp"+props.id;
    var idDiv = "exp"+idT + idT;
    getTable(idT,idTable);
  return (
    <div >
      <Button onClick={() => handleClick(idDiv)}>
        {idT}
      </Button>
      <div id={idDiv} style={{display: "none"}} >
      <div id={idTable} style={ { maxHeight: '300px', overflowY:'auto' } }>

      </div>
      </div>
    </div>
  );
}

function getTable(id,idTable){
  axios.get(API_BASE_URL + 'expenses/table/date/'+id)
      .then(res => {
          console.log(res.data);
        if(document.getElementById(idTable) != null){
          document.getElementById(idTable).innerHTML=res.data;
        }
      })
}

function handleClick(id){
  var divTable = document.getElementById(id);
  if (divTable.style.display === "none") {
    divTable.style.display = "block";
  } else {
    divTable.style.display = "none";
  }
}

export default DropdownRecordExpenses;