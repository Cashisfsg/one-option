import { BalanceOverview } from "@/entities/user/ui/balance-overview";
import { ReferralsTable } from "@/widgets/referrals-table/referrals-table";

import { Section } from "@/shared/ui/section";
import { LineChart } from "@/shared/ui/line-chart";
import { Article } from "@/shared/ui/article";
import { Title } from "@/shared/ui/title";

const sales = [
    { date: "2023-04-30", value: 4 },
    { date: "2023-05-01", value: 6 },
    { date: "2023-05-02", value: 8 },
    { date: "2023-05-03", value: 7 },
    { date: "2023-05-04", value: 10 },
    { date: "2023-05-05", value: 12 },
    { date: "2023-05-06", value: 4 }
];

export const StatisticPage = () => {
    return (
        <Article>
            <Section>
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <Title as="h2">График активности ссылки</Title>

                    <div
                        role="radiogroup"
                        className="inline-flex gap-x-3 justify-self-end font-secondary"
                    >
                        <button
                            type="button"
                            role="radio"
                            tabIndex={-1}
                            aria-checked={true}
                            className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                        >
                            Месяц
                        </button>
                        <button
                            type="button"
                            role="radio"
                            tabIndex={-1}
                            className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                        >
                            Неделя
                        </button>
                        <button
                            type="button"
                            role="radio"
                            tabIndex={-1}
                            className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                        >
                            День
                        </button>
                    </div>
                </header>

                <LineChart data={sales} />
            </Section>

            <BalanceOverview />

            <ReferralsTable />
        </Article>
    );
};
