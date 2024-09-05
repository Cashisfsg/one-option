import { useFetchUserBalanceQuery } from "@/entities/user/api";
import {
    UserBalanceCard,
    UserBalanceCardSkeleton
} from "@/entities/user/ui/balance-card";

import { Fetch } from "@/shared/ui/fetch";

export const BalanceCard = () => {
    return (
        <Fetch
            useQuery={useFetchUserBalanceQuery}
            args={undefined}
            renderSuccess={balance => <UserBalanceCard balance={balance} />}
            loadingFallback={<UserBalanceCardSkeleton />}
        />
    );
};
