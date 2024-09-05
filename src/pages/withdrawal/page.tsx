import { WithdrawalForm } from "@/entities/user/ui/forms/withdrawal-form";
import { Article } from "@/shared/ui/article";
import { Section } from "@/shared/ui/section";

// import { Select } from "@/shared/ui/select";
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

            {/* <Select.Root>
                <Select.Trigger>Choose a fruit</Select.Trigger>
                <Select.Menu>
                    <Select.Option>Apple</Select.Option>
                    <Select.Option>Banana</Select.Option>
                    <Select.Option>Mango</Select.Option>
                </Select.Menu>
            </Select.Root> */}

            <FAQ />
        </Article>
    );
};
