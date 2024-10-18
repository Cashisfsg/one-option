import { useState } from "react";

import { ReferenceActivityChart } from "@/widgets/reference-activity-chart";

import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";
import { Table, TableRow } from "@/shared/ui/table";
import { Title } from "@/shared/ui/title";

import { ReferenceStatistic } from "@/widgets/reference/reference-statistic";
import { Fetch } from "@/shared/ui/fetch";
import { useFetchReferenceLinksQuery } from "@/entities/reference";

const data = [
    {
        id: "#709247",
        url: "broker-qx.pro/sign-up/?lid=709247",
        type: "Ссылка на регистрацию",
        program: "Доля дохода",
        date: "26.03.2024"
    },
    {
        id: "#709243",
        url: "broker-qx.pro/sign-up/?lid=709247",
        type: "Ссылка на регистрацию",
        program: "Доля дохода",
        date: "26.03.2024"
    }
];

export const DashboardPage = () => {
    const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
        "monthly"
    );

    const onClickHandler = (frequency: "daily" | "weekly" | "monthly") => {
        setFrequency(frequency);
    };

    return (
        <Article variant="block">
            <ReferenceStatistic />

            <Section>
                <header className="flex flex-wrap items-center justify-between gap-3 font-secondary">
                    <div className="flex items-center gap-x-6">
                        <Title
                            as="h2"
                            className="text-lg-xl-xs-lg"
                        >
                            График активностей ссылки
                        </Title>
                        <ul className="hidden items-center gap-x-6 lg:flex">
                            <li className="flex items-center gap-x-3">
                                <span className="size-7 rounded-md bg-[#FF8551]"></span>
                                <span>Клики</span>
                            </li>
                            <li className="flex items-center gap-x-3">
                                <span className="size-7 rounded-md bg-[#009A0F]"></span>
                                <span>Регистрации</span>
                            </li>
                            <li className="flex items-center gap-x-3">
                                <span className="size-7 rounded-md bg-[#652CDE]"></span>
                                <span>FTD</span>
                            </li>
                        </ul>
                    </div>

                    <div
                        role="radiogroup"
                        aria-label="Периодичность активности ссылки"
                        className="flex items-center gap-x-3 justify-self-center"
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

                    <ReferenceActivityChart frequency={frequency} />
                </header>
            </Section>

            <Section>
                <Title
                    as="h2"
                    className="text-center text-lg-xl-xs-lg"
                >
                    Ссылки на приглашение
                </Title>

                <div className="scrollbar">
                    <Fetch
                        useQuery={useFetchReferenceLinksQuery}
                        args={undefined}
                        renderSuccess={data => {
                            console.log(data);
                            return (
                                <Table
                                    uniqueKey={"code"}
                                    headers={[
                                        "id",
                                        "ссылка",
                                        "тип",
                                        "программа"
                                    ]}
                                    data={data}
                                    // renderData={links => (
                                    //     <tbody>
                                    //         {links.map(link => (
                                    //             <TableRow
                                    //                 key={link.id}
                                    //             ></TableRow>
                                    //         ))}
                                    //     </tbody>
                                    // )}
                                />
                            );
                        }}
                    />
                </div>
            </Section>
        </Article>
    );
};
