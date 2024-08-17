import { Section } from "@/shared/ui/section";

export const FAQ = () => {
    return (
        <Section className="space-y-6">
            <h2 className="text-xl-2xl-xs-lg">Часто задаваемые вопросы</h2>
            <ul className="space-y-4">
                <li>
                    <dl className="space-y-1">
                        <dt className="text-lg-xl-xs-lg">
                            Что значит статус "Обработка"?
                        </dt>
                        <dd className="font-secondary text-base-lg-xs-lg">
                            Средства отправлены финансовому провайдеру и ожидают
                            проводки на его стороне. Срок зачисления - до 3-х
                            суток. Ожидайте, пожалуйста. С нашей стороны мы
                            никак ускорить процесс не можем.
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl className="space-y-1">
                        <dt className="text-lg-xl-xs-lg">
                            Статус сменился на "Завершен", но деньги не
                            поступили
                        </dt>
                        <dd className="font-secondary text-base-lg-xs-lg">
                            Срок зачисления средств до 3-х суток. Ожидайте,
                            деньги придут. Если спустя 3-е суток средства не
                            поступили - напишите нам.
                        </dd>
                    </dl>
                </li>
                <dl className="space-y-1">
                    <dt className="text-lg-xl-xs-lg">
                        Деньги пришли не полностью
                    </dt>
                    <dd className="font-secondary text-base-lg-xs-lg">
                        Вывод средств на карту может разбиваться на части, части
                        могут приходить в разное время. Не переживайте, средства
                        поступят. Если в течение 3-х суток средства не поступили
                        - обратитесь к нам.
                    </dd>
                </dl>
            </ul>
        </Section>
    );
};
