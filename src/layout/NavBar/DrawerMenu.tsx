import { motion } from "framer-motion";

import { LINKS_CONTACT, NAV_ITEMS } from "../../consts/siteConfig";

import { titleColor } from "../../libs/tvs";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import { FaExternalLinkAlt } from "react-icons/fa";

import { SVGLogo } from "../../assets/svgs/SVGLogo";

const MotionListItem = motion.create(ListItem);

export default function DrawerMenu({
  openMenu = false,
  handleOpen = () => {},
  cartLength = 0,
}) {
  return (
    <SwipeableDrawer
      open={openMenu}
      onClose={handleOpen}
      onOpen={handleOpen}
      className=""
      classes={{
        paper: "w-full xs:max-w-54",
      }}
    >
      <motion.section
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: 0.1,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={openMenu ? "visible" : "hidden"}
        onClick={handleOpen}
      >
        <motion.a
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          href="#"
          title="Ir al inicio"
          className="flex gap-1 p-4 pb-2"
        >
          <SVGLogo size={0.5} />
          <span
            className={titleColor({
              color: "yellow",
            })}
          >
            Cata-Log
          </span>
        </motion.a>

        <Divider variant="middle" />

        <List>
          {NAV_ITEMS.map((item) => (
            <MotionListItem
              key={item.id}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              disablePadding
              className="hover:shadow-sm"
            >
              <ListItemButton
                component="a"
                href={"#" + item.href}
                title={"Ir a " + item.label}
                className="min-h-[48px] px-[20px]"
              >
                <ListItemIcon className="min-w-0 justify-center me-6">
                  <item.icon size={24} />
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  secondary={
                    item.id === "cartView" ? "Articulos: " + cartLength : null
                  }
                />
              </ListItemButton>
            </MotionListItem>
          ))}
        </List>

        <Divider variant="middle" />

        <List>
          {LINKS_CONTACT.map((item) => (
            <MotionListItem
              key={item.label}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
              disablePadding
              className="hover:shadow-sm"
              secondaryAction={
                <FaExternalLinkAlt className="text-neutral-500" />
              }
            >
              <ListItemButton
                component="a"
                href={item.href || "#"}
                title={"Ir a " + item.label}
                target={item.href ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="min-h-[48px] px-[20px]"
              >
                <ListItemIcon className="min-w-0 justify-center me-6">
                  <item.icon size={22} />
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            </MotionListItem>
          ))}
        </List>
      </motion.section>
    </SwipeableDrawer>
  );
}
