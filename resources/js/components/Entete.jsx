import React from "react";
import ReactDOM from "react-dom/client";

export default function Entete() {
    return (
        <div>
            <h1>Un petit verre de vino ?</h1>
            <nav>
                <ul>
                    <li>
                        <a href="/accueil">Mon cellier</a>
                    </li>
                    <li>
                        <a href="/ajout">Ajouter une bouteille au cellier</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

if (document.getElementById("entete")) {
    const Index = ReactDOM.createRoot(document.getElementById("entete"));

    Index.render(
        <React.StrictMode>
            <Entete />
        </React.StrictMode>
    );
}
