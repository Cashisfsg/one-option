import { useRef, useId } from "react";
import { cnBase } from "tailwind-variants";
import { toast } from "sonner";

import {
    useFetchWithdrawListQuery,
    useWithdrawalMutation
} from "@/entities/wallet/api";

import { Fetch } from "@/shared/ui/fetch";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Select } from "@/shared/ui/select";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";
import { handleErrorResponse } from "@/shared/lib/helpers/handle-error-response";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface WithdrawalFormProps extends React.ComponentProps<"form"> {}

interface FormFields {
    amount: HTMLInputElement;
    wallet: HTMLInputElement;
}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
    className,
    onSubmit,
    ...props
}) => {
    const amountId = `input-${useId()}`;
    const walletId = `select-${useId()}`;
    const unvalidatedValue = useRef("");

    const [withdrawal] = useWithdrawalMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        const form = event.currentTarget;

        try {
            const { amount, wallet } = event.currentTarget;

            const response = await withdrawal({
                amount: amount.value,
                wallet: wallet.value
            }).unwrap();

            toast(response?.detail);

            form.reset();
        } catch (error) {
            handleErrorResponse(error, message => toast.error(message));
        }
    };

    const onBeforeInputHandler: React.FormEventHandler<
        HTMLInputElement
    > = event => {
        unvalidatedValue.current = event.currentTarget.value;
    };

    const onChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.validity.patternMismatch) {
            input.value = unvalidatedValue.current;
        }
    };

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = event => {
        const value = parseFloat(event.currentTarget.value);

        if (isNaN(value)) {
            return;
        }

        event.currentTarget.value = value.toFixed(2);
    };

    return (
        <form
            onSubmit={composeEventHandlers(onSubmit, onSubmitHandler)}
            className={cnBase("grid gap-y-4", className)}
            {...props}
        >
            <label>
                <span>Сумма</span>
                <Input
                    id={amountId}
                    inputMode="numeric"
                    name="amount"
                    alert={true}
                    required
                    maxLength={10}
                    pattern="\d{0,7}([.,]\d{0,2})?"
                    placeholder="Введите сумму в долларах США"
                    onBeforeInput={onBeforeInputHandler}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
            </label>

            <Fetch
                useQuery={useFetchWithdrawListQuery}
                args={undefined}
                renderSuccess={wallets => (
                    <fieldset className="grid gap-y-2">
                        <label>Кошелек</label>
                        <Select.Root>
                            <Select.Input
                                id={walletId}
                                name="wallet"
                                required
                                placeholder="Выберите кошелек"
                            />
                            <Select.Trigger>
                                <svg
                                    height="1em"
                                    width="1em"
                                    className="transition-transform duration-300 group-aria-expanded:rotate-180"
                                >
                                    <use
                                        xlinkHref={`${IconsSprite}#caret-down`}
                                    />
                                </svg>
                                <span className="sr-only">
                                    Раскрыть выпадающий список
                                </span>
                            </Select.Trigger>
                            <Select.Menu>
                                {wallets.map(wallet => (
                                    <Select.Option
                                        key={wallet?.wallet}
                                        value={wallet?.wallet}
                                    >
                                        {wallet?.wallet}
                                    </Select.Option>
                                ))}
                            </Select.Menu>
                        </Select.Root>
                    </fieldset>
                )}
                loadingFallback={
                    <label>
                        <span>Кошелек</span>
                        <Input
                            placeholder="Выберите кошелёк"
                            required
                            readOnly
                        />
                    </label>
                }
                renderError={() => (
                    <label>
                        <span>Кошелек</span>
                        <Input
                            placeholder="Выберите кошелёк"
                            required
                            readOnly
                        />
                    </label>
                )}
            />

            <Button className="ml-auto mt-4 block w-full 3xs:w-auto">
                Вывести
            </Button>
        </form>
    );
};
