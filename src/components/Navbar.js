import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import logo from '../../public/rcm-logo.webp'
import NavItem from "./NavItem";
import navbarStyles from "@/styles/Navbar.module.css"

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About Us", href: "/about" },
  { text: "Services", href: "/projects" },
  { text: "Quote", href: "/quote" },
  { text: "Contact", href: "/contact" },
];

const cx = (...cs) => (cs.map(c => c).join(" "));

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={navbarStyles.nav}>
        <Link href="/">
            <Image src={logo} alt="RCMillwork Logo" width={60} height={60} />
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={navbarStyles.nav__menu_bar}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={navActive ? cx(navbarStyles.active, navbarStyles.nav__menu_list) : navbarStyles.nav__menu_list}>
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
