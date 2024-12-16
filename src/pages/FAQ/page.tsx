import { Link } from "react-router-dom";
import { Article } from "@/shared/ui/article";
import { Title } from "@/shared/ui/title";

import Logo from "@/assets/img/svg/logo.svg";

export const FAQPage = () => {
    return (
        <>
            <header className="container pt-4">
                <Link
                    to="/"
                    className="inline-block"
                >
                    <svg
                        width="110"
                        height="50"
                    >
                        <use href={`${Logo}#logo`} />
                    </svg>

                    <span className="sr-only">Main page</span>
                </Link>
            </header>
            <main className="container flex flex-col gap-y-6">
                <Title className="px-[clamp(1rem,_0.8rem_+_0.85vw,_1.5rem)]">
                    FAQ
                </Title>
                <Article
                    variant="grid"
                    className="auto-rows-[auto_minmax(min-content,_1fr)] grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] grid-rows-[auto_minmax(min-content,_1fr)]"
                >
                    <section
                        aria-labelledby="learning-label"
                        aria-describedby="learning-description"
                        className="row-span-2 grid grid-rows-subgrid gap-y-2-4-xs-md rounded-2xl bg-secondary py-4"
                    >
                        <h2
                            id="learning-label"
                            className="text-balance text-xl-2xl-xs-lg"
                        >
                            Как научиться? Это сложно?
                        </h2>
                        <p
                            id="learning-description"
                            className="text-pretty font-secondary text-base-lg-xs-lg"
                        >
                            Зарегистрируйтесь и тренируйтесь на демо-счете. Это
                            тоже самое, что и реальная торговля, но бесплатно.
                            На самом деле это не сложно.
                        </p>
                    </section>

                    <section
                        aria-labelledby="withdrawal-label"
                        aria-describedby="withdrawal-description"
                        className="row-span-2 grid grid-rows-subgrid gap-y-2-4-xs-md rounded-2xl bg-secondary py-4"
                    >
                        <h2
                            id="withdrawal-label"
                            className="text-balance text-xl-2xl-xs-lg"
                        >
                            Сколько времени занимает вывод средств?
                        </h2>
                        <p
                            id="withdrawal-description"
                            className="text-pretty font-secondary text-base-lg-xs-lg"
                        >
                            В среднем процедура вывода средств занимает от
                            одного до пяти дней с даты получения соответствующей
                            заявки Клиента и зависит только от объема
                            одновременно обрабатываемых заявок. Компания всегда
                            старается производить выплаты непосредственно в день
                            поступления запроса от Клиента.
                        </p>
                    </section>

                    <section
                        aria-labelledby="replenishment-label"
                        aria-describedby="replenishment-description"
                        className="row-span-2 grid grid-rows-subgrid gap-y-2-4-xs-md rounded-2xl bg-secondary py-4"
                    >
                        <h2
                            id="replenishment-label"
                            className="text-balance text-xl-2xl-xs-lg"
                        >
                            Какая минимальная сумма пополнения счета?
                        </h2>
                        <p
                            id="replenishment-description"
                            className="text-pretty font-secondary text-base-lg-xs-lg"
                        >
                            Преимущество торговой платформы компании в том, что
                            вам не нужно вносить большие суммы на свой счет. Вы
                            можете начать торговать, вложив небольшую сумму
                            денег. Минимальный депозит 500 рублей.
                        </p>
                    </section>

                    <section
                        aria-labelledby="commission-label"
                        aria-describedby="commission-description"
                        className="row-span-2 grid grid-rows-subgrid gap-y-2-4-xs-md rounded-2xl bg-secondary py-4"
                    >
                        <h2
                            id="commission-label"
                            className="text-balance text-xl-2xl-xs-lg"
                        >
                            Имеется ли комиссия при пополнении или выводе
                            средств со счета ?
                        </h2>
                        <p
                            id="commission-description"
                            className="text-pretty font-secondary text-base-lg-xs-lg"
                        >
                            Нет. Компания не взымает комиссию ни за операцию
                            пополнения счета, ни за вывод средств. Однако, стоит
                            учитывать, что платежные системы могут взимать свои
                            комиссии и использовать внутренний курс конвертации
                            валют.
                        </p>
                    </section>
                </Article>
            </main>
        </>
    );
};
