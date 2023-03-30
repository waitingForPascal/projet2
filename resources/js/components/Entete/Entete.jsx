import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Space, Modal, Input, Form, Col, Row } from "antd";

export default function Entete() {
    const [admin, setadmin] = useState(false);
    const { Meta } = Card;
    useEffect(() => {
        axios.get("/verificationUser").then((res) => {
            console.log(res.data);
            if (res.data == "admin") {
                setadmin(true);
            }
        });
    }, []);
    return (
        <div>
            {admin && (
            <Row justify="center" align="middle" gutter={[0, 16]}>
                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={4}
                    >
                        <Card
                            hoverable
                            style={{
                                width: 250,
                            }}
                            bordered={false}
                            cover={
                                <img
                                    alt="listeUsager"
                                    src="/img/listeUsager.jpg" 
                                />
                            }
                        >
                            <a href="/listeUsager">
                                <Meta title="Liste d'usagers"/> 
                            </a>
                           
                        </Card>
                    </Col>

                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={4}
                    >
                        <Card
                            hoverable
                            style={{
                                width: 250,
                            }}
                            bordered={false}
                            cover={
                                <img
                                    alt="statistiques"
                                    src="/img/statistiques.jpg" 
                                />
                            }
                        >
                            <a href="/statistique">
                                <Meta title="Statistiques d'usagers"/> 
                            </a>
                           
                        </Card>
                    </Col>

                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={4}
                    >
                        <Card
                            hoverable
                            style={{
                                width: 250,
                            }}
                            bordered={false}
                            cover={
                                <img
                                    alt="BouteillesSAQ"
                                    src="/img/importerBouteilles.jpg" 
                                />
                            }
                        >
                            <a href="/bouteilleSAQ">
                                <Meta title="Importer des bouteillesSAQ" />
                            </a>
                            
                        </Card>
                    </Col>

            </Row>
            )}
        </div>
    );
}

if (document.getElementById("entete")) {
    const Index = ReactDOM.createRoot(document.getElementById("entete"));

    Index.render(
        <React.StrictMode>
            <Entete />
        </React.StrictMode>
    );
}
