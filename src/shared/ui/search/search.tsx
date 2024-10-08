interface RootProps extends React.ComponentPropsWithoutRef<"search"> {}

export const Root: React.FC<RootProps> = props => {
    return <search {...props} />;
};

Root.displayName = "Search.Root";

interface FormProps extends React.ComponentPropsWithoutRef<"form"> {}

export const Form: React.FC<FormProps> = props => {
    return <form {...props} />;
};

Form.displayName = "Search.Form";

interface InputProps extends React.ComponentPropsWithRef<"input"> {}

export const Input: React.FC<InputProps> = ({
    type = "search",
    name = "query",
    autoComplete = "off",
    ...props
}) => {
    return (
        <input
            type={type}
            name={name}
            autoComplete={autoComplete}
            {...props}
        />
    );
};

Input.displayName = "Search.Input";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button: React.FC<ButtonProps> = props => {
    return <button {...props} />;
};

Button.displayName = "Search.Button";
