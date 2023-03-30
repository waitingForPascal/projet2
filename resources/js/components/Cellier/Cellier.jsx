import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

import {Button, Select, Table, Modal, Space, Form, Input, Collapse, Card } from "antd";
import {SearchOutlined, DeleteOutlined, EditOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Cellier.css";
import moment from "moment";

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const Aujourdhui = moment().format("YYYY-MM-DD");
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();

    const [modalMethodEnregistrerBouteille, setModalMethodEnregistrerBouteille] = useState(false);
    const [bouteilleChoisiEstNonListe, setBouteilleChoisiEstNonListe] = useState(true);
    const [modalAjouteBoutteilNonListeAuCellier, setModalAjouteBoutteilNonListeAuCellier] = useState(false);
    const [modalSupprimeBoutteilCellier, setModalSupprimeBoutteilCellier] = useState(false);
    const modBouteilleForm = useRef(null);
    const ajouteBoutteilListeAuCellierForm = useRef(null);
    const formulaireAjoutBouteille = useRef(null);
    const ajouteBoutteilNonListeAuCellierForm = useRef(null);

    const [bouteilleSaq, setBouteilleSaq] = useState([]);
    const [boutSelectione, setBoutSelectione] = useState([]);
    const [idBoutASupprim, setIdBoutASupprim] = useState(null);
    const [objBoutAModifier, setObjBoutAModifier] = useState(null);
    const [listePays, setListePays] = useState([]);
    const [formulaireBtNlValide, setFormulaireBtNlValide] = useState(false);
    const [formulaireMValide, setFormulaireBtLiValide] = useState(false);
    const { Panel } = Collapse;
    const [modBouteille, setmodBouteille] = useState(null);
    const [isUpdate, setisUpdate] = useState(false);

    useEffect(() => {
        axios.get("https://restcountries.com/v2/all")
          .then(response => {
            const liste = response.data.map(pays => ({ value: pays.name, label: pays.name }));
            setListePays(liste);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {

            setBouteilleSaq(res.data);
        });
    }, []);

    const choisirVin = (elm) => {
        bouteilleSaq.forEach((bouteiile) => {
            if (bouteiile.id == elm ) {
                setBoutSelectione(bouteiile);
                setBouteilleChoisiEstNonListe(false);
                formulaireAjoutBouteille.current.setFieldsValue({nom: bouteiile.nom});
                formulaireAjoutBouteille.current.setFieldsValue({prix: bouteiile.prix});
                formulaireAjoutBouteille.current.setFieldsValue({pays: bouteiile.pays});
                formulaireAjoutBouteille.current.setFieldsValue({type: bouteiile.type});
                formulaireAjoutBouteille.current.setFieldsValue({millesime: bouteiile.millesime});
                formulaireAjoutBouteille.current.setFieldsValue({garde: bouteiile.garde});
                formulaireAjoutBouteille.current.setFieldsValue({note: bouteiile.note});
                formulaireAjoutBouteille.current.setFieldsValue({image: bouteiile.image});
                formulaireAjoutBouteille.current.setFieldsValue({format: bouteiile.format});
                formulaireAjoutBouteille.current.setFieldsValue({description: bouteiile.description});
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
                    },
                    {
                      title: "Quantité",
                      dataIndex: "quantite",
                      key: "quantite",
                      width: "20%",
                      sorter: {
                          compare: (a, b) => a.quantite - b.quantite,
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
                                         >
                                    </Button>
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
        
    };

    const modBouteilleFormOk = () => {
        console.log("Commencement fonctoin modBouteilleFormOk");
        const formValues = modBouteilleForm.current.getFieldsValue();

        // Désactiver les champs "nom", "pays" et "prix" si le champ "ganreliste" n'est pas nul
        //disableFieldsIfGenrelisteNotNull(formValues);

        modBouteilleForm.current.validateFields().then((value) => {
        axios.patch(`/modiffBouteilleCellier/${modBouteille.id}`, value).then((res) => {
                 console.log(res.data);
                axios.get(`/getCeillerBouteille/${id}`).then((res) => {
                    setData(res.data);
                });
        });
        // ferme le modal
        setisUpdate(false);
        });
    };

//     function disableFieldsIfGenrelisteNotNull(bouteille) {
//         // Vérifier si le champ "ganreliste" de l'objet "bouteille" n'est pas nul
//         if (bouteille.ganreliste !== null) {
//             // Récupérer les champs "nom", "pays" et "prix" du formulaire
//             const nomField = modBouteilleForm.current.getFieldInstance("nom");
//             const paysField = modBouteilleForm.current.getFieldInstance("pays");
//             const prixField = modBouteilleForm.current.getFieldInstance("prix");

//             // Désactiver les champs "nom", "pays" et "prix"
//             nomField.disabled = true;
//             paysField.disabled = true;
//             prixField.disabled = true;
//         }
//     }



// const getNomPaysPrixRules = (bouteille) => {
//     if (isGanreliste(bouteille)) {
//         return [
//             {
//                 required: true,
//                 message: "Veuillez entrer le nom, le pays et le prix !",
//             },
//             {
//                 validator: () => Promise.reject('Impossible de modifier le nom, le pays et le prix pour une bouteille ganreliste'),
//             }
//         ];
//     } else {
//         return [
//             {
//                 required: true,
//                 message: "Veuillez entrer le nom, le pays et le prix !",
//             },
//         ];
//     }
// }



    const ajouterBoutteilAuCellierFormOk = () => {
        formulaireAjoutBouteille.current.validateFields().then((value) => {
                console.log(value);

                let objBouteille = {
                    bouteille_id: boutSelectione.id,
                    cellier_id: id,
                    date_achat: value.dateAchat,
                    quantite: value.quantite,
                };

                //verifier si le bouteille va être ajouté est déjà dans ce cellier, si oui patch(modifier la quantité), si non post
                if (
                    data.some((item) => item.bouteille_id == boutSelectione.id)
                    ) {

                    console.log("patch");
                    const bouteilleDansCellier = data.find(
                        (item) => item.bouteille_id == boutSelectione.id
                    );

                    axios
                        .patch(`/ajouteBouteilleCellierPatch/${boutSelectione.id}`,
                            {
                                quantite:
                                    bouteilleDansCellier.quantite +
                                    Number(objBouteille.quantite),
                                    id_cellier: bouteilleDansCellier.id_cellier,
                                    date_achat: objBouteille.date_achat,
                            }
                        ).then((res) => {
                            axios
                                .get(`/getCeillerBouteille/${id}`)
                                .then((res) => {
                                    setData(res.data);
                                });
                        });
                } else {
                    //console.log(objBouteille);
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
            setModalMethodEnregistrerBouteille(false);
    };

    const CardeBouteilleListe = ({ bouteille }) => {
        return (
          <Card>
            <div className="carteBouteilleListe">
                <img src={bouteille.image} alt={bouteille.nom} />
                <div className="carteBouteilleListe__infos">
                    <p><b>{bouteille.nom} </b></p>
                    <p>Pays : <b>{bouteille.pays}</b> </p>
                    <p>Type : <b>{bouteille.type}</b> </p>
                    <p>Prix : <b>{bouteille.prix}</b> $</p>
                </div>
            </div>
          </Card>
        );
      };

    const ajouterBoutteilNlAuCellierFormOk = (formData) => {

        const showErrorModal = () => {
            Modal.error({
              title: 'Erreur',
              content: 'Le nom choisi n\'est pas autorisé ! Veuillez choisir un autre nom.',
              okText: 'OK',
            });
        };


        if ( data.some((item) => item.nom === formData.nom )  ) showErrorModal();
        else if ( bouteilleSaq.some((item) => item.nom === formData.nom )  ) {
            showErrorModal();
        }
        else{
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
                garde_jusqua: formData.garde_jusqua ? formData.garde_jusqua : null,
            	url_saq: null,
                url_img: null,
                format: formData.format ? formData.format : null,
                type: formData.type_vin,
                ganreliste: 0
            };

            axios.post(`/ajouteBouteilleNl`, objNouvelleBout)
            .then((res) => {
                let objBouteille = {
                    bouteille_id: res.data,
                    cellier_id: id,
                    date_achat: formData.date_achat ? formData.date_achat : Aujourdhui,
                    quantite: formData.quantite
                };

            //console.log(objBouteille);
            axios.post(`/ajouteBouteilleCellier`, objBouteille)
                    .then((res) => {
                        //console.log(res);
                        axios.get(`/getCeillerBouteille/${id}`)
                            .then((res) => {
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
            <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 5 }}
                    rowKey={(item) => item.id}
                    className="responsive-table"
            />
            <div className="button-middle">
                <Button
                    type="primary"
                    onClick={() => setModalMethodEnregistrerBouteille(id)}
                >
                    Ajouter une nouvelle bouteille
                </Button>
            </div>

            {/* modal ajouter une nouvelle boutteille au cellier */}
            <Modal
                open={modalMethodEnregistrerBouteille}
                title="Ajouter une nouvelle bouteille listée au cellier"
                okText="Ajouter"
                cancelText="Annuler"
                onOk={() => ajouterBoutteilAuCellierFormOk()}
                onCancel={() => {
                    setModalMethodEnregistrerBouteille(false);
                }}
            >
                {/* Modal ajout une bouteille listée */}
                <Form 
                    ref={formulaireAjoutBouteille}
                    layout="vertical"
                    validateTrigger='onBlur'
                    onValuesChange={(changedValues, allValues) => {
                        setFormulaireBtLiValide(
                            allValues.quantite &&
                            allValues.prix
                        );
                    }}
                >
                Séléctionnez une bouteiile :
                <Select
                    showSearch
                    className="nom_bouteille"
                    onChange={choisirVin}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {bouteilleSaq.map((bouteille) => (
                        (bouteille.ganreliste === null) ? (<Option value={bouteille.id} key={bouteille.id}>{bouteille.nom}</Option>) : null
                    ))}
                </Select>
            {bouteilleChoisiEstNonListe ? 
                <>
                <Form.Item
                    name="nom"
                    label="Nom de la bouteille :"
                                initialValue={boutSelectione.nom}
                                rules={[
                                    {
                                        required: true,
                                        message: "Veuillez entrer au moins 3 caractères !",
                                    },
                                ]}
                            >
                    <Input type="text"/>
                </Form.Item>
                <Form.Item label="Prix (Obligatoire)" name="prix"
                                    rules={[{ required: true, message: 'Veuillez entrer le prix de la bouteille.' }]}>
                            <Input step={0.01} min="0"/>
                        </Form.Item>
                    <Form.Item
                        name="quantite"
                        label="Quantite"
                        initialValue={1}
                        rules={[
                            {
                                required: true,
                                message: "Veuillez entrer la quantité !",
                            },
                        ]}
                            >
                        <Input type="number" min="1" step="1" />
                    </Form.Item>
                <div className="elmFormBoutteilCellier">
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
                            <Input type="date"/>
                            </Form.Item>
                        </div>
                        <Form.Item label="Type de vin (Obligatoire)" name="type_vin" rules={[{ required: true, message: 'Veuillez choisir le type de vin.' }]}>
                            <Select>
                                <Option value="1">Vin rouge</Option>
                                <Option value="2">Vin blanc</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Veuillez sélectionner le pays (optionnelle)" name="pays">
                                    <Select
                                         showSearch
                                        filterOption={
                                            (input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {listePays.map((pays) => (
                                            <Option key={pays.value} value={pays.value} label={pays.label}>
                                                {pays.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                        <Collapse bordered={false}>
                            <Panel header="Options supplémentaires" key="1">
                                <Form.Item label="Millesime" name="millesime"><Input type="date" /></Form.Item>
                                <Form.Item label="Garde" name="garde_jusqua"><Input type="date" /></Form.Item>
                                <Form.Item label="Note" name="note"><Input type="number" min={0} max={5} /></Form.Item>
                                <Form.Item label="Image" name="image"><Input /></Form.Item>
                                <Form.Item label="Format" name="format"><Input /></Form.Item>
                                <Form.Item label="Description" name="description"><Input.TextArea /></Form.Item>
                            </Panel>
                        </Collapse>
                    </> : 
                    <>
                        <CardeBouteilleListe bouteille={boutSelectione} />
                    <Form.Item
                        name="quantite"
                        label="Quantite"
                        initialValue={1}
                        rules={[
                            {
                                required: true,
                                message: "Veuillez entrer la quantité !",
                            },
                        ]}
                            >
                        <Input type="number" min="1" step="1" />
                    </Form.Item>
                    </> 
                    }
                </Form>
            </Modal>

            <Modal
               open={modalAjouteBoutteilNonListeAuCellier}
               title="Ajouter une nouvelle bouteille non listée"
               onCancel={() => {setModalAjouteBoutteilNonListeAuCellier(false)}}
               footer={[
                <Button key="Ajouter" type="primary"
                        disabled={!formulaireBtNlValide}
                        onClick={() => {
                            // récupérez les données du formulaire
                            const formData = ajouteBoutteilNonListeAuCellierForm.current.getFieldsValue();
                            ajouterBoutteilNlAuCellierFormOk(formData);
                        }}>
                    Ajouter
                </Button>,
                <Button key="annuler" onClick={() => setModalAjouteBoutteilNonListeAuCellier(false)}>
                    Annuler
                </Button>,
            ]}>

               {/* formulaire d'ajout d'une bouteille non listée */}
               <Form ref={ajouteBoutteilNonListeAuCellierForm}
                     layout="vertical"
                     validateTrigger='onBlur'
                     onValuesChange={(changedValues, allValues) => {
                        setFormulaireBtNlValide(
                            allValues.nom &&
                            allValues.quantite &&
                            allValues.prix &&
                            allValues.type_vin
                        );
                        //console.log(formulaireBtNlValide);
                      }}>


>
                    <Form.Item hidden label="ganreliste" name="ganreliste" initialValue="0"><Input /></Form.Item>
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
                    <Form.Item
                        name="nom"
                        label="Nom"

                    >
                        <Input  />
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
                        ]}>
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
                                    value: "1",
                                    label: "Vin rouge",
                                },
                                {
                                    value: "2",
                                    label: "Vin blanc",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="id" label="id" hidden="true"><Input /></Form.Item>
                    <Form.Item name="id_cellier"   label="id_cellier" hidden="true"><Input /></Form.Item>
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
