import React, { useEffect, useState, Link } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Card, Button, Space } from "antd";
import { Col, Row, List } from "antd";

export default function Accueil() {
    const [data, setData] = useState([]);
    const { Meta } = Card;

    useEffect(() => {
        axios.get("/getListeBouteilleCellier").then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    const ajouterQuantite = (id) => {
        console.log(id);
        const quantite = { quantite: data[id - 1]?.quantite + 1 };
        axios.patch(`/bouteille/${id}`, quantite).then((res) => {
            axios.get("/getListeBouteilleCellier").then((res) => {
                setData(res.data);
            });
        });
    };

    const reduireQuantite = (id) => {
        const quantite = { quantite: data[id - 1]?.quantite - 1 };
        axios.patch(`/bouteille/${id}`, quantite).then((res) => {
            axios.get("/getListeBouteilleCellier").then((res) => {
                setData(res.data);
            });
        });
    };
    return (
        <div>
            <Row gutter={[0, 16]}>
                {data.map((bouteiile) => (
                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={6}
                        xxl={4}
                        key={bouteiile.id}
                    >
                        <Card
                            hoverable
                            style={{
                                width: 300,
                            }}
                            cover={
                                <img
                                    alt="example"
                                    // src="{bouteiile.image}"
                                    src="https://cdn.shopify.com/s/files/1/1057/2942/products/3-frontenac_720x.jpg?v=1631750927"
                                />
                            }
                        >
                            <Meta title={bouteiile.nom} />
                            <br />
                            <p>Quantité: {bouteiile.quantite}</p>
                            <p>Pays: {bouteiile.pays}</p>
                            <p>Type: {bouteiile.type}</p>
                            <p>Millesime: {bouteiile.millesime}</p>
                            <p>
                                <a href="{bouteiile.url_saq}">Voir SAQ</a>
                            </p>
                            <Space>
                                <Button>
                                    {/* <a
                                        href={`/modifier/${bouteiile.id_bouteille_cellier}`}
                                    >
                                        
                                    </a> */}
                                    Modifier
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        ajouterQuantite(bouteiile.id);
                                    }}
                                >
                                    Ajouter
                                </Button>
                                <Button
                                    danger
                                    onClick={() => {
                                        reduireQuantite(bouteiile.id);
                                    }}
                                >
                                    Boire
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

if (document.getElementById("accueil")) {
    const Index = ReactDOM.createRoot(document.getElementById("accueil"));

    Index.render(
        <React.StrictMode>
            <Accueil />
        </React.StrictMode>
    );
}
