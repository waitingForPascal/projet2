import React, { useEffect, useState, useRef } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import ReactDOM from "react-dom/client";
import { Table, Button, Modal, Switch } from "antd";
// import { Space, Table, Tag } from "antd";
import "./ImporterBouteille.css";

export default function ImporterBouteille() {
    const [user, setuser] = useState([]);

    return (
        <div>
            <form action="" method="post">
                Page uu: <input type="text" />
                Nombre : <input type="text" />
                <a href="/importerBouteilles">Suivant</a>
                <Button
                        type="primary"
                        name="ajouterBouteilleCellier"
                        onClick={() => { ajouteBouteille(vinSelectioné.id, 1, dateAchat ,quantite );}}

                    >Ajouter la bouteille</Button>
            </form>

        </div>
    );
}

if (document.getElementById("importerBouteille")) {
    const Index = ReactDOM.createRoot(document.getElementById("importerBouteille"));

    Index.render(
        <React.StrictMode>
            <ImporterBouteille />
        </React.StrictMode>
    );
}
