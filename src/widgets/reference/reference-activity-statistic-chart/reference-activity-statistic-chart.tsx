import { useState } from "react";

import { Section } from "@/shared/ui/section";
import { Title } from "@/shared/ui/title";
import { useFetchReferenceActivityDataQuery } from "@/entities/reference";
import { LineChart } from "@/shared/ui/line-chart";
import { Fetch } from "@/shared/ui/fetch";

type Frequency = "daily" | "weekly" | "monthly";

export const ReferenceActivityStatisticChart = () => {
    const [frequency, setFrequency] = useState<Frequency>("monthly");

    const onClickHandler = (frequency: Frequency) => {
        setFrequency(frequency);
    };

    return (
        <Section>
            <header className="grid grid-cols-1 items-center justify-between gap-y-3 md:grid-cols-[auto_minmax(min-content,_1fr)]">
                <Title
                    as="h2"
                    className="text-center"
                >
                    График активности ссылки
                </Title>

                <div
                    role="radiogroup"
                    className="inline-flex gap-x-3 justify-self-center font-secondary md:justify-self-end"
                >
                    <button
                        type="button"
                        role="radio"
                        tabIndex={-1}
                        aria-checked={frequency === "monthly"}
                        onClick={() => onClickHandler("monthly")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        Месяц
                    </button>
                    <button
                        type="button"
                        role="radio"
                        tabIndex={-1}
                        aria-checked={frequency === "weekly"}
                        onClick={() => onClickHandler("weekly")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        Неделя
                    </button>
                    <button
                        type="button"
                        role="radio"
                        tabIndex={-1}
                        aria-checked={frequency === "daily"}
                        onClick={() => onClickHandler("daily")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        День
                    </button>
                </div>
            </header>

            <Fetch
                useQuery={useFetchReferenceActivityDataQuery}
                args={{ frequency: frequency }}
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
    );
};
