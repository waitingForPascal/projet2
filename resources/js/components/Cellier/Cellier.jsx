import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Table, Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Cellier.css"

const cellierDiv = document.getElementById('cellier');
const userPrivilege = cellierDiv.getAttribute('data-set-privilege');
const userId = cellierDiv.getAttribute('data-set-userId');
let codePrivilege = 0;


export default function Cellier() {

    const [celliers , setCelliers] = useState([]);


    if(userPrivilege === "usager") {
        useEffect(() => {
            axios.get(`/getCelliersUsager/${userId}`).then((res) => {
                console.log(res.data);
                setCelliers(res.data);
            });
        }, []);

    
     
    }

    else if(userPrivilege === "admin") {
        codePrivilege = 1;
        useEffect(() => {
            axios.get('/getTousCelliers').then((res) => {
                console.log(res.data);
                setCelliers(res.data);
            });
        }, []);
    }

    const voirCellier = (idCellier) => {
        //console.log(id_cellier);
        axios.get(`/getCellier/${idCellier}`).then((res) => {
           console.log(res);
         });
        
    };
      


    return (
    <div>
        <table className="tableCelliers">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nom du cellier</th>
                    {codePrivilege ? (
                        <th>Nom d'usager</th>
                    ):(<></>)}
                    <th>Détail</th>
                </tr>
            </thead>
            <tbody>
                {celliers.map((item, index) => (
                    <tr>
                        <td key={index}>{index+1}</td>
                        <td key={index}>{item.nom}</td>
                        {codePrivilege ? (
                        <td key={index}>{item.name}</td>
                        ):(<></>)}

                        <td>
                        <Button
                        type="link"
                        name="voirCellier"
                        onClick={() => { voirCellier(item.id);}}

                    >Voir le cellier</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );

}

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier/>
        </React.StrictMode>
    );
    
}
