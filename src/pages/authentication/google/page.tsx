import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { useAppDispatch } from "@/app/providers/redux/hooks";
import { login } from "@/shared/api/authSlice";

export const GoogleAuthenticationPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const queryString = window.location.search;

        const searchParams = new URLSearchParams(queryString);

        console.log(queryString);
        console.log(searchParams);
        console.log(searchParams.get("token"));

        if (searchParams.has("token")) {
            dispatch(login({ token: searchParams.get("token")! }));
        }
    }, []);

    return <></>;
};
