import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Button, Table } from "antd";

export default function Cellier() {
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();
    // console.log(id);

    useEffect(() => {
        // récupérer les bouteilles dans le cellier spécial
        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
            // console.log(res.data);
            setData(res.data);
        });
    }, []);

    const columns = [
        {
            title: "Nom",
            dataIndex: "nom",
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: "Quantité",
            dataIndex: "quantite",
            sorter: {
                compare: (a, b) => a.quantite - b.quantite,
            },
        },
        {
            title: "Pays",
            dataIndex: "pays",
            sorter: (a, b) => a.pays.localeCompare(b.pays),
        },
        {
            title: "Type",
            dataIndex: "type",
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Prix",
            dataIndex: "prix",
            sorter: {
                compare: (a, b) => a.prix - b.prix,
            },
        },
    ];

    //     {
    //         key: "1",
    //         name: "John Brown",
    //         chinese: 98,
    //         math: 60,
    //         english: 70,
    //     },
    //     {
    //         key: "2",
    //         name: "Jim Green",
    //         chinese: 98,
    //         math: 66,
    //         english: 89,
    //     },
    //     {
    //         key: "3",
    //         name: "Joe Black",
    //         chinese: 98,
    //         math: 90,
    //         english: 70,
    //     },
    //     {
    //         key: "4",
    //         name: "Jim Red",
    //         chinese: 88,
    //         math: 99,
    //         english: 89,
    //     },
    // ];
    return (
        <div style={{ width: "80%", margin: "auto" }}>
            {/* ovrire le modal d'ajout de cellier */}
            <Button
                type="primary"
                // onClick={() => {
                //     setmodalAjoutCellier(true);
                // }}
            >
                Ajouter un bouteille
            </Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier />
        </React.StrictMode>
    );
}
