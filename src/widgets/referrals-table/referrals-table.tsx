import { useState } from "react";

import { SearchReferralForm } from "@/features/referral/search-referral";

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
        <Section>
            <header className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                <Title
                    as="h2"
                    className="whitespace-nowrap text-lg-xl-xs-lg"
                >
                    Таблица рефералов
                </Title>
                <SearchReferralForm setQuery={setQuery} />
            </header>

            <div className="scrollbar">
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
                                        <TableCell>{referral.id}</TableCell>
                                        <TableCell>{referral.email}</TableCell>
                                        <TableCell>
                                            {referral.doxod_procent} %
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        )}
                    />
                ) : null}
            </div>
        </Section>
    );
};
