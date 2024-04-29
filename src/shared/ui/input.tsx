import { cn } from "../lib";

interface InputProps extends React.ComponentProps<"input"> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            autoComplete="off"
            className={cn(
                "h-11 w-full rounded-lg bg-quaternary px-4 outline-offset-2 outline-slate-100 placeholder:text-white/30 focus-visible:outline",
                className
            )}
            {...props}
        />
    );
};
