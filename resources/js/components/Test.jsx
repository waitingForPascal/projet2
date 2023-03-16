import React from "react";
import ReactDOM from "react-dom/client";
// import { useParams } from "react-router-dom";
export default function Test() {
    // let { id } = useParams();
    // console.log(id);
    // console.log(useParams());
    // console.log(id);
    return <div>Test</div>;
}

if (document.getElementById("test")) {
    const Index = ReactDOM.createRoot(document.getElementById("test"));

    Index.render(
        <React.StrictMode>
            <Test />
        </React.StrictMode>
    );
}
