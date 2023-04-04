import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

import {
    Button,
    Select,
    Table,
    Modal,
    Space,
    Form,
    Input,
    Collapse,
    Card,
} from "antd";
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    CloseCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    MinusOutlined,
    FieldNumberOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Cellier.css";
import moment from "moment";
import axios from "axios";

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const Aujourdhui = moment().format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();

    const [modalMethodEnregistrerBouteille,setModalMethodEnregistrerBouteille] = useState(false);
    const [bouteilleChoisiEstNonListe, setBouteilleChoisiEstNonListe] = useState(true);
    const [modalAjouteBoutteilNonListeAuCellier, setModalAjouteBoutteilNonListeAuCellier ] = useState(false);
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] = useState(false);
    const modBouteilleForm = useRef(null);
    const ajouteBoutteilListeAuCellierForm = useRef(null);
    const formulaireAjoutBouteille = useRef(null);

    const selectBouteilleRef = useRef();
    const ajouteBoutteilNonListeAuCellierForm = useRef(null);

    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const [boutSelectione, setBoutSelectione] = useState([]);
    const [idBoutASupprim, setIdBoutASupprim] = useState(null);
    const [objBoutAModifier, setObjBoutAModifier] = useState(null);
    const [listePays, setListePays] = useState([]);
    const [formulaireBtNlValide, setFormulaireBtNlValide] = useState(false);
    const [btnAjoutBouteilleDisponible, setBtnAjoutBouteilleDisponible] = useState(false);
    const { Panel } = Collapse;
    const [modBouteille, setmodBouteille] = useState(null);
    const [isUpdate, setisUpdate] = useState(false);
    const [ganreListe, setGanreListe] = useState(1);

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

    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setBouteilleSaq(res.data);
        });
    }, []);

    const choisirVin = (elm) => {
        setBtnAjoutBouteilleDisponible(true)
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

    useEffect(() => {
        // récupérer les bouteilles dans le cellier spécial
        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
            // console.log(res.data);
            setData(res.data);
        });
    }, []);

    // Faire la recherche
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (open) => {
            if (open) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Nom",
            dataIndex: "nom",
            key: "nom",
            width: "30%",
            sorter: (a, b) => a.nom.localeCompare(b.nom),
            render: (item) => <span className="nomBouteille">{item}</span>

        },
        {
            title: "Quantité",
            dataIndex: "quantite",
            key: "quantite",
            width: "20%",
            sorter: {
                compare: (a, b) => a.quantite - b.quantite,
            },
            render: (item) => {
                return (
                    <div className="quantiteBout">
                        <Button
                            icon={<PlusOutlined />}
                            shape="circle"
                            onClick={(e) => {
                                console.log("Augementer: ", item);
                                //augmentQuantiteBouteille(item.id);
                            }}
                        >
                        </Button>
                        {item}
                        <Button
                            icon={<MinusOutlined />}
                            shape="circle"
                            onClick={() => {
                                console.log("Diminuer: ", );
                            }}
                        >
                        </Button>
                    </div>
                );
            },
        },
        {
            title: "Pays",
            dataIndex: "pays",
            key: "pays",
            width: "20%",
            sorter: (a, b) => a.pays.localeCompare(b.pays),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "20%",
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Prix",
            dataIndex: "prix",
            key: "prix",
            sorter: {
                compare: (a, b) => a.prix - b.prix,
            },
        },
        {
            title: "",
            render: (item) => {
                return (
                    <div>
                        <Button
                            className="userBtn"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setIdBoutASupprim(item.id);
                                setModalSupprimeBoutteilCellier(item.id);
                            }}
                        ></Button>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleUpdate(item)}
                        ></Button>
                    </div>
                );
            },
        },
        {
            title: "",
            render: (item) => {
                return (
                    <div>
                        <FacebookShareButton url={"https://www.saq.com/fr/14154238"}>
                        <FaFacebook />
                        </FacebookShareButton>

                        <TwitterShareButton url={"https://www.saq.com/fr/14154238"}>
                        <FaTwitter />
                        </TwitterShareButton>

                    </div>
                );
            },
        },
    ];

    const handleUpdate = (item) => {
        //console.log("RAHHAL",item.ganreliste);
        // Renregistrer les informations de la bouteille actuel
        setmodBouteille(item);
        //console.log("RAHHAL",item);

        // ouvrir le modal
        setisUpdate(true);
        // mettre les informations de la bouteille dans le formulaire
        setTimeout(() => {
            modBouteilleForm.current.setFieldsValue(item);
        }, 0);
        (item.ganreliste != null) ? setGanreListe(1):setGanreListe(0);
    };

    const modBouteilleFormOk = () => {
        console.log("Commencement fonctoin modBouteilleFormOk",ganreListe);
        const formValues = modBouteilleForm.current.getFieldsValue();

        // Désactiver les champs "nom", "pays" et "prix" si le champ "ganreliste" n'est pas nul
        //disableFieldsIfGenrelisteNotNull(formValues);

        modBouteilleForm.current.validateFields().then((value) => {
            value.prix = value.prix.replace(',', '.');
            axios
                .patch(`/modiffBouteilleCellier/${modBouteille.id}`, value)
                .then((res) => {
                    console.log(res.data);
                    axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                        setData(res.data);
                    });
                });
            // ferme le modal
            setisUpdate(false);
        });
    };

    const ajouterBoutteilAuCellierFormOk = () => {
        if (bouteilleChoisiEstNonListe){
            formulaireAjoutBouteille.current.validateFields().then((value) => {
                let objNouvelleBout = {
                    nom: value.nom,
                    image: value.image ? value.image : null,
                    pays: value.pays ? value.pays : "-----",
                    code_saq: null,
                    description: value.description ? value.description : null,
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
                objNouvelleBout.prix = objNouvelleBout.prix.replace(',', '.');

                axios.post('/ajouteBouteilleNl', objNouvelleBout)
                    .then((res) => {
                        console.log(res);
                        let objBouteille = {
                            bouteille_id: res.data,
                            cellier_id: id,
                            date_achat: value.dateAchat ? value.dateAchat : Aujourdhui,
                            quantite: value.quantite,
                        };
                        console.log(objBouteille);
                        axios.post(`/ajouteBouteilleCellier`, objBouteille);
                    })
                    .then((res) =>
                        axios.get(`/getCeillerBouteille/${id}`)
                            .then((res) => {
                                setData(res.data);
                            })
                    )
            }).catch((error) => {
                console.error("Erreur lors de la validation des champs:", error);
            });
        }
        else if (!bouteilleChoisiEstNonListe) {
            formulaireAjoutBouteille.current.validateFields().then((value) => {

                let objBouteille = {
                    bouteille_id: boutSelectione.id,
                    cellier_id: id,
                    date_achat: value.dateAchat ? value.dateAchat : Aujourdhui,
                    quantite: value.quantite,
                };

                if (
                    data.some((item) => item.bouteille_id == boutSelectione.id)
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
                                 .get(`/getCeillerBouteille/${id}`)
                                 .then((res) => {
                                      setData(res.data);
                                 });
                            });
                    } else {
                        axios
                        .post(`/ajouteBouteilleCellier`, objBouteille)
                             .then((res) => {
                                console.log(res);
                            })
                            .then((res) => {
                                axios
                                .get(`/getCeillerBouteille/${id}`)
                                  .then((res) => {
                                      setData(res.data);
                                    });
                           });
                     }

                }).catch((error) => {
                console.error("Erreur lors de la validation des champs:", error);
            });
        }
        setModalMethodEnregistrerBouteille(false);
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
                                Prix: <b>{bouteille.prix} $</b>
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

    const fermeCarteBoutListe = () => {
        setBtnAjoutBouteilleDisponible(false)
        setBouteilleChoisiEstNonListe(true);
        formulaireAjoutBouteille.current.setFieldsValue({ bouteille: bouteilleSaq[0].id });
        formulaireAjoutBouteille.current?.resetFields();
        formulaireAjoutBouteille.current.setFieldsValue({ nom: "" });
    };

    const ajouterBoutteilNlAuCellierFormOk = (formData) => {
        const showErrorModal = () => {
            Modal.error({
                title: "Erreur",
                content:
                    "Le nom choisi n'est pas autorisé ! Veuillez choisir un autre nom.",
                okText: "OK",
            });
        };

        if (data.some((item) => item.nom === formData.nom)) showErrorModal();
        else if (bouteilleSaq.some((item) => item.nom === formData.nom)) {
            showErrorModal();
        } else {
            setModalAjouteBoutteilNonListeAuCellier(false);
            let objNouvelleBout = {
                nom: formData.nom,
                image: formData.image ? formData.image : null,
                pays: formData.pays ? formData.pays : "-----",
                code_saq: null,
                description: formData.description ? formData.description : null,
                prix: formData.prix,
                note: formData.note ? formData.note : null,
                millesime: formData.millesime ? formData.millesime : null,
                garde_jusqua: formData.garde_jusqua
                    ? formData.garde_jusqua
                    : null,
                url_saq: null,
                url_img: null,
                format: formData.format ? formData.format : null,
                type: formData.type_vin,
                ganreliste: 0,
            };

            axios.post(`/ajouteBouteilleNl`, objNouvelleBout).then((res) => {
                let objBouteille = {
                    bouteille_id: res.data,
                    cellier_id: id,
                    date_achat: formData.date_achat
                        ? formData.date_achat
                        : Aujourdhui,
                    quantite: formData.quantite,
                };

                //console.log(objBouteille);
                axios
                    .post(`/ajouteBouteilleCellier`, objBouteille)
                    .then((res) => {
                        //console.log(res);
                        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                            setData(res.data);
                        });
                    });
            });
        }
    };

    const supprimerBouteilleCellier = (idBouteille) => {
        axios.delete(`/deleteBouteilleCellier/${idBouteille}`).then((res) => {
            axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                setData(res.data);
            });
        });



        const modCellierFormOk = () => {
            // vilidation de form
            modBouteilleForm.current.validateFields().then((value) => {
                // envoyer une requête pour la modification de cellier
                axios
                    .patch(`/modCellier/${modCellier.id}`, value)
                    .then((res) => {
                        // Récupérer les données, actualiser la page
                        axios.get("/getTousCelliers").then((res) => {
                            setData(res.data);
                        });
                    });
            });
            // fermer le modal
            setIsOpen(false);
        };
    };

    return (
        // <div style={{ width: "80%", margin: "auto" }}>
        <div>
            <div className="button-right">
                <span></span>
                <Button type="primary" ghost>
                    <a href="/home" className="nonDecoration">
                        Retouner
                    </a>
                </Button>
            </div>
            <div className="button-middle">
                <Button
                    className="boutonAjoutBouteille"
                    onClick={() => setModalMethodEnregistrerBouteille(id)}
                >
                    <PlusCircleOutlined />Ajouter une bouteille
                </Button>
            </div>



  <div class="monCellier">
      {data.map((item, index) => (
        <Card
          key={item.id}
          title={item.title}
          bordered={false}
          className="carteBouteilleCellier"
        >
            <div className="carteBouteilleListe__titre">
                <p><FieldNumberOutlined /> {index+1}- <b>{item.nom}</b></p>
            </div>
            <div className="carteBouteilleListe__corps">
            <>
                <div className="quantiteBout">
                    <Button
                        icon={<MinusOutlined />}
                        shape="circle"
                        onClick={(e) => {
                            console.log("Augementer: ", item);
                            //augmentQuantiteBouteille(item.id);
                        }}
                    >
                    </Button>
                    {item.quantite}
                    <Button
                        icon={<PlusOutlined />}
                        shape="circle"
                        onClick={() => {
                            console.log("Diminuer: ", item.quantite);
                        }}
                    >
                    </Button>
                </div>
                            
                    <p>Pays: {item.pays}</p>
                    <p>Prix: {item.prix}</p>
                    <div className="btnModifBout">
                        <Button
                            className="userBtn"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setIdBoutASupprim(item.id);
                                setModalSupprimeBoutteilCellier(item.id);
                            }}
                        ></Button>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleUpdate(item)}
                        ></Button>
                        
                    </div>
                </>
                <>
                    <img src={item.image ? item.image : "img/boutNl.JPG"} alt=""/>
                </>
            </div>
        </Card>
      ))}
    </div>


            {/* modal ajouter une nouvelle boutteille au cellier */}
            <Modal
                open={modalMethodEnregistrerBouteille}
                title="Ajouter une bouteille"
                okText="Ajouter"
                cancelText="Annuler"
                //onOk={() => ajouterBoutteilAuCellierFormOk()}
                onCancel={() => {
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

                        if (!bouteilleChoisiEstNonListe) setBtnAjoutBouteilleDisponible(true);
                        else {
                            console.log("salutttttttttttt");
                            if( (allValues.nom !== undefined) &&
                                allValues.type != "--- Sélétionez le type ---" &&
                                allValues.prix != undefined) {
                                    console.log(allValues);
                                }
                             setBtnAjoutBouteilleDisponible(true);
                            // console.log("here: ",btnAjoutBouteilleDisponible);
                        }
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
                                    label="Quantite (Obligatoire)"
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
                                        <Option value="default" key="default" disabled>--- Sélétionez le type ---</Option>
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

<<<<<<< HEAD
=======
            {/* <Modal
                open={modalAjouteBoutteilNonListeAuCellier}
                title="Ajouter une nouvelle bouteille non listée"
                onCancel={() => {
                    setModalAjouteBoutteilNonListeAuCellier(false);
                }}
                footer={[
                    <Button
                        key="Ajouter"
                        type="primary"
                        disabled="true"
                        onClick={() => {
                            // récupérez les données du formulaire
                            const formData =
                                ajouteBoutteilNonListeAuCellierForm.current.getFieldsValue();
                                ajouterBoutteilNlAuCellierFormOk(formData);
                        }}
                    >
                        Ajouter
                    </Button>,
                    <Button
                        key="annuler"
                        onClick={() =>
                            setModalAjouteBoutteilNonListeAuCellier(false)
                        }
                    >
                        Annuler
                    </Button>,
                ]}
            >
                {/* formulaire d'ajout d'une bouteille non listée
                <Form
                    ref={ajouteBoutteilNonListeAuCellierForm}
                    layout="vertical"
                    validateTrigger="onBlur"
                    onValuesChange={(changedValues, allValues) => {
                        setFormulaireBtNlValide(
                            allValues.nom &&
                                allValues.quantite &&
                                allValues.prix &&
                                allValues.type_vin
                        );
                        //console.log(formulaireBtNlValide);
                    }}
                >
                    <Form.Item
                        hidden
                        label="ganreliste"
                        name="ganreliste"
                        initialValue="0"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal> */}

>>>>>>> 6ca12a77f2b24c3dfe5f229b7bb175ef9adac385
            {/* modal supprimer une boutteille du cellier */}
            <Modal
                open={modalSupprimeBoutteilCellier}
                title="Voulez-vous supprimer la bouteille ?"
                okText="Oui"
                cancelText="Annuler"
                onOk={() => {
                    supprimerBouteilleCellier(idBoutASupprim);
                    setIdBoutASupprim(null);
                    setModalSupprimeBoutteilCellier(false);
                }}
                onCancel={() => {
                    setIdBoutASupprim(null);
                    setModalSupprimeBoutteilCellier(false);
                }}
            >
                <p>Êtes-vous sûr de vouloir supprimer cette bouteille ?</p>
            </Modal>

            <Modal
                open={isUpdate}
                title="Modification de bouteille"
                okText="Mettre à jour"
                cancelText="Annuler"
                onCancel={() => {
                    setisUpdate(false);
                }}
                onOk={() => modBouteilleFormOk()}
            >
                <Form ref={modBouteilleForm} layout="vertical">
                    <Form.Item name="nom" label="Nom"  >
                        <Input disabled={!ganreListe}/>
                    </Form.Item>
                    <Form.Item
                        name="prix"
                        label="Prix"

                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Input disabled={!ganreListe} />
                    </Form.Item>
                    <Form.Item
                        name="pays"
                        label="Pays"
                        disabled={!ganreListe}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Input disabled={!ganreListe} />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type"
                        disabled={!ganreListe}
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
                                    value: "1",
                                    label: "Vin rouge",
                                },
                                {
                                    value: "2",
                                    label: "Vin blanc",
                                },
                            ]}
                            disabled={!ganreListe}
                        />
                    </Form.Item>
                    <Form.Item name="id" label="id" hidden="true">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id_cellier"
                        label="id_cellier"
                        hidden="true"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="quantite"
                        label="Quantite"
                        rules={[
                            {
                                required: true,
                                message: "Veuillez entrer la quantité !",
                            },
                        ]}
                    >
                        <Input type="number" min="1" step="1" />
                    </Form.Item>
                    <Form.Item
                        name="dateAchat"
                        label="Date d'achat"
                        initialValue={Aujourdhui}
                    ></Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier />
        </React.StrictMode>
    );
}
