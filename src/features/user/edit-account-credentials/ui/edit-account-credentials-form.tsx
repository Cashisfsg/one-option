import { useState, useRef } from "react";

import { cnBase } from "tailwind-variants";

import {
    useFetchUserDataQuery,
    useUpdateUserCredentialsMutation
} from "@/entities/user/api";
import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";
import { Fetch } from "@/shared/ui/fetch";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface EditAccountCredentialsFormProps
    extends React.ComponentPropsWithoutRef<"form"> {}

interface FormFields {
    nickname: HTMLInputElement;
    email: HTMLInputElement;
}

export const EditAccountCredentialsForm: React.FC<
    EditAccountCredentialsFormProps
> = ({ className, onSubmit, ...props }) => {
    const [editable, setEditable] = useState(false);

    const nicknameRef = useRef<HTMLInputElement>(null);

    const [updateUserCredentials] = useUpdateUserCredentialsMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        if (event.currentTarget.getAttribute("type") === "button") {
            event.preventDefault();
            nicknameRef.current?.focus();
            setEditable(true);
        }
    };

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        try {
            const { nickname, email } = event.currentTarget;

            await updateUserCredentials({
                nickname: nickname.value,
                email: email.value
            }).unwrap();
            setEditable(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fetch
            useQuery={useFetchUserDataQuery}
            args={undefined}
            renderSuccess={user => (
                <form
                    // onBlur={() => setEditable(false)}
                    onKeyDown={event => {
                        if (event.code === "Escape") {
                            setEditable(false);
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }}
                    onSubmit={composeEventHandlers(onSubmit, onSubmitHandler)}
                    className={cnBase(
                        "relative w-fit max-w-[75%] gap-y-2",
                        className
                    )}
                    {...props}
                >
                    <input
                        defaultValue={user?.nickname}
                        name="nickname"
                        autoComplete="off"
                        readOnly={editable ? undefined : true}
                        required
                        tabIndex={editable ? 0 : -1}
                        minLength={1}
                        maxLength={150}
                        ref={nicknameRef}
                        className="w-full truncate border-b-2 border-transparent py-1 text-center text-4xl outline-none read-only:pointer-events-none focus-visible:border-white"
                    />

                    <input
                        defaultValue={user?.email}
                        type="email"
                        name="email"
                        autoComplete="off"
                        tabIndex={editable ? 0 : -1}
                        readOnly={editable ? undefined : true}
                        minLength={1}
                        maxLength={150}
                        className="w-full truncate border-b-2 border-transparent text-center font-secondary text-2xl outline-none read-only:pointer-events-none focus-visible:border-white"
                    />

                    <button
                        type={editable ? "submit" : "button"}
                        onClick={onClickHandler}
                        className="absolute right-0 top-0 translate-x-full cursor-pointer p-1 !outline-none"
                    >
                        {editable ? (
                            <>
                                <span className="sr-only">
                                    Внести изменения в профиль
                                </span>
                                <svg
                                    height="1em"
                                    width="1em"
                                    className="text-2xl"
                                >
                                    <use
                                        xlinkHref={`${IconsSprite}#confirm-edit`}
                                    />
                                </svg>
                            </>
                        ) : (
                            <>
                                <span className="sr-only">
                                    Редактировать данные профиля
                                </span>
                                <svg
                                    height="1em"
                                    width="1em"
                                >
                                    <use xlinkHref={`${IconsSprite}#edit`} />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            )}
            loadingFallback={
                <>
                    <div className="my-3.5 h-5 w-full animate-pulse rounded-full bg-slate-400" />
                    <div className="my-4.5 h-3 w-full animate-pulse rounded-full bg-slate-400" />
                </>
            }
        />
    );
};
