import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

export default function Bouteille() {
    const [admin, setadmin] = useState(false);

    useEffect(() => {
        axios.get("/verificationUser").then((res) => {  
            console.log(res.data);
            if (res.data == "admin") {
                setadmin(true);
            }
        });
    }, []);
    return (
        <div>
            page bouteille
        </div>
    );
}

if (document.getElementById("bouteille")) {
    const Index = ReactDOM.createRoot(document.getElementById("bouteille"));

    Index.render(
        <React.StrictMode>
            <Bouteille />
        </React.StrictMode>
    );
}
