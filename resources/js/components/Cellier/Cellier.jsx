import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Table, Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Cellier.css"
import { forEach } from "lodash";

const cellierDiv = document.getElementById('cellier');
const userPrivilege = cellierDiv.getAttribute('data-set-privilege');
const userId = cellierDiv.getAttribute('data-set-userId');
let codePrivilege = 0;
let unCellier = [];
let nomPlaceholder = "Au moins trois caractères";

export default function Cellier() {
    
    const [celliers , setCelliers] = useState([]);
    const [nomCellier, setNomCellier] = useState('');
    const [nomErrMessage, setNomErrMessage] = useState('');
    
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
                setCelliers(res.data);
            });
        }, []);
    }
    
    // const voirCellier = (idCellier) => {
    //     axios.get(`/voirCellier`,idCellier).then((res) => {
    //         console.log(res.data);
    //         unCellier = res.data;
    //     });
    // }

    const voirCellier = (idCellier) => {
        axios.get(`/getCellier/${idCellier}`).then((res) => {
            console.log(res.data);
            unCellier = res.data;
        });
    }

    const ajouteUnCellier= (userId) => {
        let codeErr = 0;
        if(nomCellier == "") codeErr = 1;
        if(nomCellier != "") {
            const nomRegex = /^[A-Za-z0-9\s\-ÉéÈèÊêëàÀâÂäÄÔôöÖûÛüÙùÇçÎîïÏœæÿ]{3,}$/;
            celliers.forEach(cellier =>{
                if(cellier.user_id == userId) {
                    if(cellier.nom == nomCellier) {
                        codeErr = 2;
                        console.log("Le nom est répété");
                    }
                    else if (!nomRegex.test(nomCellier)) codeErr = 3;
                }
            });
            if (!codeErr) {
                let objCellier = {
                    'nomCellier' : nomCellier,
                    'userId'     : userId
                }
                        
                axios.post(`/ajouteCellier/`,objCellier).then((res) => {
                    console.log(res);
                    axios.get('/getTousCelliers').then((res) => {
                        setCelliers(res.data);
                    });
                });
                setNomErrMessage('');
            }
        }
        if (codeErr) {
            switch (codeErr) {
                case 1:
                    setNomErrMessage('Le champ du nom ne peut pas être vide !');
                    break;
                case 2:
                    setNomErrMessage('Ce nom a déjà été utilisé !');
                    break;
                case 3:
                    setNomErrMessage('Entrez au moins 3 caractères (lettres et chiffres) !');
                    break;
                default:
                    break;
            }
            const spanErr = ReactDOM.createRoot(document.getElementById("spanErr"));
            spanErr.innerHTML = "11"
            console.log(spanErr);
            

          }
    }
    
    
   
    return (
        <>
        <div className="divAjoutCellier">
            <input type="text" 
                    placeholder={nomPlaceholder} 
                    onChange={(event) => setNomCellier(event.target.value)} 
                    required/>
            <span className="spanErr">{nomErrMessage}</span>
            <Button type="primary" name="ajouterBouteilleCellier" onClick={() => { ajouteUnCellier(userId); }}>Ajouter un cellier</Button>
        </div>
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
        </>
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