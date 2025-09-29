import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import {
  FILTERS_INPUTS,
  FILTERS_VALUES_DEFAULT,
} from "../../consts/siteConfig";
import { TypeFilterValues, TypeFiltersInput } from "../../consts/types";

import { getHrefSearch } from "../../libs/functions";
import { titleColor } from "../../libs/tvs";

import {
  Divider,
  List,
  ListItem,
  SwipeableDrawer,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField,
  IconButton,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { IoIosCloseCircleOutline } from "react-icons/io";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

interface InterfaceProps {
  isOpen: boolean;
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
  filtersValues: TypeFilterValues;
}

const MotionSwipeableDrawer = motion.create(SwipeableDrawer);
const MotionListItem = motion.create(ListItem);
const MotionButton = motion.create(Button);

export default function DrawerFilters({
  isOpen = false,
  setIsOpen,
  filtersValues,
}: InterfaceProps) {
  const navigate = useNavigate();

  const [filtersValuesTemp, setFiltersValuesTemp] = useState<TypeFilterValues>(
    FILTERS_VALUES_DEFAULT
  );

  const onClose = () => setIsOpen(false);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;

    const value_ = type === "number" ? value : Number(value);

    // @ts-ignore
    filters_values_[name] = value_;

    setFiltersValuesTemp(filters_values_);
  };

  const handleSelectFilterChange = (e: SelectChangeEvent<any>) => {
    const filters_values = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const value = e.target.value;

    // @ts-ignore
    filters_values[name] = value;

    setFiltersValuesTemp(filters_values);
  };

  const handleApply = () => {
    let href = getHrefSearch(filtersValuesTemp);
    if (href) navigate(href);
    onClose();
  };

  const handleClean = () => {
    setFiltersValuesTemp(structuredClone(FILTERS_VALUES_DEFAULT));
    onClose();
  };

  const makeInput = (input: TypeFiltersInput) => {
    const id_ = `${input.format}-${input.id}`;
    const id_label = `${id_}-label`;
    switch (input.format) {
      case "select":
        return (
          <FormControl fullWidth variant="standard">
            <InputLabel id={id_label}>{input.label}</InputLabel>

            <Select
              labelId={id_label}
              id={id_}
              label={input.label}
              name={input.id}
              value={filtersValuesTemp[input.id as keyof TypeFilterValues]}
              onChange={handleSelectFilterChange}
            >
              <MenuItem value="">Seleccione un valor</MenuItem>

              {input.items &&
                input.items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      case "number":
        return (
          <div>
            <InputLabel>{input.label}</InputLabel>

            <div className="xs:flex gap-1">
              {["Min", "Max"].map((key) => {
                const key_ = input.id + key;
                const value = filtersValuesTemp[key_ as keyof TypeFilterValues];
                return (
                  <TextField
                    key={key}
                    type="number"
                    className="capitalize"
                    variant="standard"
                    id={`input-${input.id}-${key}`}
                    label={key}
                    name={`${input.id}-${key}`}
                    value={value ? String(value) : ""}
                    onChange={handleFilterChange}
                  />
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <TextField
            id={id_}
            label={input.label}
            variant="standard"
            name={input.id}
            value={filtersValuesTemp[input.id as keyof TypeFilterValues] ?? ""}
            onChange={handleFilterChange}
          />
        );
    }
  };

  useEffect(() => {
    const filters_values_ = { ...filtersValuesTemp, ...filtersValues };

    setFiltersValuesTemp(filters_values_);
  }, [filtersValues]);

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
    >
      <section className="w-full xs:max-w-64 px-4">
        <div className="py-4 relative">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className={titleColor({ color: "blue" })}
          >
            Filtros
          </motion.div>

          <IconButton
            className="absolute top-1.5 right-2"
            title="Cerrar filtros"
            onClick={onClose}
          >
            <IoIosCloseCircleOutline />
          </IconButton>
        </div>

        <Divider variant="middle" />

        <List>
          {FILTERS_INPUTS.map((input) => (
            <MotionListItem
              key={input.id}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {makeInput(input)}
            </MotionListItem>
          ))}
        </List>
      </section>

      <Divider variant="middle" />

      <div className="p-4 flex flex-col xs:flex-row flex-wrap justify-end gap-2">
        <MotionButton
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          variant="contained"
          color="inherit"
          href="#search?orderBy=price-asc"
          title="Quitar filtros"
          onClick={handleClean}
        >
          <FilterAltOffIcon />
        </MotionButton>

        <MotionButton
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1 },
          }}
          variant="contained"
          title="Aplicar filtros"
          onClick={handleApply}
        >
          Aplicar
        </MotionButton>
      </div>
    </MotionSwipeableDrawer>
  );
}
