import { BalanceOverview } from "@/entities/user/ui/balance-overview";
import { ReferralsTable } from "@/widgets/referrals-table/referrals-table";

import { Article } from "@/shared/ui/article";
import { ReferenceActivityStatisticChart } from "@/widgets/reference/reference-activity-statistic-chart";

export const StatisticPage = () => {
    return (
        <Article>
            <ReferenceActivityStatisticChart />

            <BalanceOverview />

            <ReferralsTable />
        </Article>
    );
};
