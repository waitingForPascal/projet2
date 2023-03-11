import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Button } from "antd";

function Example() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/api/blog").then((res) => {
            setData(res.data);
        });

    }, []);
    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.nom}</p>
                </div>
            ))}
            <Button type="primary">Submit</Button>
            <Button danger>Submit</Button>
            {/* <Test /> */}
        </div>
    );
}

export default Example;

if (document.getElementById("example")) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
}
