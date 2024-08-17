import { cnBase } from "tailwind-variants";

import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

interface WithdrawalFormProps extends React.ComponentProps<"form"> {}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
    className,
    onSubmit,
    ...props
}) => {
    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
    };

    return (
        <form
            onSubmit={composeEventHandlers(onSubmit, onSubmitHandler)}
            className={cnBase("grid gap-y-4", className)}
            {...props}
        >
            <label className="grid gap-y-2">
                <span>Сумма</span>
                <Input
                    inputMode="numeric"
                    placeholder="Введите сумму в долларах США"
                />
            </label>

            <label className="grid gap-y-2">
                <span>Кошелек</span>
                <select
                    defaultValue=""
                    className="h-11 rounded-lg bg-quaternary px-4 outline-offset-2 outline-slate-100 focus-visible:outline"
                >
                    <option
                        value=""
                        disabled
                    >
                        Выберите кошелёк
                    </option>
                </select>
            </label>

            <Button className="ml-auto mt-4 block">Вывести</Button>
        </form>
    );
};
