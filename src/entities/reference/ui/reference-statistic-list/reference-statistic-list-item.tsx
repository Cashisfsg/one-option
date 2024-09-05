import { cnBase } from "tailwind-variants";

import DashboardSprite from "@/assets/img/svg/dashboard-sprite.svg";

import { FetchReferenceChartDataResponse } from "../../api";

export interface StatisticItem {
    id: number;
    label: string;
    key: keyof FetchReferenceChartDataResponse;
    icon: string;
}

interface ReferenceStatisticListItemProps
    extends React.ComponentPropsWithoutRef<"li"> {
    statistic: StatisticItem;
    data: FetchReferenceChartDataResponse;
}

export const ReferenceStatisticListItem: React.FC<
    ReferenceStatisticListItemProps
> = ({ className, data, statistic, ...props }) => {
    return (
        <li
            className={cnBase(
                "grid grid-cols-2 gap-y-3 rounded-2xl bg-[#2b2930] px-4 py-3 @container first:bg-violet-primary [&:nth-child(2)]:bg-violet-secondary",
                className
            )}
            {...props}
        >
            <h2 className="col-span-2 row-start-3 text-sm/none @[15rem]:row-start-1 @[15rem]:text-lg/none">
                {statistic.label}
            </h2>

            <svg
                width="45"
                height="45"
            >
                <use xlinkHref={`${DashboardSprite}#${statistic.icon}`} />
            </svg>

            <span className="col-span-2 mt-4 self-center text-2xl leading-none @[15rem]:col-span-1 @[15rem]:mt-0 @[15rem]:text-3xl">
                {data?.[statistic.key]} $
            </span>
        </li>
    );
};
