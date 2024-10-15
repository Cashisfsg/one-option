import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIncrementTokenCounterMutation } from "@/shared/api";

export const TokenPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [incrementTokenCounter] = useIncrementTokenCounterMutation();

    useEffect(() => {
        (async () => {
            try {
                console.log("Token: ", params.token);

                if ("token" in params && params.token !== undefined) {
                    sessionStorage.setItem(
                        "token",
                        JSON.stringify({ token: params.token })
                    );
                    await incrementTokenCounter({
                        token_ref: params.token
                    }).unwrap();
                }
            } catch (error) {
                console.error(error);
            } finally {
                navigate("/auth/sign/up");
            }
        })();
    }, [params]);

    return <></>;
};
