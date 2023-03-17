import React from "react";
import ReactDOM from "react-dom/client";
import { useLocation } from 'react-router-dom';

// import { useParams } from "react-router-dom";
export default function Test() {
        const location = useLocation();
        const unCellier = location.state.myData;
      
        // render the page using unCellier
        return (
          <div>
            <p>{unCellier.someData}</p>
          </div>
        );
}

if (document.getElementById("test")) {
    const Index = ReactDOM.createRoot(document.getElementById("test"));

    Index.render(
        <React.StrictMode>
            <Test />
        </React.StrictMode>
    );
}
