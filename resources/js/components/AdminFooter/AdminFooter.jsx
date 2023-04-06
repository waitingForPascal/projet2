import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Select, Form, Input, Collapse } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./AdminFooter.css";
import moment from "moment";

import {
    FaChartBar,
    FaPlus,
    FaHospitalUser,
    FaDatabase,
    FaCartPlus,
    FaUserAlt,
} from "react-icons/fa";

export default function AdminFooter() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = window.location.pathname;

    const showModal = (index) => {
        setActiveIndex(index);
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

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <div>
            <div className="footer-container">
                <div className="footer-menu">
                    <a
                        href="/listeUsager"
                        className="footer-menu-item"
                        onClick={() => handleItemClick(0)}
                        style={{
                            color:
                                pathname === "/listeUsager"
                                    ? "#0e8388"
                                    : "black",
                        }}
                    >
                        <FaHospitalUser size={24} />
                        <span className="footer-menu-title">ListeUsager</span>
                    </a>

                    <a
                        href="/statistique"
                        className="footer-menu-item"
                        style={{
                            color:
                                pathname === "/statistique"
                                    ? "#0e8388"
                                    : "black",
                        }}
                        onClick={() => handleItemClick(1)}
                    >
                        <FaChartBar size={24} />
                        <span className="footer-menu-title">Statistiques</span>
                    </a>

                    <a
                        href="#"
                        className="footer-menu-item"
                        style={{
                            color: activeIndex === 2 ? "#0e8388" : "black",
                        }}
                        onClick={() => showModal(2)}
                    >
                        <FaDatabase size={24} />
                        <span className="footer-menu-title">
                            ImporterBouteilles
                        </span>
                    </a>
                </div>
            </div>

            <Modal
                title="Salut"
                open={isModalOpen}
                onOk={handleOk}
                okText="Confirmer"
                onCancel={handleCancel}
                cancelText="Retour"
            >
                <p>{message}</p>
            </Modal>
        </div>
    );
}

if (document.getElementById("adminFooter")) {
    const Index = ReactDOM.createRoot(document.getElementById("adminFooter"));

    Index.render(
        <React.StrictMode>
            <AdminFooter />
        </React.StrictMode>
    );
}
