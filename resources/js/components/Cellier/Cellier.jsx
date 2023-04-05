import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import {
    Button,
    Select,
    Modal,
    Space,
    Form,
    Input,
    Collapse,
    Card,
    Row,
    Col,
    List,
} from "antd";
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    CloseCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    MinusOutlined,
    FieldNumberOutlined,
    MenuOutlined,
    AppstoreOutlined,
    UpOutlined,
    DownOutlined,
} from "@ant-design/icons";

import { Button, Select, Modal, Space, Form, Input, Collapse, Card, Row , Col, List} from "antd";
import { SearchOutlined, DeleteOutlined, EditOutlined, CloseCircleOutlined, PlusCircleOutlined, ArrowDownOutlined, ArrowUpOutlined, FieldNumberOutlined, GlobalOutlined, MenuOutlined, AppstoreOutlined, UpOutlined, DownOutlined, DollarOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./Cellier.css";
import moment from "moment";
import axios from "axios";
// recherche
const { Search } = Input;
const { Meta } = Card;

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const Aujourdhui = moment().format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();
    // Recherche
    const [RechercheText, setRechercheText] = useState("");
    const [filteredCards, setFilteredCards] = useState(data);

    // tri
    const [sortedData, setSortedData] = useState([]);

    const [
        modalMethodEnregistrerBouteille,
        setModalMethodEnregistrerBouteille,
    ] = useState(false);
    const [bouteilleChoisiEstNonListe, setBouteilleChoisiEstNonListe] =
        useState(true);
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] =
        useState(false);
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
    const [btnAjoutBouteilleDisponible, setBtnAjoutBouteilleDisponible] =
        useState(false);
    const { Panel } = Collapse;
    const [modBouteille, setmodBouteille] = useState(null);
    const [isUpdate, setisUpdate] = useState(false);
    const [ganreListe, setGanreListe] = useState(1);
    const [modeListe, setModeListe] = useState(false);
    const { Option } = Select;
    const [triPar, setTriPar] = useState("nom");
    const [triAscendant, setTriAscendant] = useState(true);

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
        item.ganreliste != null ? setGanreListe(1) : setGanreListe(0);
    };

    const modBouteilleFormOk = () => {
        const formValues = modBouteilleForm.current.getFieldsValue();

        // Désactiver les champs "nom", "pays" et "prix" si le champ "ganreliste" n'est pas nul
        //disableFieldsIfGenrelisteNotNull(formValues);

        modBouteilleForm.current.validateFields().then((value) => {
            value.prix = value.prix.replace(",", ".");
            axios
                .patch(`/modiffBouteilleCellier/${modBouteille.id}`, value)
                .then((res) => {
                    //console.log(res.data);
                    axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                        setData(res.data);
                    });
                });
            // ferme le modal
            setisUpdate(false);
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
                                    cellier_id: id,
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
                                    .get(`/getCeillerBouteille/${id}`)
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
                        cellier_id: id,
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
                                    .get(`/getCeillerBouteille/${id}`)
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
                                    .get(`/getCeillerBouteille/${id}`)
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

    const augmentQuantiteBouteilleUn = (bouteille) => {
        axios
            .patch(`/ajouteBouteilleCellierPatch/${bouteille.id_bouteille}`, {
                quantite: bouteille.quantite + 1,
                id_cellier: bouteille.id_cellier,
                date_achat: Aujourdhui,
            })
            .then((res) => {
                axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                    setData(res.data);
                });
            });
    };

    const diminuerQuantiteBouteilleUn = (bouteille) => {
        if (bouteille.quantite > 1) {
            axios
                .patch(
                    `/ajouteBouteilleCellierPatch/${bouteille.id_bouteille}`,
                    {
                        quantite: bouteille.quantite - 1,
                        id_cellier: bouteille.id_cellier,
                        date_achat: Aujourdhui,
                    }
                )
                .then((res) => {
                    axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                        setData(res.data);
                    });
                });
        } else {
            setIdBoutASupprim(bouteille.id);
            setModalSupprimeBoutteilCellier(bouteille.id);
        }
    };

    const fermeCarteBoutListe = () => {
        setBtnAjoutBouteilleDisponible(false);
        setBouteilleChoisiEstNonListe(true);
        formulaireAjoutBouteille.current.setFieldsValue({
            bouteille: bouteilleSaq[0].id,
        });
        formulaireAjoutBouteille.current?.resetFields();
        formulaireAjoutBouteille.current.setFieldsValue({ nom: "" });
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

    const toggleModeListe = () => {
        setModeListe(!modeListe);
    };

    const trier = (value) => {
        setTriPar(value);
        setTriAscendant(!triAscendant);
    };

    const trierBouteilles = (a, b) => {
        if (triPar === "nom") {
            return triAscendant
                ? a.nom.localeCompare(b.nom)
                : b.nom.localeCompare(a.nom);
        } else if (triPar === "prix") {
            return triAscendant ? a.prix - b.prix : b.prix - a.prix;
        } else if (triPar === "quantite") {
            return triAscendant
                ? a.quantite - b.quantite
                : b.quantite - a.quantite;
        }
    };

    const getIconeTri = (triAscendant) => {
        return triAscendant ? <UpOutlined /> : <DownOutlined />;
    };

    // recherche
    useEffect(() => {
        const filtered = data.filter(
            (card) =>
                card.nom.includes(searchText) ||
                card.pays.includes(searchText) ||
                card.prix.includes(searchText) ||
                card.quantite.toString().includes(searchText)
        );
        setFilteredCards(filtered);
    }, [searchText]);

    function handleRecherche(value) {
        // console.log(value);
        if (value == "") {
            setFilteredCards([]);
            setSortedData([]);
        }
        setSearchText(value);
    }

    // tri
    const handleSortPays = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => a.pays.localeCompare(b.pays));
        setSortedData(newSortedData);
    };

    const handleSortPaysDesc = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => b.pays.localeCompare(a.pays));
        setSortedData(newSortedData);
    };

    const handleSortQuantite = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => a.quantite - b.quantite);
        setSortedData(newSortedData);
    };

    const handleSortQuantiteDesc = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => b.quantite - a.quantite);
        setSortedData(newSortedData);
    };

    const handleSortNom = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => a.nom.localeCompare(b.nom));
        setSortedData(newSortedData);
    };

    const handleSortNomDesc = () => {
        const newSortedData = [
            ...(filteredCards.length > 0 ? filteredCards : data),
        ];
        newSortedData.sort((a, b) => b.nom.localeCompare(a.nom));
        setSortedData(newSortedData);
    };

    return (
        <div>
            <div className="button-right">
                <span></span>
                <Button id="btnRetAccueil" type="primary" ghost>
                    <a href="/home" className="nonDecoration">
                        Retourner
                    </a>
                </Button>
            </div>
            <div className="button-middle">
                <Button
                    className="boutonAjoutBouteille"
                    onClick={() => setModalMethodEnregistrerBouteille(id)}
                >
                    <PlusCircleOutlined />
                    Ajouter une bouteille
                </Button>
            </div>
            <button onClick={handleSortPays}>Sort by Pays ASC</button>
            <button onClick={handleSortPaysDesc}>Sort by Pays DESC</button>
            <button onClick={handleSortQuantite}>Sort by Quantité ASC</button>
            <button onClick={handleSortQuantiteDesc}>
                Sort by Quantité DESC
            </button>
            <button onClick={handleSortNom}>Sort by Nom ASC</button>
            <button onClick={handleSortNomDesc}>Sort by Nom DESC</button>
            <Row
                justify="center"
                align="middle"
                gutter={[0, 16]}
                className="monCellier"
            >
                <Search
                    placeholder="请输入搜索关键字"
                    onSearch={handleRecherche}
                    enterButton
                />

<<<<<<< HEAD
                {(sortedData.length > 0
                    ? sortedData
                    : filteredCards.length > 0
                    ? filteredCards
                    : data
                ).map((item, index) => (
                    <Col
                        xs={20}
                        sm={16}
                        md={12}
                        lg={8}
                        xl={8}
                        xxl={4}
                        key={item.id}
                    >
                        <Card key={item.id} title={item.title} bordered={false}>
                            <div
                                className="carteBouteilleCellier"
                                style={{ position: "relative" }}
                            >
                                {item.url_saq != null ? (
                                    <a href={item.url_saq} target="_blank">
                                        <img
                                            className="iconSAQ"
                                            src="/img/icons/iconSAQ.png"
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                            }}
                                        />
                                    </a>
                                ) : (
                                    <></>
                                )}
                                <img
                                    src={
                                        item.image
                                            ? item.image
                                            : "/img/boutNl.JPG"
                                    }
                                    alt=""
                                />
                                <div className="carteBouteilleCellier__titre">
                                    <FieldNumberOutlined /> {index + 1}-{" "}
                                    <b>{item.nom}</b>
                                </div>
                                <div className="quantiteBout">
                                    <Button
                                        icon={<MinusOutlined />}
                                        shape="circle"
                                        onClick={(e) => {
                                            //console.log("Augementer: ", item);
                                            diminuerQuantiteBouteilleUn(item);
                                        }}
                                    ></Button>
                                    <b>Quantité: {item.quantite}</b>
                                    <Button
                                        icon={<PlusOutlined />}
                                        shape="circle"
                                        onClick={() => {
                                            augmentQuantiteBouteilleUn(item);
                                        }}
                                    ></Button>
                                </div>
                                <div className="carteBouteilleCellier__corps">
                                    <div className="boutinfo">
                                        <p>
                                            Pays: <b>{item.pays}</b>
                                        </p>
                                        <p>
                                            Prix: <b>{item.prix}</b> $
                                        </p>
                                    </div>
                                    <div className="btnModifEtRs">
                                        <Button
                                            type="primary"
                                            shape="circle"
                                            icon={<EditOutlined />}
                                            onClick={() => handleUpdate(item)}
                                        ></Button>
                                        <Button
                                            className="userBtn"
                                            danger
                                            shape="circle"
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                setIdBoutASupprim(item.id);
                                                setModalSupprimeBoutteilCellier(
                                                    item.id
                                                );
                                            }}
                                        ></Button>

                                        <FacebookShareButton
                                            url={
                                                "https://www.saq.com/fr/14154238"
                                            }
                                        >
                                            <FaFacebook className="reseauxSocieaux" />
                                        </FacebookShareButton>

                                        <TwitterShareButton
                                            url={
                                                "https://www.saq.com/fr/14154238"
                                            }
                                        >
                                            <FaTwitter className="reseauxSocieaux" />
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
=======
            <div>
            <div>
        <Button onClick={() => setModeListe(!modeListe)}>
          {modeListe ? <AppstoreOutlined /> : <MenuOutlined />}
        </Button>
        <Select defaultValue="Trier par nom" style={{ width: 150 }} onChange={trier}>
          <Option value="nom">Trier par nom</Option>
          <Option value="prix">Trier par prix</Option>
          <Option value="quantite">Trier par quantité</Option>
        </Select>
        {getIconeTri(triAscendant)}
      </div>
      {modeListe ? (
        <List dataSource={data.sort(trierBouteilles)} renderItem={(item, index) => (
          <List.Item
            key={item.id}
            className={index % 2 === 0 ? "listeBtCell even" : "listeBtCell odd"}
          >
            <List.Item.Meta
              className="listeBouteilleTitre"
              title={<div>{index + 1}. {item.nom}</div>}
              description={<div></div>}
            />
            <div className="quantiteBoutCellierListe">
              <p>X {item.quantite}</p>
              <p>{item.prix}</p>
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleUpdate(item)}></Button>
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
              <div>
                {item.ganreliste !== 0 ? (
                  <a href={item.url_saq} target="_blank">
                    <img src="/img/icons/iconSAQListe.png" alt="En savoir plus" style={{ maxWidth: "30px" }}/>
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </List.Item>
        )}
        />
            ) : (
              <Row justify="center" align="middle" gutter={[0, 16]} className="monCellier">
                  {data.map((item, index) => (
                      <Col
                          xs={20}
                          sm={16}
                          md={12}
                          lg={8}
                          xl={8}
                          xxl={4}
                          key={item.id}
                      >

                          <Card
                              key={item.id}
                              title={item.title}
                              bordered={false}
                          >
                              <div className="carteBouteilleCellier">
                                    <div className="carteBouteilleCellier__infos">
                                            {item.url_saq != null ? 
                                                <a href={item.url_saq} target="_blank"><img className="iconSAQ" src="/img/icons/iconSAQ.png" /></a> : <></>
                                            }
                                            <img className="carteBouteilleCellier__img" src={item.image ? item.image : "/img/bout_Nl.jpg"} alt=""/>
                                        <div className="prixQnt">
                                            <p>{item.pays}</p>
                                            <p><b>{item.prix}</b></p>
                                            <div className="quantiteBout">
                                            <b>Quantité: {item.quantite}</b>
                                            <ArrowDownOutlined
                                                onClick={(e) => {
                                                    //console.log("Augementer: ", item);
                                                    diminuerQuantiteBouteilleUn(item);
                                                }}
                                            />
                                            <ArrowUpOutlined onClick={() => {
                                                    augmentQuantiteBouteilleUn(item);
                                                }}/>
                                        </div>
                                        <div className="">
                                            <FacebookShareButton url={"https://www.saq.com/fr/14154238"}>
                                            <FaFacebook className="reseauxSocieaux"/>
                                            </FacebookShareButton>

                                            <TwitterShareButton url={"https://www.saq.com/fr/14154238"}>
                                            <FaTwitter className="reseauxSocieaux"/>
                                            </TwitterShareButton>
                                        </div>
                                        <div className="btnModif">
                                            <Button
                                                type="primary"
                                                onClick={() => handleUpdate(item)}
                                            >Modiffier</Button>
                                            <Button
                                                className="userBtn"
                                                danger
                                                onClick={() => {
                                                    setIdBoutASupprim(item.id);
                                                    setModalSupprimeBoutteilCellier(item.id);
                                                }}
                                            >Supprimer</Button>
                                        </div>
                                      </div>
                                </div>
                                <div className="carteBouteilleCellier__titre">
                                      <b>{item.nom}</b>
                                </div>
                            </div>
                      </Card>
                  </Col>
              ))}
          </Row>
        )}
    </div>
>>>>>>> hamid

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
                okButtonProps={{ danger: true }}
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
                    <Form.Item name="nom" label="Nom">
                        <Input disabled={!ganreListe} />
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
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input the title of collection!",
                            },
                        ]}
                    >
                        <Select
                            disabled={!ganreListe}
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
                                {
                                    value: "3",
                                    label: "Vin rosé",
                                },
                            ]}
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
                    >
                        <Input type="date" />
                    </Form.Item>
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
