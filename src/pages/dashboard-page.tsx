import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";
import { Table } from "@/shared/ui/table";
import { LineChart } from "@/shared/ui/line-chart";
import { Title } from "@/shared/ui/title";

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
    return (
        <Article variant="block">
            <Section>
                <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
                    {Array(6)
                        .fill(0)
                        .map((_, i) => (
                            <li
                                key={i}
                                className="grid grid-cols-2 gap-y-3 rounded-2xl  bg-[#2b2930] px-4 py-3 @container first:bg-violet-primary [&:nth-child(2)]:bg-violet-secondary"
                            >
                                <h2 className="col-span-2 row-start-3 text-sm/none @[15rem]:row-start-1 @[15rem]:text-lg/none">
                                    Всего кликов
                                </h2>
                                <svg
                                    width="45"
                                    height="45"
                                    viewBox="0 0 45 45"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className=""
                                >
                                    <path
                                        d="M3 24C3 28.1534 4.23163 32.2135 6.53914 35.667C8.84665 39.1204 12.1264 41.812 15.9636 43.4015C19.8009 44.9909 24.0233 45.4068 28.0969 44.5965C32.1705 43.7862 35.9123 41.7861 38.8492 38.8492C41.7861 35.9123 43.7862 32.1705 44.5965 28.0969C45.4068 24.0233 44.9909 19.8009 43.4015 15.9636C41.812 12.1264 39.1204 8.84665 35.667 6.53914C32.2135 4.23163 28.1534 3 24 3L24 24L3 24Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M-1.97882e-06 21C-1.73773e-06 18.2422 0.543181 15.5115 1.59853 12.9636C2.65388 10.4158 4.20073 8.10079 6.15076 6.15076C8.10079 4.20073 10.4158 2.65388 12.9636 1.59853C15.5115 0.543184 18.2422 1.73773e-06 21 1.97882e-06L21 21L-1.97882e-06 21Z"
                                        fill="#0F0F0F"
                                    />
                                </svg>
                                <span className="col-span-2 mt-4 self-center text-2xl leading-none @[15rem]:col-span-1 @[15rem]:mt-0 @[15rem]:text-3xl">
                                    0 $
                                </span>
                            </li>
                        ))}
                </ul>
            </Section>

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

                    <div className="flex items-center gap-x-3 justify-self-center">
                        <button className="rounded-md bg-[#2b2930] px-5 py-2.5 text-base-lg-xs-lg">
                            Месяц
                        </button>
                        <button className="rounded-md bg-[#2b2930] px-5 py-2.5 text-base-lg-xs-lg">
                            Неделя
                        </button>
                        <button className="rounded-md bg-violet-primary px-5 py-2.5 text-base-lg-xs-lg">
                            День
                        </button>
                    </div>
                </header>
                <LineChart />
            </Section>

            <Section>
                <Title
                    as="h2"
                    className="text-center text-lg-xl-xs-lg"
                >
                    Ссылки на приглашение
                </Title>
                <div className="scrollbar">
                    <Table
                        uniqueKey={"id"}
                        rowHeaderKey={"id"}
                        headers={["id", "ссылка", "тип", "программа", "дата"]}
                        data={data}
                        // renderData={data => (
                        //     <tbody className="[&>*:nth-child(odd)]:bg-quaternary">
                        //         {data.map(row => (
                        //             <TableRow key={row.id}>
                        //                 {Object.values(row)?.map(
                        //                     (cell, index) => (
                        //                         <TableCell
                        //                             key={index}
                        //                             className="text-blue-500"
                        //                         >
                        //                             {cell}
                        //                         </TableCell>
                        //                     )
                        //                 )}
                        //             </TableRow>
                        //         ))}
                        //     </tbody>
                        // )}
                        renderColumns={
                            <colgroup>
                                <col />
                                <col className="text-lg text-red-500" />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                        }
                        components={
                            {
                                // TableRow: <tr className="bg-red-600" />
                            }
                        }
                        // className="w-auto"
                    />
                </div>
            </Section>
        </Article>
    );
};
