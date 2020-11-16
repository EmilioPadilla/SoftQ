

class EstatusDropdown extends Component {
    crearSelectTipoDonante(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get("http://localhost:8000/api/tipodonante/").then(function(resp){
          
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
          //console.log(element.nombre);
        });
        document.getElementById("selectTipoDonante").innerHTML=sel; 
      });
      }
    
    render() { 
        return ( 
            <Form onClick={this.onSubmit}>
            <FormGroup>
             <label>*Seleccione Tipo de Donante:</label>
             <Form.Control as="select" id="selectTipoDonante" required></Form.Control>
           </FormGroup>
           </Form>


         );
    }
}
 
export default EstatusDropdown;