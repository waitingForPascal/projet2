import React, { useEffect, useState, useRef } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import ReactDOM from "react-dom/client";
import { Table, Button, Modal, Form, Input } from "antd";
import "./ListeUsager.css";

const { confirm } = Modal;

export default function ListeUsager() {
    const [user, setuser] = useState([]);
    const [isUpdate, setisUpdate] = useState(false);
    const modUserForm = useRef(null);
    const [modUsager, setmodUsager] = useState(null);

    useEffect(() => {
        // obtenir la liste d'usager
        axios.get("/getTousUser").then((res) => {
            // console.log(res.data);

            setuser(res.data);
        });
    }, []);
    const columns = [
        {
            title: "Usager",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
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
                            onClick={() => confirmMethod(item)}
                            disabled={item.privilege === "admin" ? true : false}
                        ></Button>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            disabled={item.privilege === "admin" ? true : false}
                            onClick={() => handleUpdate(item)}
                        ></Button>
                    </div>
                );
            },
        },
    ];
    const handleUpdate = (item) => {
        // console.log(item);

        // Enregistrer les informations de l'utilisateur actuel
        setmodUsager(item);

        // ouvrir le modal
        setisUpdate(true);

        // mettre les informations d'utilisateur dans le formulaire
        setTimeout(() => {
            modUserForm.current.setFieldsValue(item);
        }, 0);
    };

    const modUserFormOk = () => {
        // vilidation de form
        modUserForm.current.validateFields().then((value) => {
            // console.log(value);
            // console.log(modUsager);

            // envoyer une requête pour la modification d'usager
            axios.patch(`/modUser/${modUsager.id}`, value).then((res) => {
                
                // Récupérer les données, actualiser la page
                // console.log(res.data);
                axios.get("/getTousUser").then((res) => {
                    setuser(res.data);
                });
            });

            // fermer le modal
            setisUpdate(false);
        });
    };

    const confirmMethod = (usager) => {
        confirm({
            title: "Voulez-vous supprimer cet usager ?",
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteMethod(usager);
            },
            onCancel() {},
        });
    };

    const deleteMethod = (usager) => {
        // console.log(usager);

        axios.delete(`/deleteUser/${usager.id}`).then((res) => {
            // Récupérer les données, actualiser la page
            axios.get("/getTousUser").then((res) => {
                setuser(res.data);
            });
        });
    };
    return (
        <div>
            <Table
                columns={columns}
                dataSource={user}
                pagination={{ pageSize: 5 }}
                rowKey={(item) => item.id}
            />

            <Modal
                open={isUpdate}
                title="Mettre à jour l'utilisateur"
                okText="Mettre à jour"
                cancelText="Annuler"
                onCancel={() => {
                    setisUpdate(false);
                    // console.log(isUpdateDisabled);
                    // setisUpdateDisabled(!isUpdateDisabled);
                }}
                onOk={() => modUserFormOk()}
            >
                <Form ref={modUserForm} layout="vertical">
                    <Form.Item
                        name="name"
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

if (document.getElementById("listeUsager")) {
    const Index = ReactDOM.createRoot(document.getElementById("listeUsager"));

    Index.render(
        <React.StrictMode>
            <ListeUsager />
        </React.StrictMode>
    );
}
