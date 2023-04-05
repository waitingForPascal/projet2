import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Menu, Form, Col, Row } from "antd";
import "./Footer.css";
import { FaChartBar, FaHospitalUser, FaDatabase } from 'react-icons/fa';

export default function Footer() {
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
        <div className="dashboard-admin">

{admin ? (
            <div className="footer-container">
            <div className="footer-menu" >
        
                <a 
                    href="/listeUsager" 
                    className="footer-menu-item"
                    onClick={() => handleItemClick(0)}
                    style={{color: activeIndex === 0 ? 'green' : 'black' }}>
                    <FaHospitalUser size={24} />
                    <span className="footer-menu-title" >ListeUsager</span>
                </a>
            
        
                <a 
                    href="/statistique"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 1 ? 'green' : 'black' }}
                    onClick={() => handleItemClick(1)}>
                    <FaChartBar size={24} />
                    <span className="footer-menu-title">Statistiques</span>
                </a>

                <a 
                    href="/importerBouteilles"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 2 ? 'green' : 'black' }}
                    onClick={() => handleItemClick(2)}
                >
                    <FaDatabase size={24} />
                    <span className="footer-menu-title">ImporterBouteilles</span>
                    </a>

                </div>
            </div>
        ) : (
            <div className="footer-container">
            <div className="footer-menu" >
        
                <a 
                    href="/listeUsager" 
                    className="footer-menu-item"
                    onClick={() => handleItemClick(0)}
                    style={{color: activeIndex === 0 ? 'green' : 'black' }}>
                    <FaHospitalUser size={24} />
                    <span className="footer-menu-title" >Bouteilles</span>
                </a>
            
        
                <a 
                    href="/statistique"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 1 ? 'green' : 'black' }}
                    onClick={() => handleItemClick(1)}>
                    <FaChartBar size={24} />
                    <span className="footer-menu-title">profile</span>
                </a>

                <a 
                    href="/importerBouteilles"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 2 ? 'green' : 'black' }}
                    onClick={() => handleItemClick(2)}
                >
                    <FaDatabase size={24} />
                    <span className="footer-menu-title">Autre</span>
                    </a>

                </div>
            </div>
        )}

        </div>

                        
    );
}

if (document.getElementById("footer")) {
    const Index = ReactDOM.createRoot(document.getElementById("footer"));

    Index.render(
        <React.StrictMode>
            <Footer />
        </React.StrictMode>
    );
}
