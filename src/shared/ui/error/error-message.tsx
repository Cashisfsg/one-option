import { cnBase } from "tailwind-variants";

interface ErrorMessageProps
    extends Omit<React.ComponentPropsWithoutRef<"output">, "role"> {
    children?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <output
            {...props}
            role="alert"
            className={cnBase(
                "hidden items-center gap-x-1 font-secondary text-xs text-red-primary peer-aria-[invalid=true]:flex",
                className
            )}
        >
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z" />
            </svg>
            {children}
        </output>
    );
};
