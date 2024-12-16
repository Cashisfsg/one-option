import { Link } from "react-router-dom";
import { Article } from "@/shared/ui/article";
import { Title } from "@/shared/ui/title";

export const FAQPage = () => {
    return (
        <>
            <header className="container pt-4">
                <Link
                    to="/"
                    className="inline-block"
                >
                    <svg
                        width="109"
                        height="48"
                        viewBox="0 0 109 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M44.3866 21.1967V44.33L26.6661 44.33C44.3866 36.6364 40.4246 15.9343 30.3402 9.91998H47.1568L62.4125 29.8819V9.91998H73.1004V44.33H59.8403L44.3866 21.1967Z"
                            fill="currentColor"
                        />
                        <path
                            d="M109 44.33H76.9808V9.91998H109V18.1149H87.6686V23.3914H108.978V29.952H87.6686V35.2751H109V44.33Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14.6416 14.2253L14.6392 14.2261V7.73177C10.4214 8.58832 6.7514 10.8731 4.04606 14.2957C1.14442 17.9666 -0.284067 22.616 0.0469461 27.3118C0.37796 32.0076 2.444 36.4028 5.83093 39.6164C9.21786 42.8299 13.6754 44.6243 18.3099 44.6399C22.9445 44.6555 27.4136 42.8911 30.8214 39.7004C34.2292 36.5097 36.3239 32.1285 36.6855 27.435C37.0471 22.7416 35.6489 18.0827 32.7713 14.3923C30.7728 11.8294 28.1633 9.86512 25.2211 8.66395L21.5282 0V14.056L21.5258 14.0554V17.4483C24.9688 18.745 27.4216 22.1025 27.4216 26.04C27.4216 31.101 23.3694 35.2038 18.3708 35.2038C13.3721 35.2038 9.31988 31.101 9.31988 26.04C9.31988 23.0046 10.7775 20.3139 13.0227 18.6463L14.6392 22.7577V17.6888L14.6416 17.6877V14.2253Z"
                            fill="currentColor"
                        />
                        <path
                            d="M18.0102 47.7805C20.5829 47.7805 22.6492 49.8466 22.6492 52.4191V57.3412C22.6492 59.9137 20.5829 62 18.0102 62H5.86362C3.29092 62 1.22466 59.9137 1.22466 57.3412V52.4191C1.22466 49.8466 3.29092 47.7805 5.86362 47.7805H18.0102ZM19.1244 57.3412V52.4191C19.1244 51.7911 18.6382 51.305 18.0102 51.305H5.86362C5.23564 51.305 4.74946 51.7911 4.74946 52.4191V57.3412C4.74946 57.9691 5.23564 58.4553 5.86362 58.4553H18.0102C18.6382 58.4553 19.1244 57.9691 19.1244 57.3412Z"
                            fill="currentColor"
                        />
                        <path
                            d="M35.7236 47.7603C38.1748 47.7603 40.16 49.7453 40.16 52.176C40.16 54.6269 38.1748 56.612 35.7236 56.612L27.8522 56.6322V61.9797H24.3274V47.7805L35.7236 47.7603ZM35.7236 53.0875C36.23 53.0875 36.6149 52.6824 36.6149 52.176C36.6149 51.6899 36.23 51.2847 35.7236 51.2847L27.8522 51.305V53.0875H35.7236Z"
                            fill="currentColor"
                        />
                        <path
                            d="M59.1677 47.7805V51.305H51.7332V61.9797H48.2084V51.305H40.7941V47.7805H59.1677Z"
                            fill="currentColor"
                        />
                        <path
                            d="M64.1447 61.9797H60.6199V47.74H64.1447V61.9797Z"
                            fill="currentColor"
                        />
                        <path
                            d="M80.0654 47.7805C82.6381 47.7805 84.7044 49.8466 84.7044 52.4191V57.3412C84.7044 59.9137 82.6381 62 80.0654 62H70.9091C68.3364 62 66.2701 59.9137 66.2701 57.3412V52.4191C66.2701 49.8466 68.3364 47.7805 70.9091 47.7805H80.0654ZM81.1796 57.3412V52.4191C81.1796 51.7911 80.6934 51.305 80.0654 51.305H70.9091C70.2811 51.305 69.7949 51.7911 69.7949 52.4191V57.3412C69.7949 57.9691 70.2811 58.4553 70.9091 58.4553H80.0654C80.6934 58.4553 81.1796 57.9691 81.1796 57.3412Z"
                            fill="currentColor"
                        />
                        <path
                            d="M108.959 61.9595L109 61.9797H103.895L90.3567 52.6014V61.9797H86.8319V47.74H90.377L105.434 58.5768V47.74H108.959V61.9595Z"
                            fill="currentColor"
                        />
                        <path
                            d="M12.9698 27.0247L11.2986 28.4952L12.7691 31.0248L14.9014 30.3552C15.171 30.5536 15.4347 30.7212 15.6926 30.8581C15.9504 30.995 16.2259 31.125 16.519 31.248L16.9602 33.48H19.9013L20.3425 31.248C20.6366 31.124 20.9125 30.994 21.1704 30.8581C21.4282 30.7222 21.6914 30.5546 21.9601 30.3552L24.0924 31.0248L25.5629 28.4952L23.8718 27.0072C23.9208 26.6848 23.9453 26.3624 23.9453 26.04C23.9453 25.7176 23.9208 25.3952 23.8718 25.0728L25.5629 23.5848L24.0924 21.0552L21.9601 21.7248C21.6905 21.5264 21.4272 21.3587 21.1704 21.2218C20.9135 21.0849 20.6375 20.955 20.3425 20.832L19.9013 18.6H17.026V23.4207C17.4472 23.1835 17.9154 23.0646 18.4307 23.064C19.2395 23.064 19.9322 23.3556 20.5086 23.9389C21.0851 24.5222 21.3728 25.2226 21.3718 26.04C21.3718 26.8584 21.0841 27.5592 20.5086 28.1425C19.9331 28.7258 19.2405 29.017 18.4307 29.016C17.6219 29.016 16.9298 28.7248 16.3543 28.1425C16.0245 27.8088 15.7891 27.4362 15.648 27.0247H12.9698Z"
                            fill="currentColor"
                        />
                    </svg>
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
