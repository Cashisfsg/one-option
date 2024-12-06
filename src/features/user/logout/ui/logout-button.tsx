import { Link, useNavigate } from "react-router-dom";
import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

import { cnBase } from "tailwind-variants";

import { useSignOutMutation } from "@/shared/api";

interface SignOutButtonProps extends React.ComponentPropsWithoutRef<"a"> {}

export const SignOutButton: React.FC<SignOutButtonProps> = ({
    className,
    onClick,
    children,
    ...props
}) => {
    const navigate = useNavigate();
    const [signOut] = useSignOutMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLAnchorElement
    > = async event => {
        event.preventDefault();

        try {
            await signOut().unwrap();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Link
            to="/"
            onClick={composeEventHandlers(onClick, onClickHandler)}
            className={cnBase("flex h-full items-center", className)}
            {...props}
        >
            {children}
            <span className="sr-only">Logout</span>
        </Link>
    );
};
