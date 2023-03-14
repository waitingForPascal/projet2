import React from "react";
import ReactDOM from "react-dom/client";

export default function Ajout() {
    return (
        <div class="nouvelleBouteille" vertical layout>
            Recherche : <input type="text" name="nom_bouteille" />
            <ul class="listeAutoComplete"></ul>
            <div>
                <p>
                    Nom : <span data-id="" class="nom_bouteille"></span>
                </p>
                <p>
                    Millesime : <input name="millesime" />
                </p>
                <p>
                    Quantite : <input name="quantite" value="1" />
                </p>
                <p>
                    Date achat : <input name="date_achat" />
                </p>
                <p>
                    Prix : <input name="prix" />
                </p>
                <p>
                    Garde : <input name="garde_jusqua" />
                </p>
                <p>
                    Notes <input name="notes" />
                </p>
            </div>
            <button name="ajouterBouteilleCellier">
                Ajouter la bouteille (champs tous obligatoires)
            </button>
        </div>
    );
}

if (document.getElementById("ajout")) {
    const Index = ReactDOM.createRoot(document.getElementById("ajout"));

    Index.render(
        <React.StrictMode>
            <Ajout />
        </React.StrictMode>
    );
}
