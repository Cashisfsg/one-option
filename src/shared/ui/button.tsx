import { cn } from "../lib";

interface ButtonProps extends React.ComponentProps<"button"> {}

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button
            className={cn(
                "rounded-lg bg-violet-primary px-10 py-2.5",
                className
            )}
            {...props}
        />
    );
};
