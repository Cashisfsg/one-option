import { Link } from "react-router-dom";

import { Section } from "@/shared/ui/section";
import { buttonVariants } from "@/shared/ui/button";

export const UserBalanceCardSkeleton = () => {
    return (
        <Section className="flex flex-col gap-y-2 bg-violet-primary md:px-4">
            <h2 className="text-2xl">Ваш баланс</h2>
            <div className="mt-2 rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <p className="font-secondary">Общий доход:</p>
                <p className="mx-auto h-7 w-24 animate-pulse rounded-full bg-white/70 py-4" />
            </div>

            <p className="rounded-lg bg-violet-secondary px-4 py-2 align-middle text-lg">
                <span className="font-secondary">Доля от дохода:</span>{" "}
                <span className="inline-block h-5 w-24 animate-pulse rounded-full bg-white/70 align-middle" />
            </p>

            <p className="rounded-lg bg-violet-secondary px-4 py-2 text-lg">
                <span className="font-secondary">Доля от оборота:</span>{" "}
                <span className="inline-block h-5 w-24 animate-pulse rounded-full bg-white/70 align-middle" />
            </p>

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
