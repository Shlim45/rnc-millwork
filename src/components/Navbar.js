import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/rcm-logo.webp'
import navStyles from "@/styles/Navbar.module.css"
import { joinClassNames } from "@/utils";

const MENU_LIST = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/projects" },
    { text: "Quote", href: "/quote" },
    { text: "Contact", href: "/contact" },
];

const NavItem = ({ text, href, active }) => {
    return (
        <Link href={href} className={navStyles.nav__link}>{text}</Link>
    );
};

const Navbar = () => {
    const [navActive, setNavActive] = useState(null);
    const [activeIdx, setActiveIdx] = useState(-1);

    return (
        <header>
            <nav className={navStyles.nav}>
                <Link href="/">
                    <Image src={logo} alt="RCMillwork Logo" width={60} height={60} />
                </Link>
                <div
                    onClick={() => setNavActive(!navActive)}
                    className={navStyles.nav__menu_bar}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={navActive
                    ? joinClassNames(navStyles.active, navStyles.nav__menu_list)
                    : navStyles.nav__menu_list}
                >
                    {MENU_LIST.map((menu, idx) => (
                        <div
                            onClick={() => {
                                setActiveIdx(idx);
                                setNavActive(false);
                            }}
                            key={menu.text}
                        >
                            <NavItem active={activeIdx === idx} {...menu} />
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
