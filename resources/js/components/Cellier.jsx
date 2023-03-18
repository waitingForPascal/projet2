import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Space, Modal, Input, Form, Col, Row } from "antd";

export default function Cellier() {
    const { Meta } = Card;
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();
    // console.log(id);

    useEffect(() => {
        // récupérer les bouteilles dans le cellier spécial
        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
            setData(res.data);
        });
    }, []);
    console.log(data);

    return (
        <div>
            {/* ovrire le modal d'ajout de cellier */}
            <Button
                type="primary"
                // onClick={() => {
                //     setmodalAjoutCellier(true);
                // }}
            >
                Ajouter un bouteille
            </Button>
            <Row gutter={[0, 16]}>
                {data.map((bouteille) => (
                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={6}
                        xxl={4}
                        key={bouteille.id}
                    >
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            cover={
                                <img
                                    alt="bouteille"
                                    // src="{bouteiile.image}"
                                    src="https://cdn.shopify.com/s/files/1/1057/2942/products/3-frontenac_720x.jpg?v=1631750927"
                                />
                            }
                        >
                            {/* <a href={`#/detail/${data.id}`}>{data.label}</a> */}

                            <Meta title={bouteille.nom} />
                            <br />
                            <p>ID: {bouteille.id_bouteille}</p>
                            <p>
                                Quantité: {bouteille.quantite}
                                <Space>
                                    <Button type="primary">Ajouter</Button>
                                    <Button danger>Boire</Button>
                                </Space>
                            </p>
                            <p>Pays: {bouteille.pays}</p>
                            <p>Type: {bouteille.type}</p>
                            <p>Prix: {bouteille.prix}</p>
                            <Space>
                                <Button
                                // onClick={() =>
                                //     // cliquer ce botton pour afficher le modal de form pour la modification de cellier
                                //     handleModCellier(cellier)
                                // }
                                >
                                    Modifier
                                </Button>

                                <Button
                                    danger
                                    // onClick={() => {
                                    //     confirmMethod(cellier);
                                    // }}
                                >
                                    Supprimer
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
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
