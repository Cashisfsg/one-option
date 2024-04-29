import { Input } from "@/shared/ui/input";

interface ChangePasswordFormProps extends React.ComponentProps<"form"> {}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = props => {
    return (
        <form {...props}>
            <label>
                <span>Текущий пароль</span>
                <Input placeholder="Текущий пароль" />
            </label>

            <label>
                <span>Новый пароль</span>
                <Input
                    type="password"
                    placeholder="Новый пароль"
                />
            </label>

            <label>
                <span>Подтвердите пароль</span>
                <Input
                    type="password"
                    placeholder="Подтвердите пароль"
                />
            </label>
        </form>
    );
};
