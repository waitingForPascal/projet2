import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Card, Button, Space, Modal, Input, Form, Col, Row } from "antd";
import {
    PlusCircleOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Accueil.css";
import Footer from "../Footer/Footer";

const { confirm } = Modal;

export default function Accueil() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalAjoutCellier, setmodalAjoutCellier] = useState(false);
    // const [modBouteille, setmodBouteille] = useState(null);
    const [modCellier, setmodCellier] = useState(null);
    const modBouteilleForm = useRef(null);
    const ajoutCellierForm = useRef(null);
    const [admin, setadmin] = useState(false);
    const { Meta } = Card;

    useEffect(() => {
        // obtenir les celliers personnels d'utilisateur connecté
        axios.get("/getTousCelliers").then((res) => {
            // console.log(res.data);

            setData(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get("/verificationUser").then((res) => {
            if (res.data == "admin") {
                setadmin(true);
            }
        });
    }, []);

    const ajouteCeliierFormOk = () => {
        ajoutCellierForm.current
            .validateFields()
            .then((value) => {
                // console.log(value);
                setmodalAjoutCellier(false);
                ajoutCellierForm.current.resetFields();
                axios
                    .post(`/ajouteCellier`, {
                        nom: value.nom,
                    })
                    .then((res) => {
                        axios.get("/getTousCelliers").then((res) => {
                            setData(res.data);
                        });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // obtenir les informations du cellier qu'on clique dessus
    const handleModCellier = (cellier) => {
        setmodCellier(cellier);
        // rendre le modal être visible
        // ouvrir modal de modificaiton de cellier
        setIsOpen(true);
        // console.log(cellier);

        // Voici le fonctionnement asynchrone, s'il y a pas setTimeout, on ne peut pas obtenir les information de bouteille Lorsqu'on ouvre le formulaire pour la première fois
        setTimeout(() => {
            modBouteilleForm.current.setFieldsValue(cellier);
        }, 0);
    };

    //
    const modCellierFormOk = () => {
        // vilidation de form
        modBouteilleForm.current.validateFields().then((value) => {
            // console.log(value);
            // console.log(modCellier);
            // envoyer une requête pour la modification de cellier
            axios.patch(`/modCellier/${modCellier.id}`, value).then((res) => {
                // Récupérer les données, actualiser la page

                // console.log(res.data);
                axios.get("/getTousCelliers").then((res) => {
                    setData(res.data);
                });
            });
        });
        // fermer le modal
        setIsOpen(false);
    };

    const confirmMethod = (cellier) => {
        confirm({
            title: "Voulez-vous supprimer ce cellier ?",
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteMethod(cellier);
            },
            onCancel() {},
        });
    };

    const deleteMethod = (cellier) => {
        // console.log(cellier);

        axios.delete(`/deleteCellier/${cellier.id}`).then((res) => {
            // Récupérer les données, actualiser la page

            axios.get("/getTousCelliers").then((res) => {
                setData(res.data);
            });
        });
    };

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * 12 + 1);
        return "/img/celliers/cellier" + [randomIndex] + ".jpg";
    }

    return (
        <div className="my">
            {/* ovrire le modal d'ajout de cellier */}
            <div className="button-middle">
                <Button
                    className="btn-ajouter"
                    style={{ visibility: admin ? "hidden" : "visible" }}
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        setmodalAjoutCellier(true);
                    }}
                >
                    Ajouter un cellier
                </Button>
            </div>

            {/* afficher des celliers */}
            {/* <button className="jia">+</button> */}
            <Row justify="center" align="middle" gutter={[0, 16]}>
                {data.map((cellier) => (
                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={4}
                        key={cellier.id}
                    >
                        <div className="card-center">
                            <Card
                                hoverable
                                style={{
                                    width: 300,
                                }}
                                cover={
                                    <img alt="cellier" src={getRandomImage()} />
                                }
                            >
                                {/* <a href={`#/detail/${data.id}`}>{data.label}</a> */}

                                <div className="cellier">
                                    <Meta title={cellier.nom} />
                                    <Space>
                                        <Button
                                            type="primary"
                                            ghost
                                            shape="circle"
                                            icon={<EditOutlined />}
                                            // cliquer ce botton pour afficher le modal de form pour la modification de cellier
                                            onClick={() =>
                                                handleModCellier(cellier)
                                            }
                                        ></Button>

                                        <Button
                                            className="userBtn"
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                confirmMethod(cellier);
                                            }}
                                        ></Button>

                                        <Button type="primary">
                                            <a
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                href={`/cellier/${cellier.id}`}
                                            >
                                                Entrer
                                            </a>
                                        </Button>
                                    </Space>
                                </div>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
            {/* modal modifier cellier */}
            <Modal
                open={isOpen}
                title="Modification de cellier"
                okText="Mettre à jour"
                cancelText="Annuler"
                onCancel={() => {
                    setIsOpen(false);
                }}
                onOk={() => modCellierFormOk()}
            >
                {/* Rechercher l'utilisation de useRef */}
                <Form ref={modBouteilleForm} layout="vertical">
                    <Form.Item
                        name="nom"
                        label="Nom"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* modal ajouter cellier */}
            <Modal
                open={modalAjoutCellier}
                title="Ajouter un cellier"
                okText="Ajouter"
                cancelText="Annuler"
                onCancel={() => {
                    setmodalAjoutCellier(false);
                }}
                onOk={() => ajouteCeliierFormOk()}
            >
                {/* Rechercher l'utilisation de useRef */}
                <Form ref={ajoutCellierForm} layout="vertical">
                    <Form.Item
                        name="nom"
                        label="Nom"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

if (document.getElementById("accueil")) {
    const Index = ReactDOM.createRoot(document.getElementById("accueil"));

    Index.render(
        <React.StrictMode>
            <Accueil />
            <Footer />
        </React.StrictMode>
    );
}
