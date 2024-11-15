import { BalanceOverview } from "@/entities/user/ui/balance-overview";
import { ReferralsTable } from "@/widgets/referrals-table/referrals-table";

import { Section } from "@/shared/ui/section";
import { LineChart } from "@/shared/ui/line-chart";
import { Article } from "@/shared/ui/article";
import { Title } from "@/shared/ui/title";
import { Fetch } from "@/shared/ui/fetch";
import { useFetchReferenceActivityDataQuery } from "@/entities/reference";

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

                <Fetch
                    useQuery={useFetchReferenceActivityDataQuery}
                    args={{ frequency: "weekly" }}
                    renderSuccess={data => (
                        <LineChart
                            options={{
                                xAxis: { data: data.map(d => d?.date) },
                                yAxis: [
                                    {
                                        data: data.map(d => d?.count),
                                        color: "#652cde"
                                    }
                                ]
                            }}
                        />
                    )}
                />
            </Section>

            <BalanceOverview />

            <ReferralsTable />
        </Article>
    );
};
