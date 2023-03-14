import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Card, Button, Space, Modal, Input, Form, Select } from "antd";
import { Col, Row, List } from "antd";

export default function Accueil() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modBouteille, setmodBouteille] = useState(null);
    const modBouteilleForm = useRef(null);

    const { Meta } = Card;

    // obtenir toutes les bouteilles dans tous les celliers,Il y a des répétitions, qui doivent être optimisées plus tard
    useEffect(() => {
        axios.get("/getListeBouteilleCellier").then((res) => {
            console.log(res.data);
            const listBouteille = res.data.filter((item) => {});
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

    // obtenir les informations de la bouteille qu'on clique dessus
    const handleModBouteille = (bouteiile) => {
        setmodBouteille(bouteiile);
        // rendre le modal être visible
        console.log(bouteiile);
        setIsOpen(true);
        // Voici le fonctionnement asynchrone, s'il y a pas setTimeout, on ne peut pas obtenir les information de bouteille Lorsqu'on ouvre le formulaire pour la première fois
        setTimeout(() => {
            modBouteilleForm.current.setFieldsValue(bouteiile);
        }, 0);
    };

    const modBouteilleFormOk = () => {
        // vilidation de form
        modBouteilleForm.current.validateFields().then((value) => {
            // console.log(value);
            console.log(modBouteille);
            // envoyer une requête pour la modification de bouteille
            axios
                .patch(`/modBouteille/${modBouteille.bouteille_id}`, value)
                .then((res) => {
                    // Récupérer les données, actualiser la page

                    // console.log(res.data);
                    axios.get("/getListeBouteilleCellier").then((res) => {
                        setData(res.data);
                    });
                });
        });
        // fermer le modal
        setIsOpen(false);
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
                            <p>Prix: {bouteiile.prix_saq}</p>

                            <p>
                                <a href="{bouteiile.url_saq}">Voir SAQ</a>
                            </p>
                            <Space>
                                <Button
                                    onClick={() =>
                                        // cliquer ce botton pour afficher le modal de form pour la modification
                                        handleModBouteille(bouteiile)
                                    }
                                >
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

            <Modal
                open={isOpen}
                title="Modification de bouteille"
                okText="Mettre à jour"
                cancelText="Annuler"
                onCancel={() => {
                    setIsOpen(false);
                }}
                onOk={() => modBouteilleFormOk()}
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
                    <Form.Item
                        name="prix_saq"
                        label="Prix"
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
                    <Form.Item
                        name="pays"
                        label="Pays"
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
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            // Ici, vous devez obtenir les données de la table des types à partir de la base de données
                            options={[
                                {
                                    value: "Vin rouge",
                                    label: "Vin rouge",
                                },
                                {
                                    value: "Vin blanc",
                                    label: "Vin blanc",
                                },
                            ]}
                        />
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
        </React.StrictMode>
    );
}
