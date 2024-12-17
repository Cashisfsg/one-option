import { useLayoutEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/app/providers/redux/hooks";
import { login } from "@/shared/api/authSlice";

export const GoogleAuthenticationPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        if (!searchParams.has("token")) return;

        dispatch(
            login({ token: searchParams.get("token")!, storage: localStorage })
        );
    }, [searchParams]);

    return <Navigate to="/" />;
};
