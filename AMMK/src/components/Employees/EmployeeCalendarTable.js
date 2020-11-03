import React from "react";
import axios from 'axios';

import {Table, Input, FormGroup, Label} from "reactstrap";

class EmployeeCalendarTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.state = {
            employeeId: props.employeeId,
            markedDays: [],
        }
    }

    parseMarkedDays(empShifts) {
        return empShifts.map((shift) => {
            return {
                label: shift.diaSemana + "-" + shift.nombre,
                diaSemana: shift.diaSemana,
                nombreTurno: shift.nombre
            };
        });
        
    }

    componentDidMount() {
        if (this.props.employeeId) {
            this.getShifts();
        }
    }

    getShifts() {
        var params = {
            //TODO Pasar id de empleado correcto
            idEmployees: 1
        }
        axios.post('http://localhost:8000/api/employeesShifts/search', params)
        .then(res => this.setState({ markedDays: this.parseMarkedDays(res.data) }));
    }

    handleCheck(value) {
        return this.state.markedDays.some(item => value === item.label);
    }

    handleChange(e) {
        const splitted = e.target.id.split("-");
        if (e.target.checked) {
            this.state.markedDays.push(
                {
                    label: e.target.id,
                    diaSemana: splitted[0],
                    nombreTurno: splitted[1]
                }
            );
        } else {
            this.state.markedDays = this.state.markedDays.filter(el => el.label !== e.target.id)
        }
        if (this.props.onChange) {
            this.props.onChange(this.state.markedDays);
        }
    }

    renderTableRow(turno) {
        const dias = [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
        ]
        return dias.map((dia, index) => {
            return (
                [
                    <td key={dia+"-"+turno}>
                        <div className="clearfix">
                            <FormGroup check className="d-inline">
                                <Label check>
                                <Input defaultValue="" 
                                    type="checkbox"
                                    checked={this.handleCheck(dia+"-"+turno)}
                                    onChange={this.handleChange}
                                    id={dia+"-"+turno}/>
                                <span className="form-check-sign">
                                    <span className="check" />
                                </span>
                                </Label>
                            </FormGroup>
                              {turno}
                        </div>
                    </td>,

                ]
            )
        });
     }

    render() {
        return (
            <Table className="tablesorter" responsive>
                <thead className="text-primary">
                    <tr>
                    <th className="text-center">Lunes</th>
                    <th className="text-center">Martes</th>
                    <th className="text-center">Miércoles</th>
                    <th className="text-center">Jueves</th>
                    <th className="text-center">Viernes</th>
                    <th className="text-center">Sábado</th>
                    <th className="text-center">Domingo</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                  {this.renderTableRow("Matutino")}
                  </tr>
                  <tr>
                  {this.renderTableRow("Vespertino")}
                  </tr>
                  <tr>
                  {this.renderTableRow("Nocturno")}
                  </tr>
               </tbody>
            </Table>
        );
    }

}

export default EmployeeCalendarTable;
