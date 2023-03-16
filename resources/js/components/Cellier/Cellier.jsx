import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Card, Button, Space, Modal, Input, Form, Select , Col, Row, List} from "antd";
import "./Cellier.css"

const cellierDiv = document.getElementById('cellier');
const userId = cellierDiv.getAttribute('data-set-userId');
const userPrivilege = cellierDiv.getAttribute('data-set-privilege');



export default function Cellier() {

    const user_id = userId;
    const [userCellier, setUserCellier] = useState([]);

    useEffect(() => {
        axios.get(`/getCelliersUsager/${user_id}`).then((res) => {
            setUserCellier(res.data);
        });
    }, []);

    if(!userCellier.length) {
        console.log("Tu n'as pas de cellier");
    } else console.log("Voilà");
    

    return (
        <div className="nouvelleBouteille" vertical layout>
            <h3>{userId}</h3>
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
