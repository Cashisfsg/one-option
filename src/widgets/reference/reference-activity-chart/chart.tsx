import { useState } from "react";

import { useFetchReferenceChartDataQuery } from "@/entities/reference/api";
import { Fetch } from "@/shared/ui/fetch";

import { LineChart } from "@/shared/ui/line-chart";
import { Section } from "@/shared/ui/section";
import { Title } from "@/shared/ui/title";

type Frequency = "daily" | "weekly" | "monthly";

export const ReferenceActivityChart = () => {
    const [frequency, setFrequency] = useState<Frequency>("monthly");

    const onClickHandler = (frequency: Frequency) => {
        setFrequency(frequency);
    };

    return (
        <Section>
            <header className="grid grid-cols-1 items-center justify-between gap-x-6 gap-y-3 lg:grid-cols-[auto_minmax(min-content,_1fr)]">
                <div className="flex items-center gap-x-6">
                    <Title
                        as="h2"
                        // className="w-full text-center text-lg-xl-xs-lg"
                        className="inline w-full text-center lg:text-start"
                    >
                        График активностей ссылки
                    </Title>

                    <ul className="hidden items-center gap-x-4 font-secondary font-normal xl:flex">
                        <li className="flex items-center gap-x-2">
                            <span className="size-7 rounded-md bg-[#FF8551]"></span>
                            <span>Клики</span>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <span className="size-7 rounded-md bg-[#009A0F]"></span>
                            <span>Регистрации</span>
                        </li>
                        <li className="flex items-center gap-x-2">
                            <span className="size-7 rounded-md bg-[#652CDE]"></span>
                            <span>FTD</span>
                        </li>
                    </ul>
                </div>

                <div
                    role="radiogroup"
                    aria-label="Периодичность активности ссылки"
                    className="flex items-center gap-x-3 justify-self-center font-secondary lg:justify-self-end"
                >
                    <button
                        type="button"
                        role="radio"
                        aria-checked={frequency === "monthly"}
                        tabIndex={-1}
                        onClick={() => onClickHandler("monthly")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        Месяц
                    </button>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={frequency === "weekly"}
                        tabIndex={-1}
                        onClick={() => onClickHandler("weekly")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        Неделя
                    </button>
                    <button
                        type="button"
                        role="radio"
                        aria-checked={frequency === "daily"}
                        tabIndex={-1}
                        onClick={() => onClickHandler("daily")}
                        className="rounded-md px-5 py-2.5 text-base-lg-xs-lg aria-[checked=false]:bg-[#2b2930] aria-[checked=true]:bg-violet-primary"
                    >
                        День
                    </button>
                </div>
            </header>

            <Fetch
                useQuery={useFetchReferenceChartDataQuery}
                args={{ frequency: frequency }}
                renderSuccess={data => (
                    <LineChart
                        options={{
                            xAxis: { data: data.map(d => d?.date) },
                            yAxis: [
                                {
                                    data: data.map(d => d?.clicks),
                                    color: "#FF8551"
                                },
                                {
                                    data: data.map(d => d?.clicks),
                                    color: "#009A0F"
                                }
                            ]
                        }}
                    />
                )}
            />
        </Section>
    );
};
