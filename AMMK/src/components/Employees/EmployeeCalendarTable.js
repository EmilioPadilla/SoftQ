import React from "react";
import moment from 'moment';

import {Table, Input, FormGroup, Label} from "reactstrap";

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

function getWeekStartEnd() {
    var startOfWeek = moment().startOf('week').toISOString();
    var endOfWeek   = moment().endOf('week').toISOString();

    return [startOfWeek, endOfWeek];
}

class EmployeeCalendarTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            employeeId: props.employeeId,
            markedDays: [],
        }
    }

    componentDidMount() {
        var {employeeId, markedDays} = this.state;
        if (employeeId) {
            // TODO Fetch scheduled days of employee
        }
    }

    handleChange(e) {
        if (e.target.checked) {
            this.state.markedDays.push(e.target.id);
        } else {
            this.state.markedDays = this.state.markedDays.filter(el => el !== e.target.id)
        }
        console.log(this.state.markedDays);
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
                                <Input defaultValue="" type="checkbox"
                                    onChange={this.handleChange} 
                                    id={dia+"-"+turno}/>
                                <span className="form-check-sign">
                                    <span className="check" />
                                </span>
                                </Label>
                            </FormGroup>
                            Turno {turno}
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