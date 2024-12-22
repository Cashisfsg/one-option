import { toast } from "sonner";
import { cnBase } from "tailwind-variants";

import { useUpdateUserPhotoMutation } from "@/entities/user/api";
import { FetchUserData } from "@/entities/user/ui/fetch";

import { handleErrorResponse } from "@/shared/lib/helpers/handle-error-response";

import IconsSprite from "@/assets/img/svg/icons-spite.svg";

interface UpdateUserPhotoFormProps
    extends React.ComponentPropsWithoutRef<"label"> {}

export const UpdateUserPhotoForm: React.FC<UpdateUserPhotoFormProps> = ({
    className,
    ...props
}) => {
    const [updateUserPhoto] = useUpdateUserPhotoMutation();

    const onChangeHandler: React.FormEventHandler<
        HTMLInputElement
    > = async event => {
        const { files } = event.currentTarget;

        if (!files || files.length === 0) return;

        const img = files[0];

        try {
            await updateUserPhoto(img).unwrap();
        } catch (error) {
            handleErrorResponse(error, message => toast.error(message));
        }
    };

    return (
        <FetchUserData
            renderSuccess={({ photo }) => (
                <label
                    className={cnBase(
                        "size-48 cursor-pointer place-items-center gap-y-1.5 overflow-clip rounded-full border-4 border-violet-primary bg-[#100033]",
                        className
                    )}
                    {...props}
                >
                    {photo ? (
                        <>
                            <img
                                src={`${import.meta.env.VITE_BASE_API_URL}${photo}`}
                                alt="Фото профиля"
                                className="size-full object-cover"
                            />
                            <span className="sr-only">
                                Обновить фото профиля
                            </span>
                        </>
                    ) : (
                        <>
                            <svg
                                height="3.5rem"
                                width="3.5rem"
                                aria-hidden="true"
                                focusable="false"
                                className="self-end"
                            >
                                <use xlinkHref={`${IconsSprite}#img-out-box`} />
                            </svg>
                            <span className="self-start font-secondary">
                                Загрузить фото
                            </span>
                        </>
                    )}
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={onChangeHandler}
                        hidden
                    />
                </label>
            )}
            loadingFallback={
                <div className="size-48 animate-pulse place-content-center rounded-full border-4 border-violet-primary bg-slate-400" />
            }
        />
    );
};
