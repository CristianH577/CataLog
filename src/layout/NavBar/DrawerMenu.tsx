import { LINKS_CONTACT, NAV_ITEMS } from "../../consts/siteConfig";

import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { FaExternalLinkAlt } from "react-icons/fa";
import { titleColor } from "../../libs/tvs";
import { SVGLogo } from "../../assets/svgs/SVGLogo";

export default function DrawerMenu({
  openMenu = false,
  handleOpen = () => {},
  cartLength = 0,
}) {
  return (
    <SwipeableDrawer open={openMenu} onClose={handleOpen} onOpen={handleOpen}>
      <Box sx={{ width: 220 }} role="presentation" onClick={handleOpen}>
        {/* <div className="px-4 py-2">
          <Typography className={`${titleColor({ color: "yellow" })}`}>
            Cata-Log
          </Typography>
          
        </div> */}

        <Link href="#" className="flex gap-1 px-4 py-2" underline="none">
          <SVGLogo size={0.5} />
          <span
            className={titleColor({
              color: "yellow",
            })}
          >
            Cata-Log
          </span>
        </Link>

        <Divider variant="middle" />

        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component="a"
                href={"#" + item.href}
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
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {LINKS_CONTACT.map((item) => (
            <ListItem
              key={item.label}
              disablePadding
              secondaryAction={
                <FaExternalLinkAlt className="text-neutral-500" />
              }
            >
              <ListItemButton className="min-h-[48px] px-[20px]">
                <ListItemIcon className="min-w-0 justify-center me-6">
                  <item.icon size={22} />
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
