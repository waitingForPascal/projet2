import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

import * as Echarts from "echarts";

export default function Statistique() {
    // const [usagers, setUsagers] = useState([]);
    const [nombreUsager, setnombreUsager] = useState("");
    const [nombreCellier, setnombreCellier] = useState("");
    const [nombreCellierUsager, setnombreCellierUsager] = useState([]);
    const [valeurTous, setValeurTous] = useState("");
    const [valeurUsager, setValeurUsager] = useState([]);
    const [valeurCellier, setValeurCellier] = useState([]);
    const [nombreBouteilleCellier, setNombreBouteilleCellier] = useState([]);
    const [nombreBouteilleUsager, setNombreBouteilleUsager] = useState([]);

    const barRef = useRef();

    // liste d'usager
    useEffect(() => {
        axios.get("/getTousUser").then((res) => {
            console.log(res.data);
            let usagers = res.data.map((usager) => {
                return usager.name;
            });
            renderView(usagers);
            // setUsagers(res.data);
        });
    }, []);

    // le nombre d'usager
    useEffect(() => {
        axios.get("/getNombreUsager").then((res) => {
            console.log(res.data);
            setnombreUsager(res.data);
        });
    }, []);

    //  le nombre de cellier
    useEffect(() => {
        axios.get("/getNombreCellier").then((res) => {
            console.log(res.data);
            setnombreCellier(res.data);
        });
    }, []);

    //  le nombre de cellier par usager
    useEffect(() => {
        axios.get("/getNombreCellierUsager").then((res) => {
            console.log(res.data);
            setnombreCellierUsager(res.data);
        });
    }, []);

    //  la valeur total des bouteilles
    useEffect(() => {
        axios.get("/getValeurTous").then((res) => {
            console.log(res.data);
            setValeurTous(res.data);
        });
    }, []);

    //  la valeur total des bouteilles par usager
    useEffect(() => {
        axios.get("/getValeurUsager").then((res) => {
            console.log(res.data);
            setValeurUsager(res.data);
        });
    }, []);

    //  la valeur total des bouteilles par cellier
    useEffect(() => {
        axios.get("/getValeurCellier").then((res) => {
            console.log(res.data);
            setValeurCellier(res.data);
        });
    }, []);

    //   le nombre de bouteille par cellier
    useEffect(() => {
        axios.get("/getNombreBouteilleCellier").then((res) => {
            console.log(res.data);
            setNombreBouteilleCellier(res.data);
        });
    }, []);

    //   le nombre de bouteille par usager.
    useEffect(() => {
        axios.get("/getNombreBouteilleUsager").then((res) => {
            console.log(res.data);
            setNombreBouteilleUsager(res.data);
        });
    }, []);

    // barView
    const renderView = (usagers) => {
        var myChart = Echarts.init(barRef.current);
        var option;

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
                    name: "nombre de cellier par usager",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: [320, 302, 301, 334, 390, 330, 320],
                },
                {
                    name: "nombre de bouteilles par usager",
                    type: "bar",
                    stack: "total",
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
            ],
        };

        option && myChart.setOption(option);
    };

    return (
        <div>
            <div
                ref={barRef}
                style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "50px",
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
