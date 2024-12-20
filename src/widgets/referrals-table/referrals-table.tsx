import { useState } from "react";

// import { SearchReferralForm } from "@/features/referral/search-referral";

import { useFetchReferenceListQuery } from "@/entities/reference";

import { Table, TableRow, TableCell } from "@/shared/ui/table";
import { Section } from "@/shared/ui/section";
import { Title } from "@/shared/ui/title";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

export const ReferralsTable = () => {
    const [query, setQuery] = useState("");

    const { data: referrals, isSuccess } = useFetchReferenceListQuery(
        undefined,
        {
            selectFromResult: ({ data, isSuccess }) => ({
                data:
                    data?.filter(d => {
                        if (query === "") return true;
                        return (
                            d.id.includes(query) || d.nickname.includes(query)
                        );
                    }) ?? [],
                isSuccess
            })
        }
    );

    return (
        <search className="grid grid-cols-2 gap-y-4 rounded-2xl bg-secondary px-4-6-xs-md py-4">
            <form
                onSubmit={event => {
                    event.preventDefault();
                    setQuery("query");
                }}
                className="col-span-2 grid h-11 w-full grid-cols-[1fr_auto] rounded-full bg-quaternary sm:col-start-2 sm:max-w-96 sm:justify-self-end"
            >
                <input
                    placeholder="ID пользователя или Email"
                    className="h-full w-full rounded-l-full bg-transparent px-4 placeholder:text-white/15"
                />
                <button className="flex size-11 items-center justify-center rounded-r-full">
                    <span className="sr-only">Поиск</span>
                    <svg
                        height="20"
                        width="20"
                    >
                        <use xlinkHref={`${IconsSprite}#search`} />
                    </svg>
                </button>
            </form>

            <Section className="contents">
                <header className="grid grid-cols-1 gap-x-4 gap-y-2 sm:col-start-1 sm:row-start-1">
                    <Title
                        as="h2"
                        // className="whitespace-nowrap text-lg-xl-xs-lg"
                    >
                        Таблица рефералов
                    </Title>
                </header>

                <div className="scrollbar col-span-2">
                    {isSuccess ? (
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
                            uniqueKey="id"
                            data={referrals}
                            renderData={referrals => (
                                <tbody>
                                    {referrals.map((referral, index) => (
                                        <TableRow key={referral.id}>
                                            <th scope="row">{index + 1}</th>
                                            <TableCell>
                                                <span>{referral.nickname}</span>
                                                <img
                                                    src={referral.flag_photo}
                                                    alt="Flag Photo"
                                                    width="36"
                                                    height="9"
                                                    loading="lazy"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {referral.doxod_procent} %
                                            </TableCell>
                                            <TableCell>
                                                {referral.oborot} $
                                            </TableCell>
                                            <TableCell>
                                                {referral.deposit} $
                                            </TableCell>
                                            <TableCell>
                                                {referral.withdraw} $
                                            </TableCell>
                                            <TableCell>
                                                {referral.balance} $
                                            </TableCell>
                                            <TableCell>
                                                {referral.profit} $
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            )}
                        />
                    ) : null}
                </div>
            </Section>
        </search>
    );
};
