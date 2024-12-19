import { Section } from "@/shared/ui/section";

import { useFetchReferenceStatisticQuery } from "@/entities/reference/api";
import {
    ReferenceStatisticList,
    ReferenceStatisticListItemSkeleton,
    type StatisticList
} from "@/entities/reference";
import { Fetch } from "@/shared/ui/fetch";

const statisticList = [
    { id: 1, label: "Всего кликов", key: "all_click", icon: "pie_chart" },
    { id: 2, label: "Регистраций", key: "register_count", icon: "bar_chart" },
    { id: 3, label: "Депозиты", key: "deposit", icon: "fluent_money_model_2" },
    { id: 4, label: "FTD's", key: "ftd_count", icon: "money_deposit" },
    { id: 5, label: "Вывод", key: "ftd_sum", icon: "fluent_money_model_1" },
    { id: 6, label: "P/L трейдеров", key: "witdraw_ref", icon: "scan_focus" },
    { id: 7, label: "Оборот", key: "oborot", icon: "money_exchange" }
] as StatisticList;

export const ReferenceStatistic = () => {
    return (
        <Section>
            <Fetch
                useQuery={useFetchReferenceStatisticQuery}
                args={undefined}
                renderSuccess={statistic => (
                    <ReferenceStatisticList
                        data={statistic}
                        statisticList={statisticList}
                    />
                )}
                loadingFallback={
                    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-7">
                        {statisticList.map(statistic => (
                            <ReferenceStatisticListItemSkeleton
                                key={statistic.id}
                                statistic={statistic}
                            />
                        ))}
                    </ul>
                }
            />
        </Section>
    );
};
