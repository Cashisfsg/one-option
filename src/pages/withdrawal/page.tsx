import { WithdrawalForm } from "@/features/wallet/withdrawal";
import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";

import { FAQ } from "@/widgets/faq";

export const WithdrawalPage = () => {
    return (
        <Article
            variant="grid"
            className="lg:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]"
        >
            <Section className="space-y-6">
                <h2 className="text-xl-2xl-xs-lg">Вывод средств</h2>
                <WithdrawalForm />
            </Section>

            <FAQ />
        </Article>
    );
};
