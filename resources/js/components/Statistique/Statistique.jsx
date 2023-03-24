import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

export default function Statistique() {
    // // le nombre d'usager
    // useEffect(() => {
    //     axios.get("/getNombreUsager").then((res) => {
    //         console.log(res.data);
    //         // setData(res.data);
    //     });
    // }, []);

    
    // //  le nombre de cellier
    // useEffect(() => {
    //     axios.get("/getNombreCellier").then((res) => {
    //         console.log(res.data);
    //         // setData(res.data);
    //     });
    // }, []);


    // //  le nombre de cellier par usager
    // useEffect(() => {
    //     axios.get("/getNombreCellierUsager").then((res) => {
    //         console.log(res.data);
    //         // setData(res.data);
    //     });
    // }, []);

    return <div>Statistique</div>;
}

if (document.getElementById("statistique")) {
    const Index = ReactDOM.createRoot(document.getElementById("statistique"));

    Index.render(
        <React.StrictMode>
            <Statistique />
        </React.StrictMode>
    );
}
