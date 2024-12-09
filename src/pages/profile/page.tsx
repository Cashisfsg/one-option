import { UserLevelsTable } from "@/widgets/user/user-levels-table";
import { BalanceCard } from "@/widgets/user";
import { AttachWalletDialog } from "@/widgets/wallet/attach-wallet-dialog";
import { WalletListWidget } from "@/widgets/wallet/table";

import { UpdateUserPhotoForm } from "@/features/user/update-avatar";

import { ChangePasswordForm } from "@/entities/user/ui/forms/change-password-form";

import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";

import { UserFTDMeter } from "@/entities/user/ui/user-ftd-meter";

// import Avatar from "@/assets/avatar.png";

import TelegramLogo from "@/assets/img/telegram-logo.png";
import InstagramLogo from "@/assets/img/instagram-logo.png";
import YouTubeLogo from "@/assets/img/youtube-logo.png";
import { EditAccountCredentialsForm } from "@/features/user/edit-account-credentials";
import { Fetch } from "@/shared/ui/fetch";
import { useFetchUserDataQuery } from "@/entities/user/api";

export const ProfilePage = () => {
    return (
        <Article
            variant="grid"
            className="lg:grid-cols-[minmax(0,_3fr)_minmax(0,_4fr)_minmax(0,_4fr)]"
        >
            <Section className="flex flex-col items-center gap-y-2 overflow-hidden pb-0 text-center md:px-4">
                <header className="self-start text-2xl">
                    <UserLevelsTable />
                </header>

                <UpdateUserPhotoForm />

                <EditAccountCredentialsForm />

                <div className="my-2 w-full rounded-xl bg-quaternary px-2.5 py-1.5 font-secondary text-lg">
                    <p className="text-start">Привлечение реферралов из:</p>

                    <ul className="mt-3 flex gap-x-2">
                        <li className="flex size-12 items-center justify-center rounded-lg bg-[#2b2930]">
                            <img
                                src={TelegramLogo}
                                alt="Telegram"
                            />
                        </li>
                        <li className="flex size-12 items-center justify-center rounded-lg bg-[#2b2930]">
                            <img
                                src={InstagramLogo}
                                alt="Instagram"
                            />
                        </li>
                        <li className="flex size-12 items-center justify-center rounded-lg bg-[#2b2930]">
                            <img
                                src={YouTubeLogo}
                                alt="YouTube"
                            />
                        </li>
                    </ul>
                </div>

                <footer className="-mx-6 mt-auto h-9 w-[calc(100%_+_3rem)] rounded-b-2xl text-center leading-9">
                    <Fetch
                        useQuery={useFetchUserDataQuery}
                        args={undefined}
                        renderSuccess={user => (
                            <UserFTDMeter
                                aria-valuenow={user.ftd_count}
                                aria-valuemax={user.next_level}
                            />
                        )}
                        loadingFallback={
                            <div className="h-9 place-content-center bg-quaternary">
                                <div className="mx-auto my-auto h-3 w-32 animate-pulse rounded-full bg-slate-400" />
                            </div>
                        }
                    />
                </footer>
            </Section>

            <BalanceCard />

            <Section className="grid grid-rows-[auto_auto_1fr] gap-y-4 md:px-4">
                <h2 className="text-2xl">Безопасность</h2>

                <ChangePasswordForm />
            </Section>

            <Section className="space-y-6 overflow-x-clip lg:col-span-3">
                <header className="flex justify-between">
                    <h2 className="text-2xl">Кошельки</h2>
                    <AttachWalletDialog />
                </header>

                <WalletListWidget />
            </Section>
        </Article>
    );
};
