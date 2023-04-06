import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Menu, Form, Col, Row } from "antd";
import "./Entete.css";
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

export default function Entete() {
    const [admin, setadmin] = useState(false);
    const { Meta } = Card;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('Hello World');

    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
      setActiveIndex(index);
    };

    const showModal = () => {
    
        axios.get("/importerBouteille").then((res) => {
            console.log(res.data);
            if (res.data == true) {
                setMessage("Mise à jour avec success ! ");
            }else{
                setMessage("Les bouteilles sont déjà mise à jour ! ");
            }
            setIsModalOpen(true);
        });

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get("/verificationUser").then((res) => {
            if (res.data == "admin") {
                setadmin(true);

            }
        });
    }, []);

    return (
        <div className="dashboard-admin my">
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
                    <div className="card-center">
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
                            <a href="/listeUsager" style={{ textDecoration: 'none' }}>
                            <Meta title="Liste d'usagers"/> 
                            </a>
                        
                        </Card>
                    </div>
        
                </Col>

                <Col
                    xs={20}
                    sm={16}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={4}
                >
                    <div className="card-center">

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
                        <a href="/statistique" style={{ textDecoration: 'none' }}>
                            <Meta title="Statistiques d'usagers"/> 
                        </a>
                        
                    </Card>
                    </div>

                </Col>

                <Col
                    xs={20}
                    sm={16}
                    md={12}
                    lg={8}
                    xl={8}
                    xxl={4}
                >
                    <div className="card-center">

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
                        
                        <a href="#" style={{ textDecoration: 'none'}} onClick={showModal}>
                            <Meta title="Importer des bouteillesSAQ" />
                        </a>
                        
                    </Card>
                    </div>

                </Col>
            </Row>
         
            )}


            <Modal title="Salut" 
                open={isModalOpen} 
                onOk={handleOk} 
                okText="Confirmer" 
                onCancel={handleCancel} 
                cancelText="Supprimer">
                <p>{message}</p>
            </Modal>

            

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
