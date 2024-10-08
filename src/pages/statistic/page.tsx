import { BalanceOverview } from "@/entities/user/ui/balance-overview";

import { Section } from "@/shared/ui/section";
import { Table } from "@/shared/ui/table";
import { LineChart } from "@/shared/ui/line-chart";
import { Article } from "@/shared/ui/article";
import { Title } from "@/shared/ui/title";
import { SearchReferralForm } from "@/features/referral/search-referral";

const data = Array(6).fill({
    number: 1,
    nick: "Ник",
    id: 3621548,
    as: "70%",
    asd: "231 $",
    fds: "378 $",
    gdf: "571 $",
    gdfd: "572 $",
    gdfg: "573 $"
});

export const StatisticPage = () => {
    return (
        <Article>
            <Section>
                <LineChart
                    data={[
                        [1, 1],
                        [2, 2]
                    ]}
                />
            </Section>

            <BalanceOverview />

            <Section>
                <header className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <Title
                        as="h2"
                        className="whitespace-nowrap text-lg-xl-xs-lg"
                    >
                        Таблица рефералов
                    </Title>
                    <SearchReferralForm />
                </header>
                <div className="scrollbar">
                    <Table
                        headers={[
                            "#",
                            "Никнейм",
                            "ID",
                            "Доходность",
                            "Оборот",
                            "Депозиты",
                            "Выводы",
                            "Баланс",
                            "Прибыль"
                        ]}
                        data={data}
                    />
                </div>
            </Section>
        </Article>
    );
};
