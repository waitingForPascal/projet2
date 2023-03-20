import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Button, Table, Input, Typography, Space } from "antd";
import { 
    SearchOutlined,
    DeleteOutlined,
    EditOutlined, } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "./Cellier.css";

// import '../theme.less'; // Import the theme file

export default function Cellier() {
    const [data, setData] = useState([]);
    const id = window.location.pathname.split("/").pop();
    // console.log(id);

    useEffect(() => {
        // récupérer les bouteilles dans le cellier spécial
        axios.get(`/getCeillerBouteille/${id}`).then((res) => {
            console.log(res.data);
            setData(res.data);
        });
    }, []);

    // Faire la recherche
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
                marginBottom: 8,
                display: 'block',
            }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                width: 90,
                }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
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
            color: filtered ? '#1890ff' : undefined,
            }}
        />
        ),
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            <Highlighter
            highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
    });


  
    const columns = [
        {
            title: "Nom",
            dataIndex: "nom",
            key: 'nom',
            width: '30%',
            ...getColumnSearchProps('nom'),
            sorter: (a, b) => a.nom.localeCompare(b.nom),
        },
        {
            title: "Quantité",
            dataIndex: "quantite",
            key: 'quantite',
            width: '20%',
            ...getColumnSearchProps('quantite'),
            sorter: {
                compare: (a, b) => a.quantite - b.quantite,
            },
        },
        {
            title: "Pays",
            dataIndex: "pays",
            key: 'pays',
            width: '20%',
            ...getColumnSearchProps('pays'),
            sorter: (a, b) => a.pays.localeCompare(b.pays),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: 'type',
            width: '20%',
            ...getColumnSearchProps('type'),
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Prix",
            dataIndex: "prix",
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
                            onClick={() => confirmMethod(item)}
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
        }
        
    ];

    const AjouteBoutteilAuCellier = (id_cellier) => {
        console.log("Test",id_cellier);
        // setmodCellier(cellier);

        // setIsOpen(true);
        // // console.log(cellier);

        // // Voici le fonctionnement asynchrone, s'il y a pas setTimeout, on ne peut pas obtenir les information de bouteille Lorsqu'on ouvre le formulaire pour la première fois
        // setTimeout(() => {
        //     modBouteilleForm.current.setFieldsValue(cellier);
        // }, 0);
    };

    return (
        // <div style={{ width: "80%", margin: "auto" }}>
        <div>
            {/* ovrire le modal d'ajout de cellier */}
            {/* <Button
                type="primary"
                // onClick={() => {
                //     setmodalAjoutCellier(true);
                // }}
            >
                Ajouter un bouteille
            </Button> */}
            <div className="button-right">
                <span></span>
                <Button  type="primary" ghost>Retouner</Button>
            </div>
            <Table columns={columns} dataSource={data} />
            <div className="button-middle">
                <Button type="primary"
                    onClick={() =>
                        AjouteBoutteilAuCellier(id)
                    }
                >
                Ajouter une nouvelle bouteil</Button>
            </div>
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
