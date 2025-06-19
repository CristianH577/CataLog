import { useState } from "react";
import { motion } from "framer-motion";

import { LINKS_CONTACT } from "../consts/siteConfig";

import { titleColor } from "../libs/tvs";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";

import DrawerMenu from "./NavBar/DrawerMenu";
import SearchInput from "../components/SearchInput";

import { IoMenu } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { SVGLogo } from "../assets/svgs/SVGLogo";

const MotionToolbar = motion.create(Toolbar);

const button_whatsapp = LINKS_CONTACT.find((link) => link.id === "wp") || {
  label: "wp",
  href: "#",
};

export default function Navbar({ cartLength = 0 }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenDrawer = () => setOpenMenu(!openMenu);

  return (
    <AppBar
      position="sticky"
      className="bg-gradient-to-b bg-transparent from-primary-2 to-primary/80"
    >
      <MotionToolbar
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
          },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
      >
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

        <a
          href="#"
          title="Ir al inicio"
          className="xs:me-4 flex gap-1 drop-shadow-sm hover:scale-95 transition-transform"
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
        </a>

        <span className="flex-grow" />

        <SearchInput href="search" className="hidden sm:block" />

        <IconButton
          color={cartLength > 0 ? "secondary" : "default"}
          href="#cart"
          title="Ir al carrito"
          className={`mx-1 sm:mx-2 hover:text-primary-1 ${
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
          href={
            button_whatsapp.href +
            "&text=Hola. Me interesa tener un catalogo online."
          }
          target="_blank"
          rel="noreferrer"
        >
          {"icon" in button_whatsapp ? <button_whatsapp.icon /> : "wp"}
        </IconButton>
      </MotionToolbar>

      <DrawerMenu
        openMenu={openMenu}
        handleOpen={handleOpenDrawer}
        cartLength={cartLength}
      />
    </AppBar>
  );
}
