import { useState } from "react";

// import { SearchReferralForm } from "@/features/referral/search-referral";

import { useFetchReferenceListQuery } from "@/entities/reference";

import { Table, TableRow, TableCell } from "@/shared/ui/table";
import { Section } from "@/shared/ui/section";
import { Title } from "@/shared/ui/title";

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
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.6132 15.5158C18.7994 13.901 19.5 11.9073 19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 15.1348 4.36522 19.5 9.75 19.5C11.9079 19.5 13.902 18.799 15.5171 17.6123L15.5158 17.6132C15.5601 17.6732 15.6093 17.7307 15.6636 17.785L21.4393 23.5607C22.0251 24.1465 22.9749 24.1465 23.5607 23.5607C24.1465 22.9749 24.1465 22.0251 23.5607 21.4393L17.785 15.6636C17.7307 15.6093 17.6732 15.5601 17.6132 15.5158ZM18 9.75C18 14.3063 14.3063 18 9.75 18C5.19365 18 1.5 14.3063 1.5 9.75C1.5 5.19365 5.19365 1.5 9.75 1.5C14.3063 1.5 18 5.19365 18 9.75Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </form>

            <Section className="contents">
                <header className="grid grid-cols-1 gap-x-4 gap-y-2 sm:col-start-1 sm:row-start-1">
                    <Title
                        as="h2"
                        // className="whitespace-nowrap text-lg-xl-xs-lg"
                        className="whitespace-nowrap"
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
