import { Link } from "react-router-dom";

import { Section } from "@/shared/ui/section";
import { buttonVariants } from "@/shared/ui/button";

import { FetchUserBalanceResponse } from "../../api";

interface UserBalanceCardProps
    extends React.ComponentPropsWithoutRef<"section"> {
    balance: FetchUserBalanceResponse;
}

export const UserBalanceCard: React.FC<UserBalanceCardProps> = ({
    balance,
    ...props
}) => {
    return (
        <Section
            className="flex flex-col gap-y-2 bg-violet-primary md:px-4"
            {...props}
        >
            <h2 className="text-2xl">Ваш баланс</h2>
            <div className="mt-2 rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <p className="font-secondary">Общий доход:</p>
                <p className="py-4 text-center text-3xl">
                    {balance?.total_income} $
                </p>
            </div>
            <div className="rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <p>
                    <span className="font-secondary">Доля от дохода:</span>{" "}
                    {balance?.income_doxod} $
                </p>
            </div>

            <div className="rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <p>
                    <span className="font-secondary">Доля от оборота:</span>{" "}
                    {balance?.income_oborot} $
                </p>
            </div>

            <p className="mt-2 text-center">Обновляется каждые 10-20 минут.</p>
            <p className="flex-auto text-center">
                Привлекайте новых трейдеров и увеличивайте доход!
            </p>

            <Link
                to="/withdrawal"
                className={buttonVariants({
                    className:
                        "mx-auto mt-6 block h-auto bg-violet-tertiary text-center"
                })}
            >
                Перейти к выводу средств
            </Link>
        </Section>
    );
};
