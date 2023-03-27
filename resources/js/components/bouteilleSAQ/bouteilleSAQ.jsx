import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Table, Button, Form, Input,Modal, Switch } from "antd";
import "./BouteilleSAQ.css";
import axios from "axios";

export default function BouteilleSAQ() {

    const [responseData, setResponseData] = useState(null);
    const [formValues, setFormValues] = useState({
        page: '',
        nb: '',
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };

      let message = "";
      const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formValues)

        axios.post('/importerBouteilles',formValues).then((res)=>{
            console.log(res.data);
            // Enregistrez les données de réponse dans l'état
            setResponseData(res.data);
          })
      };
      
    return (
        <div>
            <h3>Choissez le page et le nombre pour importer</h3>
            <form onSubmit={handleSubmit} className='form-importer'>
                
                <label>Page : </label>
                <input type="text" name="page" value={formValues.page} onChange={handleInputChange} />
                
                <label>Nombre : </label>
                <input type="text" name="nb" value={formValues.nb} onChange={handleInputChange} />
              
                <Button type="primary" htmlType="submit" className='btn-importer'>Soumettre </Button>
            </form>

            {responseData && (
                <div>
                <p>Résultat:</p>
                <div dangerouslySetInnerHTML={{ __html: responseData }} />
                </div>
            )}

        </div>
  );
 }

if (document.getElementById("bouteilleSAQ")) {
    const Index = ReactDOM.createRoot(document.getElementById("bouteilleSAQ"));

    Index.render(
        <React.StrictMode>
            <BouteilleSAQ />
        </React.StrictMode>
    );
}
