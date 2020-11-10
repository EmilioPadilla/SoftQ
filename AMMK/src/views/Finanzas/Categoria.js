import React from 'react'
import axios from 'axios';
import $ from 'jquery'

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let nota = $("#nota").val()
     axios.post('http://localhost:8000/notas', {
       nota: nota,
     })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }
    return (
      <div className="container">
        <h1>Registrar Nota</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="nota" className="form-control" id="nota" onChange={this.handleChange} placeholder="Nota" />
          </label>
          <input type="submit" value="Registrar" className="btn btn-info" />
        </form>
      </div>
    );
  }
}

export default PostForm