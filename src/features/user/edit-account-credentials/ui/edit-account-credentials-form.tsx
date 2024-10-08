import { useState, useRef } from "react";

import { cnBase } from "tailwind-variants";

import {
    useFetchUserDataQuery,
    useUpdateUserCredentialsMutation
} from "@/entities/user/api";
import { composeEventHandlers } from "@/shared/lib/utils/compose-event-handlers";
import { Fetch } from "@/shared/ui/fetch";

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

        console.log("SubmitHandler");

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
                                    Edit account credentials
                                </span>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.5"
                                        y="0.5"
                                        width="23"
                                        height="23"
                                        rx="3.5"
                                        stroke="#793AFF"
                                    />
                                    <path
                                        d="M18.5227 6.14171C18.3286 5.95277 18.0193 5.95276 17.8252 6.1417L10.3702 13.3981C10.176 13.587 9.86678 13.587 9.67266 13.3981L7.19778 11C7.00366 10.8111 6.6944 10.8111 6.50028 11L4.62391 12.8264C4.42224 13.0227 4.42224 13.3467 4.62391 13.5429L7.42818 16.2616L9.6896 18.4628C9.88371 18.6517 10.193 18.6517 10.3871 18.4628L12.6316 16.2781L20.416 8.70117C20.6177 8.50487 20.6177 8.18087 20.416 7.98458L18.5227 6.14171Z"
                                        fill="#793AFF"
                                    />
                                </svg>
                            </>
                        ) : (
                            <>
                                <span className="sr-only">
                                    Edit account credentials
                                </span>
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.25 4.25H2.5C2.10218 4.25 1.72064 4.40804 1.43934 4.68934C1.15804 4.97064 1 5.35218 1 5.75V12.5C1 12.8978 1.15804 13.2794 1.43934 13.5607C1.72064 13.842 2.10218 14 2.5 14H9.25C9.64782 14 10.0294 13.842 10.3107 13.5607C10.592 13.2794 10.75 12.8978 10.75 12.5V11.75"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10 2.75008L12.25 5.00008M13.2888 3.93883C13.5841 3.64345 13.7501 3.24282 13.7501 2.82508C13.7501 2.40734 13.5841 2.00672 13.2888 1.71133C12.9934 1.41595 12.5927 1.25 12.175 1.25C11.7573 1.25 11.3566 1.41595 11.0613 1.71133L4.75 8.00008V10.2501H7L13.2888 3.93883Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
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
