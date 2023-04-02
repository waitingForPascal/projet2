import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Button, Col, Row, Statistic, Drawer } from "antd";
import * as Echarts from "echarts";

export default function Statistique() {
    const [usagers, setUsagers] = useState([]);
    const [nombreUsager, setnombreUsager] = useState("");
    const [nombreCellier, setnombreCellier] = useState("");
    const [nombreCellierUsager, setnombreCellierUsager] = useState([]);
    const [valeurTous, setValeurTous] = useState("");
    const [valeurUsager, setValeurUsager] = useState([]);
    const [valeurCellier, setValeurCellier] = useState([]);
    const [nombreBouteilleCellier, setNombreBouteilleCellier] = useState([]);
    const [nombreBouteilleUsager, setNombreBouteilleUsager] = useState([]);
    const [open, setOpen] = useState(false);
    const [openValeur, setopenValeur] = useState(false);

    const [drawerChart, setdrawerChart] = useState(null);
    const [drawerValeurChart, setdrawerValeurChart] = useState(null);
    const [renderViewChart, setrenderViewChart] = useState(null);
    const [renderViewVChart, setrenderViewVChart] = useState(null);

    // nombreCellierUsager, nombreBouteilleUsager
    const barRefn = useRef();
    // la valeur de bouteille par usager
    const barRefvb = useRef();
    // le nombre de bouteille par cellier
    const drawerRef = useRef();
    // la valeur total des bouteilles par cellier
    const drawerValeurRef = useRef();

    // liste d'usager
    useEffect(() => {
        axios.get("/getTousUser").then((res) => {
            // console.log(res.data);
            let listeUsagers = res.data.map((usager) => {
                return usager.name;
            });
            // console.log(listeUsagers);
            setUsagers(listeUsagers);
        });
    }, []);

    // le nombre d'usager
    useEffect(() => {
        axios.get("/getNombreUsager").then((res) => {
            // console.log(res.data);
            setnombreUsager(res.data);
        });
    }, []);

    //  le nombre de cellier
    useEffect(() => {
        axios.get("/getNombreCellier").then((res) => {
            // console.log(res.data);
            setnombreCellier(res.data);
        });
    }, []);

    //  le nombre de cellier par usager
    useEffect(() => {
        axios.get("/getNombreCellierUsager").then((res) => {
            // console.log(res.data);
            let listeNombreCellierUsager = res.data.map((item) => {
                return item.nombreCellierUsager;
            });
            // console.log(listeNombreCellierUsager);
            setnombreCellierUsager(listeNombreCellierUsager);
        });
    }, []);

    //  la valeur total des bouteilles
    useEffect(() => {
        axios.get("/getValeurTous").then((res) => {
            // console.log(res.data);
            setValeurTous(res.data);
        });
    }, []);

    //  la valeur total des bouteilles par usager
    useEffect(() => {
        axios.get("/getValeurUsager").then((res) => {
            // console.log(res.data);
            let listeValeurUsager = res.data.map((valeur) => {
                return valeur.total_prix;
            });
            setValeurUsager(listeValeurUsager);
        });
    }, []);

    //  la valeur total des bouteilles par cellier
    useEffect(() => {
        axios.get("/getValeurCellier").then((res) => {
            // console.log(res.data);
            setValeurCellier(res.data);
        });
    }, []);

    //   le nombre de bouteille par cellier
    useEffect(() => {
        axios.get("/getNombreBouteilleCellier").then((res) => {
            // console.log(res.data);
            setNombreBouteilleCellier(res.data);
        });
    }, []);

    //   le nombre de bouteille par usager.
    useEffect(() => {
        axios.get("/getNombreBouteilleUsager").then((res) => {
            // console.log(res.data);
            let listeNombreBouteilleUsager = res.data.map((item) => {
                return item.total_quantite;
            });
            setNombreBouteilleUsager(listeNombreBouteilleUsager);
        });
    }, []);

    // générer la vue de nombreCellierUsager, nombreBouteilleUsager
    useEffect(() => {
        if (usagers && nombreCellierUsager && nombreBouteilleUsager) {
            renderView(usagers, nombreCellierUsager, nombreBouteilleUsager);
        } else {
            console.log(2);
        }
    }, [usagers, nombreCellierUsager, nombreBouteilleUsager]);

    // générer la vue de value de bouteille par usager
    useEffect(() => {
        if (usagers && valeurUsager) {
            renderViewV(usagers, valeurUsager);
        }
    }, [usagers, valeurUsager]);

    // barViewn le nombre de cellier par usager et le nombre de bouteille par usager
    const renderView = (
        usagers,
        nombreCellierUsager,
        nombreBouteilleUsager
    ) => {
        let myChart;
        if (!renderViewChart) {
            myChart = Echarts.init(barRefn.current);
            setrenderViewChart(myChart);
        } else {
            myChart = renderViewChart;
        }
        let option;

        option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
                position: ["6%", "-20%"],
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "value",
            },
            yAxis: {
                type: "category",
                data: usagers,
            },
            series: [
                {
                    name: "le nombre de cellier par usager",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: nombreCellierUsager,
                },
                {
                    name: "le nombre de bouteilles par usager",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: nombreBouteilleUsager,
                },
            ],
        };
        option && myChart.setOption(option);
    };

    // barView valeur total des bouteilles par usager
    const renderViewV = (usagers, valeurUsager) => {
        let myChartv;
        if (!renderViewVChart) {
            myChartv = Echarts.init(barRefvb.current);
            setrenderViewVChart(myChartv);
        } else {
            myChartv = renderViewVChart;
        }
        let option;

        option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
                position: ["6%", "-20%"],
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "value",
            },
            yAxis: {
                type: "category",
                data: usagers,
            },
            series: [
                {
                    name: "la valeur total des bouteilles par usager",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: valeurUsager,
                    itemStyle: {
                        color: "#F44336",
                    },
                },
            ],
        };

        option && myChartv.setOption(option);
    };

    //barView le nombre de bouteille par cellier
    const renderDrawer = () => {
        let myChart;
        if (!drawerChart) {
            myChart = Echarts.init(drawerRef.current);
            setdrawerChart(myChart);
        } else {
            myChart = drawerChart;
        }
        let option;

        option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
                position: ["6%", "-3%"],
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "value",
            },
            yAxis: {
                type: "category",
                data: nombreBouteilleCellier.map((item) => {
                    return item.nom;
                }),
            },
            series: [
                {
                    name: "le nombre de bouteilles par cellier",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: nombreBouteilleCellier.map((item) => {
                        return item.total_quantite;
                    }),
                },
            ],
        };

        option && myChart.setOption(option);
    };

    //barView la valeur total des bouteilles par cellier
    const renderDrawerValeur = () => {
        let myChart;
        if (!drawerValeurChart) {
            myChart = Echarts.init(drawerValeurRef.current);
            setdrawerChart(myChart);
        } else {
            myChart = drawerValeurChart;
        }
        let option;

        option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                },
                position: ["6%", "-3%"],
            },
            legend: {},
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            xAxis: {
                type: "value",
            },
            yAxis: {
                type: "category",
                data: valeurCellier.map((item) => {
                    return item.nom;
                }),
            },
            series: [
                {
                    name: "la valeur total des bouteilles par cellier",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: valeurCellier.map((item) => {
                        return item.total_prix;
                    }),
                    itemStyle: {
                        color: "#F44336",
                    },
                },
            ],
        };

        option && myChart.setOption(option);
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic
                        title="le nombre d'usager"
                        value={nombreUsager}
                    />
                </Col>

                <Col span={12}>
                    <Statistic
                        title="la valeur total des bouteilles"
                        value={valeurTous}
                        precision={2}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="le nombre de cellier"
                        value={nombreCellier}
                    />
                    <Button
                        style={{
                            marginTop: 16,
                        }}
                        type="primary"
                        onClick={() => {
                            setOpen(true);
                            setTimeout(() => {
                                renderDrawer();
                            }, 0);
                        }}
                    >
                        le nombre de bouteille par cellier
                    </Button>

                    <Button
                        style={{
                            marginTop: 16,
                        }}
                        type="primary"
                        onClick={() => {
                            setopenValeur(true);
                            setTimeout(() => {
                                renderDrawerValeur();
                            }, 0);
                        }}
                    >
                        la valeur total des bouteilles par cellier
                    </Button>
                </Col>
            </Row>
            <Drawer
                marginTop="20%"
                height="70%"
                title="le nombre de bouteille par cellier"
                placement="bottom"
                onClose={() => {
                    setOpen(false);
                }}
                open={open}
            >
                <div
                    ref={drawerRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "60px",
                    }}
                ></div>
            </Drawer>
            <Drawer
                marginTop="20%"
                height="70%"
                title="la valeur total des bouteilles par cellier"
                placement="bottom"
                onClose={() => {
                    setopenValeur(false);
                }}
                open={openValeur}
            >
                <div
                    ref={drawerValeurRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "60px",
                    }}
                ></div>
            </Drawer>
            <div
                ref={barRefn}
                style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "60px",
                }}
            ></div>

            <div
                ref={barRefvb}
                style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "60px",
                    marginBottom: "60px",
                }}
            ></div>
        </div>
    );
}

if (document.getElementById("statistique")) {
    const Index = ReactDOM.createRoot(document.getElementById("statistique"));

    Index.render(
        <React.StrictMode>
            <Statistique />
        </React.StrictMode>
    );
}
