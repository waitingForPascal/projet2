import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Result } from "antd";
export default function NotFound() {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary">
                        <a
                            style={{
                                textDecoration: "none",
                            }}
                            href="/home"
                        >
                            Accueil
                        </a>
                    </Button>
                }
            />
        </div>
    );
}

if (document.getElementById("notFound")) {
    const Index = ReactDOM.createRoot(document.getElementById("notFound"));

    Index.render(
        <React.StrictMode>
            <NotFound />
        </React.StrictMode>
    );
}
