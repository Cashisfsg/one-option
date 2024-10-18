import { cnBase } from "tailwind-variants";

import "./index.css";

interface UserFTDMeterProps extends React.ComponentProps<"div"> {
    "aria-valuenow": number;
    "aria-valuemax": number;
}

export const UserFTDMeter: React.FC<UserFTDMeterProps> = ({
    className,
    ...props
}) => {
    return (
        <div
            role="meter"
            style={
                {
                    "--progress": `${Math.round((props["aria-valuenow"] / props["aria-valuemax"]) * 100)}%`
                } as React.CSSProperties
            }
            className={cnBase("meter", className)}
            {...props}
        >
            FTD {props["aria-valuenow"]} / {props["aria-valuemax"]}
        </div>
    );
};
