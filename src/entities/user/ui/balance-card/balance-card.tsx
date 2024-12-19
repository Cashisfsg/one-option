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
            <h2 className="text-center text-2xl lg:text-start">Ваш баланс</h2>
            <div className="mt-2 rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <p className="font-secondary">Общий доход:</p>
                <p className="py-4 text-center text-3xl">
                    {balance?.total_income} $
                </p>
            </div>

            <div className="grid grid-cols-[auto_minmax(min-content,_1fr)] gap-x-4 gap-y-2">
                <p className="col-span-2 grid grid-cols-subgrid rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                    <span className="font-secondary">Доля от дохода:</span>
                    <span className="text-center 3xs:text-start">
                        {balance?.income_doxod} $
                    </span>
                </p>

                <p className="col-span-2 grid grid-cols-subgrid rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                    <span className="font-secondary">Доля от оборота:</span>
                    <span className="text-center 3xs:text-start">
                        {balance?.income_oborot} $
                    </span>
                </p>
            </div>

            <p className="mt-2 text-pretty text-center">
                Обновляется каждые 10 - 20 минут.
            </p>
            <p className="flex-auto text-pretty text-center">
                Привлекайте новых трейдеров и увеличивайте доход!
            </p>

            <Link
                to="/withdrawal"
                className={buttonVariants({
                    className:
                        "mt-6 block h-auto bg-violet-tertiary text-center 3xs:mx-auto"
                })}
            >
                Перейти к выводу средств
            </Link>
        </Section>
    );
};
