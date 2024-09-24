import { cnBase } from "tailwind-variants";

import { useFetchWithdrawListQuery } from "@/entities/wallet/api";

import { Fetch } from "@/shared/ui/fetch";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Select } from "@/shared/ui/select";

import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";

interface WithdrawalFormProps extends React.ComponentProps<"form"> {}

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
    className,
    onSubmit,
    ...props
}) => {
    // const onChangeHandler: React.ChangeEventHandler<
    //     HTMLSelectElement
    // > = event => {
    //     event.currentTarget.classList.replace("text-white/30", "text-white");
    // };

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement
    > = async event => {
        event.preventDefault();

        console.log(Object.fromEntries(new FormData(event.currentTarget)));
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
                    inputMode="numeric"
                    name="amount"
                    required
                    pattern="\d+([.,]\d{0,2})?"
                    placeholder="Введите сумму в долларах США"
                />
            </label>

            <Fetch
                useQuery={useFetchWithdrawListQuery}
                args={undefined}
                // renderSuccess={wallets => (
                //     <label>
                //         <span>Кошелек</span>
                //         <select
                //             defaultValue=""
                //             required
                //             onChange={onChangeHandler}
                //             className="h-11 rounded-lg bg-quaternary px-4 text-white/30 outline-offset-2 outline-slate-100 focus-visible:outline"
                //         >
                //             <option
                //                 value=""
                //                 disabled
                //             >
                //                 Выберите кошелёк
                //             </option>
                //             {wallets.map(wallet => (
                //                 <option
                //                     key={wallet?.wallet}
                //                     value={wallet?.wallet}
                //                     className="text-white"
                //                 >
                //                     {wallet?.wallet}
                //                 </option>
                //             ))}
                //         </select>
                //     </label>
                // )}
                renderSuccess={wallets => (
                    <fieldset className="grid gap-y-2">
                        <label>Кошелек</label>
                        <Select.Root>
                            <Select.Input
                                name="wallet"
                                placeholder="Выберите кошелек"
                            />
                            <Select.Trigger>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-transform duration-300 group-aria-expanded:rotate-180"
                                >
                                    <path
                                        d="M7.24677 11.1399L2.45054 5.6585C1.88478 5.01192 2.34396 4 3.20312 4H12.7956C13.6547 4 14.1139 5.01192 13.5482 5.6585L8.75193 11.1399C8.35352 11.5952 7.64518 11.5952 7.24677 11.1399Z"
                                        fill="white"
                                    />
                                </svg>
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

            <Button className="ml-auto mt-4 block">Вывести</Button>
        </form>
    );
};
