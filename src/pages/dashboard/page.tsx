import { ReferenceActivityChart } from "@/widgets/reference/reference-activity-chart";

import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";
import { Table } from "@/shared/ui/table";
import { Title } from "@/shared/ui/title";

import { ReferenceStatistic } from "@/widgets/reference/reference-statistic";
import { Fetch } from "@/shared/ui/fetch";
import { useFetchReferenceLinksQuery } from "@/entities/reference";

export const DashboardPage = () => {
    return (
        <Article variant="block">
            <ReferenceStatistic />

            <ReferenceActivityChart />

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
                        renderSuccess={data => (
                            <Table
                                uniqueKey={"code"}
                                headers={["id", "ссылка", "тип", "программа"]}
                                data={data}
                            />
                        )}
                    />
                </div>
            </Section>
        </Article>
    );
};
