import { Link, NavLink, useLocation } from "react-router-dom";

import * as BurgerMenu from "../burger-menu/ui/burger-menu";

import { UserSignOutButton } from "@/features/user/logout";

import { Title } from "@/shared/ui/title";

import { Logo } from "@/shared/ui/logo";

import NavigationSprite from "@/assets/img/svg/navigation-sprite.svg";

const links = [
    {
        url: "/",
        name: "dashboard",
        title: "Панель управления"
    },
    {
        url: "/referral",
        name: "partnership-program",
        title: "Парнерская программа"
    },
    {
        url: "/sub/referral",
        name: "sub-partnership-program",
        title: "Суб-партнерская программа"
    },
    {
        url: "/statistics",
        name: "statistics",
        title: "Статистика"
    },
    {
        url: "/withdrawal",
        name: "withdrawal",
        title: "Вывод средств"
    },
    {
        url: "/account",
        name: "account",
        title: "Профиль"
    },
    {
        url: "https://t.me/Diram_supportbot",
        name: "support",
        title: "Поддержка"
    },
    {
        url: "/agreement",
        name: "partnership-agreement",
        title: "Партнерское соглашение"
    },
    {
        url: "/notifications",
        name: "notification",
        title: "Уведомления"
    },
    {
        url: "https://t.me/OptimaxVip",
        name: "telegram",
        title: "Telegram"
    }
] as const;

export const Header = () => {
    const location = useLocation();

    const onClickHandler = () => {
        const contentRoot = document.querySelector("#root")!;

        contentRoot.removeAttribute("inert");
        contentRoot.removeAttribute("aria-hidden");
    };

    return (
        <>
            <nav className="container hidden justify-between md:flex">
                <ul className="flex items-center gap-x-1.5">
                    <li className="mr-4">
                        <Link to="/">
                            <Logo
                                width="110"
                                height="50"
                                orientation="horizontal"
                            />
                        </Link>
                    </li>
                    {links.slice(0, 6).map((link, index) => (
                        <li
                            key={index}
                            role="presentation"
                            className="size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary"
                        >
                            <NavLink
                                to={link.url}
                                className="flex h-full items-center justify-center text-2xl-3xl-md-xl"
                            >
                                <span className="sr-only">{link.title}</span>
                                <svg
                                    width="1em"
                                    height="1em"
                                >
                                    <use
                                        xlinkHref={`${NavigationSprite}#${link.name}`}
                                    />
                                </svg>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <ul className="ml-1.5 flex gap-x-1.5">
                    {links.slice(6).map((link, index) => (
                        <li
                            key={index}
                            role="presentation"
                            className="size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary"
                        >
                            <a
                                href={link.url}
                                className="flex h-full items-center justify-center text-2xl-3xl-md-xl"
                            >
                                <span className="sr-only">{link.title}</span>
                                <svg
                                    height="1em"
                                    width="1em"
                                >
                                    <use
                                        xlinkHref={`${NavigationSprite}#${link.name}`}
                                    />
                                </svg>
                            </a>
                        </li>
                    ))}
                    <li
                        role="presentation"
                        className="size-[clamp(3rem,_0.375rem_+_5.45vw,_4.75rem)] bg-[#2b2930] has-[a[aria-current=page]]:bg-violet-primary"
                    >
                        <UserSignOutButton className="justify-center text-2xl-3xl-md-xl">
                            <span className="sr-only">Выйти</span>
                            <svg
                                height="1em"
                                width="1em"
                            >
                                <use xlinkHref={`${NavigationSprite}#logout`} />
                            </svg>
                        </UserSignOutButton>
                    </li>
                </ul>
            </nav>

            <header className="container grid grid-cols-[auto_1fr_auto] place-items-center ">
                <BurgerMenu.Root className="md:hidden">
                    <BurgerMenu.Trigger className="size-12 rounded-md bg-quaternary p-2.5" />
                    <BurgerMenu.Portal>
                        <BurgerMenu.Content className="relative isolate z-10 bg-secondary p-4 shadow-lg">
                            <BurgerMenu.Header className="flex items-center justify-between text-white">
                                <Logo
                                    orientation="horizontal"
                                    width="200"
                                    height="55"
                                />
                            </BurgerMenu.Header>

                            <BurgerMenu.Menu className="group mt-4 grid w-max grid-cols-[auto_1fr] text-white-primary">
                                {links
                                    .filter(
                                        link => link.name !== "notification"
                                    )
                                    .map((link, index) => (
                                        <BurgerMenu.MenuItem
                                            key={index}
                                            index={index}
                                            className="menu col-span-2 grid grid-cols-subgrid"
                                        >
                                            {
                                                <NavLink
                                                    to={link.url}
                                                    onClick={onClickHandler}
                                                    className="col-span-2 grid cursor-pointer grid-cols-subgrid items-center gap-x-4 bg-[#2d2930] p-4 focus:bg-violet-primary focus:outline-none focus-visible:outline-transparent group-[:not(:has(:focus-within))]:aria-[current=page]:bg-violet-primary"
                                                >
                                                    <svg
                                                        height="1.5em"
                                                        width="1.5em"
                                                    >
                                                        <use
                                                            xlinkHref={`${NavigationSprite}#${link.name}`}
                                                        />
                                                    </svg>
                                                    <span>{link.title}</span>
                                                </NavLink>
                                            }
                                        </BurgerMenu.MenuItem>
                                    ))}
                                <UserSignOutButton
                                    onClick={onClickHandler}
                                    className="col-span-2 grid cursor-pointer grid-cols-subgrid items-center gap-x-4 bg-[#2d2930] p-4 hover:bg-violet-primary focus:outline-none focus-visible:outline-transparent"
                                >
                                    <svg
                                        height="1.5em"
                                        width="1.5em"
                                    >
                                        <use
                                            xlinkHref={`${NavigationSprite}#logout`}
                                        />
                                    </svg>
                                    <span>Выйти</span>
                                </UserSignOutButton>
                            </BurgerMenu.Menu>
                            <BurgerMenu.Close className="absolute inset-[1rem_1rem_auto_auto] rounded bg-quaternary p-3 text-white-primary" />
                        </BurgerMenu.Content>
                    </BurgerMenu.Portal>
                </BurgerMenu.Root>

                <Title className="px-2-4-xs-lg text-center text-lg-2xl-xs-lg">
                    {links.find(link => link.url === location.pathname)?.title}
                </Title>

                <button className="size-12 rounded-md bg-quaternary md:hidden">
                    {/* <SVGPicker
                        name="notification"
                        className="mx-auto text-xl-2xl-xs-lg"
                    /> */}
                    <svg
                        height="1em"
                        width="1em"
                        className="mx-auto text-xl-2xl-xs-lg"
                    >
                        <use xlinkHref={`${NavigationSprite}#notification`} />
                    </svg>
                </button>
            </header>
        </>
    );
};
