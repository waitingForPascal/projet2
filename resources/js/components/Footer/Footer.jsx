import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Menu, Form, Col, Row } from "antd";
import "./Footer.css";
import { FaChartBar, FaPlus, FaHospitalUser, FaDatabase,FaCartPlus,FaUserAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";

export default function Footer() {
    const [admin, setadmin] = useState(false);
    const { Meta } = Card;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const pathname = window.location.pathname;
    const firstSlashIndex = pathname.indexOf('/');
    const secondSlashIndex = pathname.indexOf('/', firstSlashIndex + 1);
    const value = pathname.substring(firstSlashIndex + 1, secondSlashIndex);
    console.log(value);
    
// console.log(window.location.pathname)
    const [activeIndex, setActiveIndex] = useState(1);
    // const [params, setParams] = useState("");

    const handleItemClick = (index) => {
      setActiveIndex(index);
    };

    // const params = useParams();
    const showModal = (index) => {
        setActiveIndex(index);
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
        <div className="">

        {admin ? (
            <div className="footer-container">
            <div className="footer-menu" >
        
                <a 
                    href="/listeUsager" 
                    className="footer-menu-item"
                    onClick={() => handleItemClick(0)}
                    style={{color: activeIndex === 0 ? '#0e8388' : 'black' }}>
                    <FaHospitalUser size={24} />
                    <span className="footer-menu-title" >ListeUsager</span>
                </a>
        
                <a 
                    href="/statistique"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 1 ? '#0e8388' : 'black' }}
                    onClick={() => handleItemClick(1)}>
                    <FaChartBar size={24} />
                    <span className="footer-menu-title">Statistiques</span>
                </a>

                <a 
                    href="#"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 2 ? '#0e8388' : 'black' }}
                    onClick={() => showModal}
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
                    href="#" 
                    className="footer-menu-item"
                    onClick={() => handleItemClick(0)}
                    style={{color: activeIndex === 0 ? '#0e8388' : 'black' }}>
                    <FaUserAlt size={24} />
                    <span className="footer-menu-title" >Profil</span>
                </a>
        
                <a 
                    href="#"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 1 ? '#0e8388' : 'black' }}
                    onClick={() => handleItemClick(1)}>
                    <FaPlus size={24} />
                    <span className="footer-menu-title">AjouterCellier</span>
                </a>

                <a 
                    href="#"
                    className="footer-menu-item" 
                    style={{ color: activeIndex === 2 ? '#0e8388' : 'black' }}
                    onClick={() => handleItemClick(2)}
                >
                    <FaCartPlus size={24} />
                    <span className="footer-menu-title">ListeD'Achat</span>
                    </a>

                </div>
            </div>
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

if (document.getElementById("footer")) {
    const Index = ReactDOM.createRoot(document.getElementById("footer"));

    Index.render(
        <React.StrictMode>
            <Footer />
        </React.StrictMode>
    );
}
