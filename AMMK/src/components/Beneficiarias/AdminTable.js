import React, { useState, useEffect } from 'react'
import {Table, Button, Row} from 'reactstrap';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

import TakeOutB from '../../views/Beneficiarias/TakeOutB';
import ReenterB from '../../views/Beneficiarias/ReenterB';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const AdminTable = () => {
    const [beneficiaries, setBeneficiaries] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(API_BASE_URL + 'beneficiaries/')
        setBeneficiaries(response.data)
    }

    const renderHeader = () => {
        let headerElement = ['Nombre','Fecha de nacimiento', 'DX médico', 'Sede', 'Acciones']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return beneficiaries && beneficiaries.map(({ id, nombreCompleto, fechaNacimiento, dxMedico, headquarter_id}) => {
            return (
                <tr key={id}>
                    <td>{nombreCompleto}</td>
                    <td>{fechaNacimiento}</td>
                    <td>{dxMedico}</td>
                    <td>{headquarter_id}</td>
                    <td>
                        <Row>
                            <Link to='/admin/Beneficiarias/SpecificView'>
                            <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                            <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                            </Link>

                            <TakeOutB/>

                            <ReenterB/>
                        </Row>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <Table hover>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
        </>
    )
}

export default AdminTable