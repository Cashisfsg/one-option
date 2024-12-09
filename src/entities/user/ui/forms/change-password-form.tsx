import { Input } from "@/shared/ui/input";

import { useChangePasswordMutation } from "@/shared/api";
import { Button } from "@/shared/ui/button";

interface ChangePasswordFormProps extends React.ComponentProps<"form"> {}

interface FormFields {
    old_password: HTMLInputElement;
    new_password: HTMLInputElement;
    confirm_password: HTMLInputElement;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = props => {
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        const { old_password, new_password, confirm_password } =
            event.currentTarget;

        try {
            await changePassword({
                old_password: old_password.value,
                new_password: new_password.value,
                new_password_confirm: confirm_password.value
            }).unwrap();
            event.currentTarget.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            {...props}
        >
            <label>
                <span>Текущий пароль</span>
                <Input
                    type="password"
                    required
                    alert={true}
                    minLength={8}
                    maxLength={128}
                    name="old_password"
                    placeholder="Текущий пароль"
                />
            </label>

            <label>
                <span>Новый пароль</span>
                <Input
                    type="password"
                    required
                    alert={true}
                    minLength={8}
                    maxLength={128}
                    name="new_password"
                    placeholder="Новый пароль"
                />
            </label>

            <label>
                <span>Подтвердите пароль</span>
                <Input
                    type="password"
                    required
                    alert={true}
                    minLength={8}
                    maxLength={128}
                    name="confirm_password"
                    placeholder="Подтвердите пароль"
                />
            </label>

            <Button
                disabled={isLoading}
                className="mt-4 h-11 disabled:pointer-events-none disabled:opacity-50 lg:self-end lg:justify-self-end"
            >
                Сменить пароль
            </Button>
        </form>
    );
};
