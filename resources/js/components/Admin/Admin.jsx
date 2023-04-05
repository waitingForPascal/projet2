import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Menu, Form, Col, Row } from "antd";
import "./Admin.css";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import Footer from "../Footer/Footer";

export default function Admin() {
    const { Meta } = Card;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("Hello World");

    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const showModal = () => {
        axios.get("/importerBouteille").then((res) => {
            console.log(res.data);
            if (res.data == true) {
                setMessage("Mise à jour avec success ! ");
            } else {
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

    return (
        <div className="dashboard-admin">
            <Row justify="center" align="middle" gutter={[0, 16]}>
                <Col xs={20} sm={16} md={12} lg={8} xl={8} xxl={4}>
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
                            <a
                                href="/listeUsager"
                                style={{ textDecoration: "none" }}
                            >
                                <Meta title="Liste d'usagers" />
                            </a>
                        </Card>
                    </div>
                </Col>

                <Col xs={20} sm={16} md={12} lg={8} xl={8} xxl={4}>
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
                            <a
                                href="/statistique"
                                style={{ textDecoration: "none" }}
                            >
                                <Meta title="Statistiques d'usagers" />
                            </a>
                        </Card>
                    </div>
                </Col>

                <Col xs={20} sm={16} md={12} lg={8} xl={8} xxl={4}>
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
                            <a
                                href="#"
                                style={{ textDecoration: "none" }}
                                onClick={showModal}
                            >
                                <Meta title="Importer des bouteillesSAQ" />
                            </a>
                        </Card>
                    </div>
                </Col>
            </Row>

            {/* 
    <div className="footer-container">
      <div className="footer-menu" >

        <div
          className="footer-menu-item" 
          style={{color: activeIndex === 0 ? 'green' : 'black' }}
          onClick={() => handleItemClick(0)}
        >
          <FaHome size={24} />
          <span className="footer-menu-title" >Home</span>
        </div>

        <div
         className="footer-menu-item" 
          style={{ color: activeIndex === 1 ? 'green' : 'black' }}
          onClick={() => handleItemClick(1)}
        >
          <FaUser size={24} />
          <span className="footer-menu-title">Profile</span>
        </div>

        <div
          className="footer-menu-item" 
          style={{ color: activeIndex === 2 ? 'green' : 'black' }}
          onClick={() => handleItemClick(2)}
        >
          <FaCog size={24} />
          <span className="footer-menu-title">Settings</span>
        </div>

      </div>
    </div> */}

            <Modal
                title="Salut"
                open={isModalOpen}
                onOk={handleOk}
                okText="Confirmer"
                onCancel={handleCancel}
                cancelText="Supprimer"
            >
                <p>{message}</p>
            </Modal>
        </div>
    );
}

if (document.getElementById("admin")) {
    const Index = ReactDOM.createRoot(document.getElementById("admin"));

    Index.render(
        <React.StrictMode>
            <Admin />
            <Footer />
        </React.StrictMode>
    );
}
