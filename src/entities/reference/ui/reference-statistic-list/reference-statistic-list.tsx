import { cnBase } from "tailwind-variants";

import {
    ReferenceStatisticListItem,
    type StatisticItem
} from "./reference-statistic-list-item";
import { FetchReferenceChartDataResponse } from "../../api";

export type StatisticList = StatisticItem[];

interface ReferenceStatisticListProps
    extends React.ComponentPropsWithoutRef<"ul"> {
    statisticList: StatisticList;
    data: FetchReferenceChartDataResponse;
}

export const ReferenceStatisticList: React.FC<ReferenceStatisticListProps> = ({
    className,
    data,
    statisticList,
    ...props
}) => {
    return (
        <ul
            className={cnBase(
                "grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-7",
                className
            )}
            {...props}
        >
            {statisticList.map(statistic => (
                <ReferenceStatisticListItem
                    key={statistic.id}
                    data={data}
                    statistic={statistic}
                />
            ))}
        </ul>
    );
};
