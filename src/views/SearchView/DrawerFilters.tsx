import { motion } from "framer-motion";

import { TypeFilterValues } from "../../consts/types";

import { SwipeableDrawer, IconButton } from "@mui/material";

import Filters from "./Filters";

import { IoIosCloseCircleOutline } from "react-icons/io";

interface InterfaceProps {
  isOpen: boolean;
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
  filtersValues: TypeFilterValues;
}

const MotionSwipeableDrawer = motion.create(SwipeableDrawer);

export default function DrawerFilters({
  isOpen = false,
  setIsOpen,
  filtersValues,
}: InterfaceProps) {
  const onClose = () => setIsOpen(false);

  return (
    <MotionSwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      onOpen={() => setIsOpen(true)}
      variant="temporary"
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
      animate={isOpen ? "visible" : "hidden"}
      className="relative"
    >
      <IconButton
        className="absolute top-1.5 right-2"
        title="Cerrar filtros"
        onClick={onClose}
      >
        <IoIosCloseCircleOutline />
      </IconButton>

      <Filters filtersValues={filtersValues} onAction={onClose} />
    </MotionSwipeableDrawer>
  );
}
