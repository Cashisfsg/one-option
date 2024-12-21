import { ReferenceStatistic } from "@/widgets/reference/reference-statistic";
import { ReferenceActivityChart } from "@/widgets/reference/reference-activity-chart";
import { ReferenceTable } from "@/widgets/reference/reference-table";

import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";
import { Title } from "@/shared/ui/title";

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
                    <ReferenceTable />
                </div>
            </Section>
        </Article>
    );
};
