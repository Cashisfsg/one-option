import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const TokenPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if ("token" in params) {
            sessionStorage.setItem(
                "token",
                JSON.stringify({ token: params.token })
            );
        }

        navigate("/auth/sign/up");
    }, [params]);

    return <></>;
};
