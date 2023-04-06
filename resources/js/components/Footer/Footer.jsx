import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Card, Button, Modal, Select, Form, Input, Collapse } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./Footer.css";
import moment from "moment";

import {
    FaChartBar,
    FaPlus,
    FaHospitalUser,
    FaDatabase,
    FaCartPlus,
    FaGem,
} from "react-icons/fa";

export default function Footer() {
    const [admin, setadmin] = useState(false);
    const { Meta } = Card;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const pathname = window.location.pathname;

    const [isOpen, setIsOpen] = useState(false);
    const [modalAjoutCellier, setmodalAjoutCellier] = useState(false);
    const [modCellier, setmodCellier] = useState(null);
    const modBouteilleForm = useRef(null);
    const ajoutCellierForm = useRef(null);
    const [
        modalMethodEnregistrerBouteille,
        setModalMethodEnregistrerBouteille,
    ] = useState(false);
    const [btnAjoutBouteilleDisponible, setBtnAjoutBouteilleDisponible] =
        useState(false);
    const { Option } = Select;
    const selectBouteilleRef = useRef();
    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const formulaireAjoutBouteille = useRef(null);
    const [bouteilleChoisiEstNonListe, setBouteilleChoisiEstNonListe] =
        useState(true);
    const [boutSelectione, setBoutSelectione] = useState([]);
    const Aujourdhui = moment().format("YYYY-MM-DD");
    const [listePays, setListePays] = useState([]);
    const { Panel } = Collapse;
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] =
        useState(false);
    const [isUpdate, setisUpdate] = useState(false);

    // Pour obtenir le valeur et puis changer le nom/la fonction dans le menu footer
    const firstSlashIndex = pathname.indexOf("/");
    const secondSlashIndex = pathname.indexOf("/", firstSlashIndex + 1);
    const valRoute = pathname.substring(firstSlashIndex + 1, secondSlashIndex);
    const lastSlashIndex = pathname.lastIndexOf("/");
    const valIdCellier = pathname.substring(lastSlashIndex + 1);

    let elBtn = "AjouterCellier";
    if (valRoute == "cellier") {
        elBtn = "AjouterBouteille";
    }

    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setBouteilleSaq(res.data);
        });
    }, []);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v2/all")
            .then((response) => {
                const liste = response.data.map((pays) => ({
                    value: pays.name,
                    label: pays.name,
                }));
                setListePays(liste);
            })
            .catch((error) => {
                console.error(error);
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
                        // console.log("1");
                        // window.location.reload();
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [activeIndex, setActiveIndex] = useState(1);

    const handleItemClick = (index) => {
        setActiveIndex(index);
        if (index == 1) {
            if (valRoute !== "cellier") {
                setmodalAjoutCellier(true);
            } else {
                setModalMethodEnregistrerBouteille(valIdCellier);
            }
        }
    };

    // const params = useParams();
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

    useEffect(() => {
        axios.get("/verificationUser").then((res) => {
            if (res.data == "admin") {
                setadmin(true);
            }
        });
    }, []);

    const fermeCarteBoutListe = () => {
        setBtnAjoutBouteilleDisponible(false);
        setBouteilleChoisiEstNonListe(true);
        formulaireAjoutBouteille.current.setFieldsValue({
            bouteille: bouteilleSaq[0].id,
        });
        formulaireAjoutBouteille.current?.resetFields();
        formulaireAjoutBouteille.current.setFieldsValue({ nom: "" });
    };

    const CardeBouteilleListe = ({ bouteille }) => {
        return (
            <Card className="carteBouteilleListe">
                <div>
                    <CloseCircleOutlined
                        className="iconFermerBoutListe"
                        onClick={() => {
                            fermeCarteBoutListe();
                        }}
                    />
                </div>
                <div>
                    <p className="carteBouteilleListe__titre">
                        <b>{bouteille.nom} </b>
                    </p>
                    <div className="carteBouteilleListe__corps">
                        <div className="carteBouteilleListe__infos">
                            <p>
                                Pays: <b>{bouteille.pays}</b>{" "}
                            </p>
                            <p>
                                Type:{" "}
                                <b>
                                    {bouteille.type == 1
                                        ? "Vin rouge"
                                        : "Vin blanc"}
                                </b>
                            </p>
                            <p>
                                Format: <b>{bouteille.format}</b>
                            </p>
                            <p>
                                Prix: <b>{bouteille.prix}</b>
                            </p>
                        </div>
                        <img src={bouteille.image} alt={bouteille.nom} />
                    </div>
                    <Button
                        type="link"
                        className="btnLienSAQ"
                        href={bouteille.url_saq}
                        target="_blank"
                    >
                        En savoir plus{" "}
                    </Button>
                </div>
            </Card>
        );
    };
    const choisirVin = (elm) => {
        setBtnAjoutBouteilleDisponible(true);
        bouteilleSaq.forEach((bouteille) => {
            if (bouteille.id == elm) {
                setBoutSelectione(bouteille);
                setBouteilleChoisiEstNonListe(false);
                formulaireAjoutBouteille.current.setFieldsValue({
                    nom: bouteille.nom,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    prix: bouteille.prix,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    pays: bouteille.pays,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    type: bouteille.type,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    millesime: bouteille.millesime,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    garde: bouteille.garde,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    note: bouteille.note,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    image: bouteille.image,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    format: bouteille.format,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    description: bouteille.description,
                });
                formulaireAjoutBouteille.current.setFieldsValue({
                    url_saq: bouteille.url_saq,
                });
            }
        });
    };
    const ajouterBoutteilAuCellierFormOk = () => {
        if (bouteilleChoisiEstNonListe) {
            formulaireAjoutBouteille.current
                .validateFields()
                .then((value) => {
                    const nomsBouteilles = data.map(
                        (bouteille) => bouteille.nom
                    );
                    if (
                        nomsBouteilles.some(
                            (nom) =>
                                nom.toLowerCase() === value.nom.toLowerCase()
                        )
                    ) {
                        return Modal.error({
                            title: "Nom de bouteille répété ou non acceptable !",
                            content:
                                "Veuillez entrer un nom de bouteille différent.",
                        });
                    } else {
                        let objNouvelleBout = {
                            nom: value.nom,
                            image: value.image ? value.image : null,
                            pays: value.pays ? value.pays : "Non défini",
                            code_saq: null,
                            description: value.description
                                ? value.description
                                : null,
                            prix: value.prix,
                            note: value.note ? value.note : null,
                            millesime: value.millesime ? value.millesime : null,
                            garde_jusqua: value.garde_jusqua
                                ? value.garde_jusqua
                                : null,
                            url_saq: null,
                            url_img: null,
                            format: value.format ? value.format : null,
                            type: value.type_vin,
                            ganreliste: 0,
                        };
                        objNouvelleBout.prix = objNouvelleBout.prix.replace(
                            ",",
                            "."
                        );

                        axios
                            .post("/ajouteBouteilleNl", objNouvelleBout)
                            .then((res) => {
                                //console.log(res);
                                let objBouteille = {
                                    bouteille_id: res.data,
                                    cellier_id: valIdCellier,
                                    date_achat: value.dateAchat
                                        ? value.dateAchat
                                        : Aujourdhui,
                                    quantite: value.quantite,
                                };
                                //console.log(objBouteille);
                                axios.post(
                                    `/ajouteBouteilleCellier`,
                                    objBouteille
                                );
                            })
                            .then((res) =>
                                axios
                                    .get(`/getCeillerBouteille/${valIdCellier}`)
                                    .then((res) => {
                                        setData(res.data);
                                    })
                            );
                    }
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la validation des champs:",
                        error
                    );
                });
        } else if (!bouteilleChoisiEstNonListe) {
            formulaireAjoutBouteille.current
                .validateFields()
                .then((value) => {
                    let objBouteille = {
                        bouteille_id: boutSelectione.id,
                        cellier_id: valIdCellier,
                        date_achat: value.dateAchat
                            ? value.dateAchat
                            : Aujourdhui,
                        quantite: value.quantite,
                    };

                    if (
                        data.some(
                            (item) => item.bouteille_id == boutSelectione.id
                        )
                    ) {
                        const bouteilleDansCellier = data.find(
                            (item) => item.bouteille_id == boutSelectione.id
                        );
                        axios
                            .patch(
                                `/ajouteBouteilleCellierPatch/${boutSelectione.id}`,
                                {
                                    quantite:
                                        bouteilleDansCellier.quantite +
                                        Number(objBouteille.quantite),
                                    id_cellier: bouteilleDansCellier.id_cellier,
                                    date_achat: objBouteille.date_achat,
                                }
                            )
                            .then((res) => {
                                axios
                                    .get(`/getCeillerBouteille/${valIdCellier}`)
                                    .then((res) => {
                                        setData(res.data);
                                    });
                            });
                    } else {
                        axios
                            .post(`/ajouteBouteilleCellier`, objBouteille)
                            .then((res) => {})
                            .then((res) => {
                                axios
                                    .get(`/getCeillerBouteille/${valIdCellier}`)
                                    .then((res) => {
                                        setData(res.data);
                                    });
                            });
                    }
                })
                .catch((error) => {
                    console.error(
                        "Erreur lors de la validation des champs:",
                        error
                    );
                });
        }
        setModalMethodEnregistrerBouteille(false);
    };

    return (
        <div className="">
            {admin ? (
                <div className="footer-container">
                    <div className="footer-menu">
                        <a
                            href="/listeUsager"
                            className="footer-menu-item"
                            onClick={() => handleItemClick(0)}
                            style={{
                                color: activeIndex === 0 ? "#0e8388" : "black",
                            }}
                        >
                            <FaHospitalUser size={24} />
                            <span className="footer-menu-title">
                                ListeUsager
                            </span>
                        </a>

                        <a
                            href="/statistique"
                            className="footer-menu-item"
                            style={{
                                color: activeIndex === 1 ? "#0e8388" : "black",
                            }}
                            onClick={() => handleItemClick(1)}
                        >
                            <FaChartBar size={24} />
                            <span className="footer-menu-title">
                                Statistiques
                            </span>
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
            ) : (
                <div className="footer-container">
                    <div className="footer-menu">
                        <a
                            href="/home"
                            className="footer-menu-item"
                            onClick={() => handleItemClick(0)}
                            style={{
                                color: activeIndex === 0 ? "#0e8388" : "black",
                            }}
                        >
                            <FaGem size={24} />
                            <span className="footer-menu-title">
                                MesCelliers
                            </span>
                        </a>

                        <a
                            href="#"
                            className="footer-menu-item"
                            style={{
                                color: activeIndex === 1 ? "#0e8388" : "black",
                            }}
                            onClick={() => handleItemClick(1)}
                        >
                            <FaPlus size={24} />
                            <span className="footer-menu-title">{elBtn}</span>
                        </a>

                        <a
                            href="#"
                            className="footer-menu-item"
                            style={{
                                color: activeIndex === 2 ? "#0e8388" : "black",
                            }}
                            onClick={() => handleItemClick(2)}
                        >
                            <FaCartPlus size={24} />
                            <span className="footer-menu-title">
                                Liste D'Achat
                            </span>
                        </a>
                    </div>
                </div>
            )}

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

            {/* modal ajouter une nouvelle boutteille au cellier */}
            <Modal
                open={modalMethodEnregistrerBouteille}
                title="Ajouter une bouteille"
                okText="Ajouter"
                cancelText="Annuler"
                onCancel={() => {
                    console.log("coucou");
                    setModalMethodEnregistrerBouteille(false);
                }}
                footer={[
                    <Button
                        key="Ajouter"
                        type="primary"
                        disabled={!btnAjoutBouteilleDisponible}
                        onClick={() => {
                            ajouterBoutteilAuCellierFormOk();
                        }}
                    >
                        Ajouter
                    </Button>,
                    <Button
                        key="annuler"
                        onClick={() =>
                            setModalMethodEnregistrerBouteille(false)
                        }
                    >
                        Annuler
                    </Button>,
                ]}
            >
                Séléctionnez une bouteille :
                <Select
                    showSearch
                    className="nom_bouteille"
                    onChange={choisirVin}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue="default"
                    ref={selectBouteilleRef}
                >
                    <Option value="default" key="default" disabled>
                        --- Bouteilles existantes chez SAQ ---
                    </Option>
                    {bouteilleSaq.map((bouteille) =>
                        bouteille.ganreliste === null ? (
                            <Option value={bouteille.id} key={bouteille.id}>
                                {bouteille.nom}
                            </Option>
                        ) : null
                    )}
                </Select>
                {/* Modal ajout une bouteille listée */}
                <Form
                    ref={formulaireAjoutBouteille}
                    layout="vertical"
                    validateTrigger="onBlur"
                    onValuesChange={(changedValues, allValues) => {
                        // console.log(onValuesChange)
                        if (
                            allValues.nom.length < 3 ||
                            allValues.prix == undefined ||
                            allValues.prix == "" ||
                            allValues.type_vin == undefined ||
                            allValues.type_vin == "" ||
                            allValues.quantite == undefined ||
                            allValues.quantite == "" ||
                            allValues.dateAchat == undefined ||
                            allValues.dateAchat == ""
                        ) {
                            setBtnAjoutBouteilleDisponible(false);
                        } else setBtnAjoutBouteilleDisponible(true);
                    }}
                >
                    <div className="formAjoutBoutAuCellier">
                        {bouteilleChoisiEstNonListe ? (
                            <>
                                <Form.Item
                                    name="nom"
                                    label="Nom de la bouteille (Obligatoire)"
                                    initialValue={boutSelectione.nom}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer au moins 3 caractères !",
                                        },
                                    ]}
                                >
                                    <Input type="text" />
                                </Form.Item>
                                <Form.Item
                                    label="Prix (Obligatoire)"
                                    name="prix"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer le prix de la bouteille.",
                                        },
                                    ]}
                                >
                                    <Input step={0.01} min="0" />
                                </Form.Item>
                                <Form.Item
                                    name="quantite"
                                    label="Quantité (Obligatoire)"
                                    initialValue={1}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer la quantité !",
                                        },
                                    ]}
                                >
                                    <Input type="number" min="1" step="1" />
                                </Form.Item>
                                <Form.Item
                                    name="dateAchat"
                                    label="Date d'achat (Obligatoire)"
                                    initialValue={Aujourdhui}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer la date d'achat !",
                                        },
                                    ]}
                                >
                                    <Input type="date" />
                                </Form.Item>
                                <Form.Item
                                    label="Type de vin (Obligatoire)"
                                    name="type_vin"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez choisir le type de vin.",
                                        },
                                    ]}
                                >
                                    <Select defaultValue="default">
                                        <Option
                                            value="default"
                                            key="default"
                                            disabled
                                        >
                                            --- Sélétionez le type ---
                                        </Option>
                                        <Option value="1">Vin rouge</Option>
                                        <Option value="2">Vin blanc</Option>
                                        <Option value="3">Vin rosé</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Veuillez sélectionner le pays (optionnelle)"
                                    name="pays"
                                >
                                    <Select
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.label
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {listePays.map((pays) => (
                                            <Option
                                                key={pays.value}
                                                value={pays.value}
                                                label={pays.label}
                                            >
                                                {pays.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Collapse bordered={false}>
                                    <Panel
                                        header="Options supplémentaires"
                                        key="1"
                                    >
                                        <Form.Item
                                            label="Millesime"
                                            name="millesime"
                                        >
                                            <Input type="date" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Garde"
                                            name="garde_jusqua"
                                        >
                                            <Input type="date" />
                                        </Form.Item>
                                        <Form.Item label="Note" name="note">
                                            <Input
                                                type="number"
                                                min={0}
                                                max={5}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Image" name="image">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Format" name="format">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Description"
                                            name="description"
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Panel>
                                </Collapse>
                                <Form.Item
                                    hidden
                                    label="ganreliste"
                                    name="ganreliste"
                                    initialValue="0"
                                >
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <CardeBouteilleListe
                                    bouteille={boutSelectione}
                                />
                                <Form.Item
                                    name="quantite"
                                    label="Quantite"
                                    initialValue={1}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer la quantité !",
                                        },
                                    ]}
                                >
                                    <Input type="number" min="1" step="1" />
                                </Form.Item>
                                <Form.Item
                                    name="dateAchat"
                                    label="Date d'achat"
                                    initialValue={Aujourdhui}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Veuillez entrer la date d'achat !",
                                        },
                                    ]}
                                >
                                    <Input type="date" />
                                </Form.Item>
                            </>
                        )}
                    </div>
                </Form>
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
