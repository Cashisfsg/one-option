import { useFetchWalletListQuery } from "@/entities/wallet";
import { Fetch } from "@/shared/ui/fetch";

export const WalletList = () => {
    return (
        <Fetch
            useQuery={useFetchWalletListQuery}
            args={undefined}
            renderSuccess={() => <></>}
            loadingFallback={
                <ul className="mt-6">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <li
                                key={i}
                                className="h-11 odd:animate-pulse odd:bg-[#36343b]"
                            />
                        ))}
                </ul>
            }
            renderError={() => (
                <ul className="mt-6">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <li
                                key={i}
                                className="h-11 odd:bg-[#36343b]"
                            />
                        ))}
                </ul>
            )}
        />
    );
};
