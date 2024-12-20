import {
    useFetchLevelsListQuery,
    useFetchUserDataQuery
} from "@/entities/user/api";
import { UserFTDMeter } from "@/entities/user/ui/user-ftd-meter";
import { Fetch } from "@/shared/ui/fetch";
import { Table, TableRow } from "@/shared/ui/table";
import { Tooltip } from "@/shared/ui/tooltip";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

export const UserLevelsTable = () => {
    return (
        <h2>
            <Fetch
                useQuery={useFetchUserDataQuery}
                args={undefined}
                renderSuccess={user => (
                    <>
                        LVL{" "}
                        <strong className="text-violet-primary">
                            {user?.level}
                        </strong>{" "}
                    </>
                )}
            />
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <a>
                        <svg
                            height="1em"
                            width="1em"
                            className="mb-0.5 inline-block cursor-help text-sm"
                        >
                            <use xlinkHref={`${IconsSprite}#info`} />
                        </svg>
                        <span className="sr-only">
                            Показать вслывающую подсказку
                        </span>
                    </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="z-50 max-w-[calc(100dvw_-_3rem)] rounded-xl border-2 border-violet-primary bg-[#211F26] shadow-md">
                        <section className="px-4 pt-2 text-white">
                            <header>
                                <h3 className="font-primary text-xl">
                                    Уровень партнера
                                </h3>
                                <p className="mt-2 text-base">
                                    Увеличивай число депозитов и получай больше
                                    прибыли !
                                </p>
                            </header>
                            <Fetch
                                useQuery={useFetchLevelsListQuery}
                                args={undefined}
                                renderSuccess={data => (
                                    <div className="scrollbar overflow-x-auto">
                                        <Table
                                            uniqueKey="level"
                                            headers={[
                                                "Уровень",
                                                "Доход",
                                                "Оборот",
                                                "Депозит"
                                            ]}
                                            data={data}
                                            renderHeader={headers => (
                                                <thead>
                                                    <TableRow>
                                                        {headers.map(
                                                            (header, i) => (
                                                                <th
                                                                    key={i}
                                                                    className="bg-[#36343B] px-3 py-1.5 text-sm font-normal normal-case"
                                                                >
                                                                    {header}
                                                                </th>
                                                            )
                                                        )}
                                                    </TableRow>
                                                </thead>
                                            )}
                                            renderData={data => (
                                                <Fetch
                                                    useQuery={
                                                        useFetchUserDataQuery
                                                    }
                                                    args={undefined}
                                                    renderSuccess={user => (
                                                        <tbody className="text-center">
                                                            {data.map(
                                                                (row, i) => (
                                                                    <tr
                                                                        key={i}
                                                                        className={
                                                                            user.level ===
                                                                            row.level
                                                                                ? "bg-violet-primary"
                                                                                : "bg-[#4a484f]"
                                                                        }
                                                                    >
                                                                        {Object.values(
                                                                            row
                                                                        ).map(
                                                                            (
                                                                                cell,
                                                                                j
                                                                            ) => (
                                                                                <td
                                                                                    key={
                                                                                        j
                                                                                    }
                                                                                    className="px-3 py-1.5"
                                                                                >
                                                                                    {
                                                                                        cell
                                                                                    }
                                                                                </td>
                                                                            )
                                                                        )}
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    )}
                                                />
                                            )}
                                            className="mt-2 border-separate border-spacing-x-0 border-spacing-y-0.5 rounded-lg shadow-lg"
                                        />
                                    </div>
                                )}
                            />

                            <footer className="-mx-4 mt-2 rounded-b-xl bg-violet-primary py-2.5 text-center">
                                <Fetch
                                    useQuery={useFetchUserDataQuery}
                                    args={undefined}
                                    renderSuccess={user => (
                                        <UserFTDMeter
                                            aria-valuenow={user.ftd_count}
                                            aria-valuemax={user.next_level}
                                            style={
                                                {
                                                    "--start-color":
                                                        "transparent"
                                                } as React.CSSProperties
                                            }
                                        />
                                    )}
                                    loadingFallback={
                                        <div className="h-9 place-content-center bg-quaternary">
                                            <div className="mx-auto my-auto h-3 w-32 animate-pulse rounded-full bg-slate-400" />
                                        </div>
                                    }
                                />
                                {/* <p className="font-primary text-xl/none">
                                    FTD {user?.ftd_count} / {user?.next_level}
                                </p> */}
                                <p>до следующего уровня</p>
                            </footer>
                        </section>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </h2>
    );
};
