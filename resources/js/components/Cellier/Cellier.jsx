import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

import {Button, Select, Table, Modal, Space, Form, Input, DatePicker} from "antd";
import {SearchOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Cellier.css";
import moment from "moment";

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const today = moment().format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();

    const [modalMethodEnregistrerBouteille, setModalMethodEnregistrerBouteille] = useState(false);
    const [modalAjouteBoutteilListeAuCellier, setModalAjouteBoutteilListeAuCellier] = useState(false);
    const [modalAjouteBoutteilNonListeAuCellier, setModalAjouteBoutteilNonListeAuCellier] = useState(false);
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] = useState(false);
    const [modalModifierBoutteilCellier, setModalModifierBoutteilCellier] = useState(false);
    const ajouteBoutteilListeAuCellierForm = useRef(null);
    const ajouteBoutteilNonListeAuCellierForm = useRef(null);

    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const [boutSelectione, setBoutSelectione] = useState([]);
    const [idBoutASupprim, setIdBoutASupprim] = useState(null);
    const [objBoutAModifier, setIdBoutAModifier] = useState(null);

    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setBouteilleSaq(res.data);
        });
    }, []);

    const choisirVin = (elm) => {
        bouteilleSaq.forEach((bouteiile) => {
            if (bouteiile.id == Number(elm.target.value)) {
                setBoutSelectione(bouteiile);
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
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
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
            ...getColumnSearchProps("nom"),
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: "Quantité",
            dataIndex: "quantite",
            key: "quantite",
            width: "20%",
            ...getColumnSearchProps("quantite"),
            sorter: {
                compare: (a, b) => a.quantite - b.quantite,
            },
        },
        {
            title: "Pays",
            dataIndex: "pays",
            key: "pays",
            width: "20%",
            ...getColumnSearchProps("pays"),
            sorter: (a, b) => a.pays.localeCompare(b.pays),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "20%",
            ...getColumnSearchProps("type"),
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
            title: "Fonctionnalité",
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
                            onClick={() => {
                                setIdBoutAModifier(item);
                                setModalModifierBoutteilCellier(item);
                            }}
                        ></Button>
                    </div>
                );
            },
        },
    ];

    const ajouterBoutteilAuCellierFormOk = () => {
        ajouteBoutteilListeAuCellierForm.current
            .validateFields()
            .then((value) => {
                // console.log(value);

                let objBouteille = {
                    bouteilles_id: boutSelectione.id,
                    celliers_id: id,
                    data_achat: value.dateAchat,
                    quantite: value.quantite,
                };

                //verifier si le bouteille va être ajouté est déjà dans ce cellier, si oui patch(modifier la quantité), si non post
                if (
                    data.some((item) => item.bouteille_id == boutSelectione.id)
                ) {
                    // console.log("patch");
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
                                date_achat: objBouteille.data_achat,
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
                    // console.log("post");
                    axios
                        .post(`/ajouteBouteilleCellier`, objBouteille)
                        .then((res) => {
                            axios
                                .get(`/getCeillerBouteille/${id}`)
                                .then((res) => {
                                    setData(res.data);
                                });
                        });
                }
            });
        setModalAjouteBoutteilListeAuCellier(false);
    };

    
    
    const ajouterBoutteilNlAuCellierFormOk = (formData) => {
        console.log("test",formData);
        //setModalAjouteBoutteilNonListeAuCellier(false);
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
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                rowKey={(item) => item.id}
            />
            <div className="button-middle">
                <Button
                    type="primary"
                    onClick={() => setModalMethodEnregistrerBouteille(id)}
                >
                    Ajouter une nouvelle bouteil
                </Button>
            </div>

            {/* modal choisir la méthode d'ajouter un boutteil au cellier */}
            <Modal
                visible={modalMethodEnregistrerBouteille}
                title="Quel type de bouteille, listé ou non-listé voulez-vous ajouter?"
                onCancel={() => setModalMethodEnregistrerBouteille(false)}
                footer={[
                    <Button key="listée" type="primary" 
                            onClick={() => {
                            setModalMethodEnregistrerBouteille(false);
                            setModalAjouteBoutteilListeAuCellier(true);
                            }}>
                        Listée
                    </Button>,
                    <Button key="non-listée" 
                            onClick={() => {
                                setModalMethodEnregistrerBouteille(false);
                                setModalAjouteBoutteilNonListeAuCellier(true);
                            }}>
                        Non-listée
                    </Button>,
                    <Button hidden key="annuler" onClick={() => setModalMethodEnregistrerBouteille(false)}>
                        Annuler
                    </Button>,
                ]}>
            </Modal>

            {/* modal ajouter une nouvelle boutteille au cellier */}
            <Modal
                open={modalAjouteBoutteilListeAuCellier}
                title="Ajouter une nouvelle bouteille listée au cellier"
                okText="Ajouter"
                cancelText="Annuler"
                onOk={() => ajouterBoutteilAuCellierFormOk()}
                onCancel={() => {
                    setModalAjouteBoutteilListeAuCellier(false);
                }}
            >
                {/* Modal ajout une bouteille listée */}
                <Form ref={ajouteBoutteilListeAuCellierForm} layout="vertical">
                    <p>
                        Séléctionnez une bouteiile :
                        <select
                            data-id=""
                            className="nom_bouteille"
                            onChange={choisirVin}
                        >
                            <option value="0">Selectionnez le vin</option>
                            {bouteilleSaq.map((bouteiile) => (
                                <option value={bouteiile.id} key={bouteiile.id}>
                                    {bouteiile.nom}
                                </option>
                            ))}
                        </select>
                    </p>
                    <div className="elmFormBoutteilCellier">
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
                    </div>
                    <div className="elmFormBoutteilCellier">
                        <Form.Item
                            name="dateAchat"
                            label="Date d'achat"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Veuillez entrer la date d'achat !",
                                },
                            ]}
                        >
                            <Input type="date" min={today} max={today} />
                            {/* <DatePicker defaultValue={today}  /> */}
                        </Form.Item>
                    </div>
                </Form>
            </Modal>

            <Modal
               visible={modalAjouteBoutteilNonListeAuCellier}
               title="Ajouter une nouvelle bouteille non listée"
               okText="Ajouter"
               cancelText="Annuler"
               onOk={() => {
                 // récupérez les données du formulaire
                 const formData = ajouteBoutteilNonListeAuCellierForm.current.getFieldsValue();
                 ajouterBoutteilNlAuCellierFormOk(formData);
               }}
               onCancel={() => {
                 setModalAjouteBoutteilNonListeAuCellier(false);
               }}
             >
               {/* formulaire d'ajout d'une bouteille non listée */}
               <Form ref={ajouteBoutteilNonListeAuCellierForm} layout="vertical">
                    <Form.Item label="Nom" name="nom" type="text"><Input /></Form.Item>
                    <Form.Item label="Pays" name="pays" type="text"><Input /></Form.Item>
                    <Form.Item label="Quantité" name="quantite"><Input type="number" min={1} step={1} /></Form.Item>
                    <Form.Item label="Prix" name="prix"><Input type="number" step={0.01} min="0"/></Form.Item>
                    <Form.Item label="Millesime" name="millesime"><Input type="date" /></Form.Item>
                    <Form.Item label="Date achat" name="date_achat"><Input type="date" /></Form.Item>
                    <Form.Item label="Garde" name="garde_jusqua"><Input type="date" /></Form.Item>
                    <Form.Item label="Notes" name="notes"><Input type="number" min={0} max={5} /></Form.Item>
                    <Form.Item label="Image" name="image"><Input /></Form.Item>
                    <Form.Item label="Format" name="format"><Input /></Form.Item>
                    <Form.Item label="Description" name="description"><Input.TextArea /></Form.Item>
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
            >
                <p>Êtes-vous sûr de vouloir supprimer cette bouteille ?</p>
            </Modal>

            <Modal
                open={modalModifierBoutteilCellier}
                title="Modification de bouteille"
                okText="Mettre à jour"
                cancelText="Annuler"
                onCancel={() => {
                    setModalModifierBoutteilCellier(false);
                }}
                onOk={() => {
                    console.log(objBoutAModifier);
                }}
            >
                <Form layout="vertical">
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

if (document.getElementById("cellier")) {
    const Index = ReactDOM.createRoot(document.getElementById("cellier"));

    Index.render(
        <React.StrictMode>
            <Cellier />
        </React.StrictMode>
    );
}
