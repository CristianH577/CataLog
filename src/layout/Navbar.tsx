import { useState } from "react";

import { LINKS_CONTACT } from "../consts/siteConfig";

import { titleColor } from "../libs/tvs";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Badge, Link } from "@mui/material";

import DrawerMenu from "./NavBar/DrawerMenu";
import SearchInput from "./NavBar/SearchInput";

import { IoMenu } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { SVGLogo } from "../assets/svgs/SVGLogo";

export default function Navbar({ cartLength = 0 }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenDrawer = () => setOpenMenu(!openMenu);

  const button_whatsapp = LINKS_CONTACT.find((link) => link.id === "wp") || {
    label: "wp",
    href: "#",
  };

  return (
    <AppBar
      position="sticky"
      className="bg-gradient-to-b bg-transparent from-primary-2 to-primary/80"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className="xs:me-2"
          onClick={handleOpenDrawer}
        >
          <IoMenu />
        </IconButton>

        <Link
          href="#"
          className="flex-grow xs:me-4 flex gap-1 drop-shadow-sm"
          underline="none"
        >
          <SVGLogo size={0.5} />
          <div className="hidden xs:block">
            <span
              className={titleColor({
                color: "yellow",
              })}
            >
              Cata-Log
            </span>
          </div>
        </Link>

        <SearchInput href="search" className="hidden sm:block" />

        <IconButton
          color={cartLength > 0 ? "secondary" : "default"}
          href="#cart"
          title="Ir al carrito"
          className={`mx-1 sm:mx-2 ${
            cartLength > 0
              ? "text-[#FFB457] hover:text-[#FF705B]"
              : "text-tertiary"
          }`}
        >
          <Badge badgeContent={cartLength} color="warning">
            <FaShoppingCart />
          </Badge>
        </IconButton>

        <IconButton
          className="text-tertiary hover:text-white hover:bg-green-400/50"
          title={`Ir a ${button_whatsapp.label}`}
          href={button_whatsapp.href}
          target="_blank"
          rel="noreferrer"
        >
          {"icon" in button_whatsapp ? <button_whatsapp.icon /> : "wp"}
        </IconButton>
      </Toolbar>

      <DrawerMenu
        openMenu={openMenu}
        handleOpen={handleOpenDrawer}
        cartLength={cartLength}
      />
    </AppBar>
  );
}
