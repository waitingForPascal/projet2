import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Table, Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Cellier.css"

const cellierDiv = document.getElementById('cellier');
const userPrivilege = cellierDiv.getAttribute('data-set-privilege');
const userId = cellierDiv.getAttribute('data-set-userId');



export default function Cellier() {

    const [tousCelliers, setTousCelliers] = useState([]);
    const [userCellier , setUserCellier] = useState([]);
    const [celliers , setCelliers] = useState([]);


    if(userPrivilege === "usager") {
        useEffect(() => {
            axios.get(`/getCelliersUsager/${userId}`).then((res) => {
                setCelliers(res.data);
            });
        }, []);
        
    
            console.log(celliers);
     
    }

    else if(userPrivilege === "admin") {
        useEffect(() => {
            axios.get('/getTousCelliers').then((res) => {
                console.log(res.data);
                setCelliers(res.data);
            });
        }, []);
    }

        

    return (
        <div className="nouvelleBouteille" vertical layout>
            
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
