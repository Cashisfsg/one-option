import { Link } from "react-router-dom";

import { Logo } from "@/shared/ui/logo";

export const Footer = () => {
    return (
        <footer className="bg-black">
            <nav className="container grid grid-cols-3 gap-x-4 py-6 @container lg:grid-cols-[auto,_repeat(3,_minmax(0,_1fr))] lg:gap-x-8 xl:gap-x-16">
                <Logo
                    width="335"
                    height="190"
                    className="col-span-4 max-w-80 justify-self-center pb-6 lg:col-span-1 lg:max-w-full"
                />

                <dl className="col-span-3 grid auto-rows-auto grid-cols-1 grid-rows-[min-content] gap-x-4 gap-y-6 text-sm-base-xs-lg @md:grid-cols-subgrid @md:gap-y-2">
                    <div className="row-span-2 grid gap-y-2 @md:grid-rows-subgrid">
                        <dt className="text-base-lg-xs-lg">
                            Партнерская программа
                        </dt>
                        <dd>
                            <ul className="font-secondary">
                                <li>
                                    <Link
                                        to="/auth/sign/up"
                                        className="font-normal"
                                    >
                                        Регистрация
                                    </Link>
                                </li>
                            </ul>
                        </dd>
                    </div>

                    <div className="row-span-2 grid gap-y-2 @md:grid-rows-subgrid">
                        <dt className="text-base-lg-xs-lg">Частые вопросы</dt>
                        <dd>
                            <ul className="font-secondary">
                                <li>
                                    <Link
                                        to="/faq"
                                        className="font-normal"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </dd>
                    </div>

                    <div className="row-span-2 grid gap-y-2 @md:grid-rows-subgrid">
                        <dt className="text-base-lg-xs-lg">
                            Правовые документы
                        </dt>
                        <dd>
                            <ul className="font-secondary">
                                <li>Политика приватности</li>
                                <li>Правила в отношении платежей</li>
                                <li>Пользовательское соглашение</li>
                                <li>Соглашение о рисках</li>
                                <li>Регламент торговых операций</li>
                                <li>Регламент неторговых операций</li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </nav>

            <hr className="border border-[#3c3c3c]" />

            <div className="container -mx-6 space-y-2 text-pretty py-6 font-secondary text-sm text-[#79747e]">
                <p>OptimaX — Это Ведущая Платформа</p>
                <p>
                    Для Торговли Бинарными Опционами, Предлагающая Инновационные
                    Решения Для Трейдеров Всех Уровней. Наша Миссия —
                    Предоставить Нашим Клиентам Простой, Прозрачный И Безопасный
                    Способ Торговли На Глобальных Финансовых Рынках.
                </p>
            </div>
        </footer>
    );
};
