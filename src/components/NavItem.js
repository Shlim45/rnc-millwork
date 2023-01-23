import Link from "next/link";
import navItemStyles from "@/styles/NavItem.module.css"

const NavItem = ({ text, href, active }) => {
  return (
    <Link href={href} className={navItemStyles.nav__link}>{text}</Link>
  );
};

export default NavItem;