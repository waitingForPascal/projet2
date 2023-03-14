import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./Ajout.css"
import { Button } from "antd";



export default function Ajout() {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    
    const choisirVin = (elm) => {
        data.forEach(bouteiile => {
            if(bouteiile.id == Number(elm.target.value)){
                setData1(bouteiile)
            }

        })
    };

    const quantiteChange = (elm) => {
        setData2(Number(elm.target.value))
    };


    const dateAchatChange = (elm) => {
        //setData3(Date(elm.target.value));
        setData3(elm.target.value);
    };

    useEffect(() => {
        axios.get("/getBouteillesSAQ").then((res) => {
            setData(res.data);
        });
    }, []);


    const ajouteBouteille = (urg1, urg2, urg3, urg4) => {
        console.log("fonction ajout marche");
        console.log("id:",urg1);
        console.log("qant:",urg2);
        console.log("dateAchate",urg3);
        console.log("celier",urg4);


        let objBouteille = {
            'bouteilles_id' : urg1,
            'celliers_id'   : urg4,
            'data_achat'    : urg3,
            'quantite'      : urg2,
        }


        axios.post("/ajouteBouteillesCellier").then((res) => {
          console.log(res);
        });
        
    };

    return (
        <div className="nouvelleBouteille" vertical layout>
            <>
                <ul className="listeAutoComplete"></ul>
                <div>
                    <p>
                        Nom : 
                        <select data-id="" className="nom_bouteille" onChange={choisirVin}>
                            <option value="">Selectionnez le vin</option>
                            {data.map((bouteiile) => (
                                <option value={bouteiile.id}>{bouteiile.nom}</option>
                                ) )}
                        </select>
                    </p>

                    <p>Pays : <input name="pays" value={data1.pays}/></p>
                    <p>Millesime : <input name="millesime" value={data1.millesime}/></p>
                    <p>Quantite : <input name="quantite" placeholder="0" type="number" min="1" step="1" onChange={quantiteChange}/></p>
                    <p>Date achat : <input name="date_achat" type="date" onChange={dateAchatChange}/></p>
                    <p>Prix : <input name="prix" value={data1.prix_saq}/></p>
                    <p>Notes <input name="notes" value={data1.note}/></p>
                    <p><input type="hidden" name="cellier_id" value="1"/> </p>
                    <Button
                        type="primary"
                        name="ajouterBouteilleCellier"
                        onClick={() => { ajouteBouteille(data1.id, data2 , data3, 1);}}
                    >Ajouter la bouteille</Button>
                </div>
            </>
            <>
                {data1.id ? <div>
                    <img src="https://cdn.shopify.com/s/files/1/1057/2942/products/3-frontenac_720x.jpg?v=1631750927" alt="Bouteille" />
                    <img src="/projet2/public/image/vin/01.jpg" alt=""/>
                    <h3>Description:</h3>
                    <p>{data1.description}</p>
                </div>: <p>Choisissez une bouteiile S.V.P</p>}
            </>
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
